<template>
  <div v-if="store.displayFileBrowser" id="image-browser">
    <div class="flex space-between">
      <h1>{{ upperCaseFileMode() }} Browser</h1>
      <div class="close" @click="store.displayFileBrowser = false">
        <h1>X</h1>
      </div>
    </div>
    <h2>{{ store.currentFolder.replaceAll('/', ' | ') }}</h2>

    <div class="file-browser-container">
      <div class="file-browser flex flex-wrap">
        <!-- Upload File -->
        <UploadFile :currentFolder="store.currentFolder" :updateFolderContents="updateFolderContents"
          :uploadsFilePath="uploadsFilePath" />

        <!-- Up One Folder -->
        <MoveUpFolder :updateFolderContents="updateFolderContents" />

        <!-- List Folders -->
        <Folders :changeFileFolderName="changeFileFolderName" :updateFolderContents="updateFolderContents"
          :folders="folders" />

        <!-- New Folder -->
        <NewFolder :folders="folders" :uploadsFilePath="uploadsFilePath" />

        <!-- List Files -->
        <Files :changeFileFolderName="changeFileFolderName" :files="files" />

      </div>
    </div>
    <button class="btn btn-pink add-selected-images" @click="addFiles">Add Selected {{upperCaseFileMode()}}s</button>
  </div>
</template>

<script setup>

import { ref, onMounted, watch } from 'vue'
import { useAppStore } from '../../store/store'
import UploadFile from './UploadFile.vue'
import MoveUpFolder from './MoveUpFolder.vue'
import Folders from './Folders.vue'
import NewFolder from './NewFolder.vue'
import Files from './Files.vue'

const store = useAppStore()
const folders = ref([])
const files = ref([])
const uploadsFilePath = ref('/np-content/uploads/' + store.fileBrowserMode)

// Fetch folder contents on mount
onMounted(() => {
  updateFolderContents()
})

watch(() => store.fileBrowserMode, (newVal, oldVal) => {
  uploadsFilePath.value = '/np-content/uploads/' + newVal;
  updateFolderContents();
})

const upperCaseFileMode = () => {
  return store.fileBrowserMode.substr(0, 1).toUpperCase() + store.fileBrowserMode.substr(1, store.fileBrowserMode.length - 2);
}

// --- Utility and Action Methods ---

const updateFolderContents = async () => {
  const formData = new FormData()
  formData.append('filePath', uploadsFilePath.value + store.currentFolder)
 
  const response = await fetch('/np-admin/np-ajax/?action=get_dir_contents', {
    method: 'POST',
    body: formData
  })

  const directoryContents = await response.json()
  
  folders.value = directoryContents.folders.map((name) => ({
    name, editName: false, newName: name, path: uploadsFilePath.value + store.currentFolder + name
  }))

  files.value = directoryContents.files.map((name) => ({
    name, editName: false, selected: false, newName: name, path: uploadsFilePath.value + store.currentFolder + name
  }))
  
}



const changeFileFolderName = async (file) => {
  
  const formData = new FormData()

  formData.append('oldPath', uploadsFilePath.value + store.currentFolder + '/' + file.name)
  formData.append('newPath', uploadsFilePath.value + store.currentFolder + '/' + file.newName)

  await fetch('/np-admin/np-ajax/?action=change_file_name', {
    method: 'POST',
    body: formData
  })

  file.name = file.newName
  file.editName = false
  updateFolderContents()
}


const addFiles = () => {

  const selectedFiles = files.value.filter((file) => file.selected);

  if (store.fileBrowserMode == 'images') {

    if (store.imageMode !== 'featured') {

      selectedFiles.forEach((file) => {

        const image = new window.Image();
        image.src = uploadsFilePath.value + store.currentFolder + '/' + file.name;
        image.onload = function () {
          const imageObj = {
            type: 'image',
            src: image.src,
            width: image.width,
            height: image.height,
            cover: false,
            contain: true,
            grayscale: false,
            sepia: false,
            opacity: 1,
            blur: '0%'
          };

          if (store.imageMode == 'gallery') {

            store.currentGallery.images.push(image.src)

          } else {
            store.currentContainer.push(imageObj);
            store.currentElement = imageObj;
            file.selected = false;
          }


        };


      })

    } else {

      store.featuredImage = uploadsFilePath.value + store.currentFolder + '/' + selectedFiles[0].name;
      selectedFiles[0].selected = false;

    }
  }

  if (store.fileBrowserMode == 'videos') {

    selectedFiles.forEach((file) => {

      const video = document.createElement('video');
      video.src = uploadsFilePath.value + store.currentFolder + '/' + file.name;

      // You might want to wait for the metadata to load to get width and height
      video.addEventListener('loadedmetadata', function () {
        const videoObj = {
          type: 'video',
          src: video.src,
          width: video.videoWidth,
          height: video.videoHeight,
          contain: true,
          cover: false,
          greyscale: false,
          opacity: 1,
          sepia: false
        };
        // Your code to use videoObj here

        store.currentContainer.push(videoObj)
        store.currentElement = videoObj
        file.selected = false;

      });


    })



  }

  store.displayFileBrowser = false
}
</script>
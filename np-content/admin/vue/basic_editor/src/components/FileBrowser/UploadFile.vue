<template>
<div @click="triggerFileUpload" class="upload-image file-browser-item">
    <img width="50px" :src="icon" />
    <p class="small">Upload {{getFileType()}}</p>
    <input ref="fileUpload" style="display:none;" type="file" @change="uploadFile($event, currentFolder,uploadsFilePath,updateFolderContents)" />
</div>
</template>

<script setup>
import {ref} from 'vue';

const getFileType = () => {
  const first = store.fileBrowserMode.substr(0,1).toUpperCase();

  const main = store.fileBrowserMode.substr(1,store.fileBrowserMode.length-1);

  return first + main;
}

defineProps(['currentFolder','updateFolderContents','uploadsFilePath'])
import { useAppStore } from '../../store/store'

const store = useAppStore()
const fileUpload = ref(null);

const triggerFileUpload = () => {
  fileUpload.value.click()
}
const fileType = store.fileBrowserMode.substr(0,store.fileBrowserMode.length-1) +'-upload.svg';
const icon = ref('/np-content/admin/img/'+ fileType);

const uploadFile = async (event,currentFolder,uploadsFilePath,updateFolderContents) => {
  
  const file = event.target.files[0]

  if (!file) return

  const formData = new FormData()
  
  formData.append('filename', file.name.replaceAll(' ','-'))

  formData.append('path',uploadsFilePath + currentFolder )

  formData.append('file', file)

  await fetch('/np-admin/np-ajax/?action=upload_file', {
    method: 'POST',
    body: formData
  })

  updateFolderContents()

}
</script>
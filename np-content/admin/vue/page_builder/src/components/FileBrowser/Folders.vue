<template> 
      
    <!-- List Folder
    
    Allows droping of files to move them into the folder
    Clicking changes to that folder
    Allows editing of folder name
    -->
    <div
          v-for="folder in folders"
          :key="folder.name"
          @dragover.prevent="onDragOverFolder($event)"
          @drop="moveFileIntoFolder($event, folder)"
          class="folder file-browser-item"
          @click="changeFolder(folder,updateFolderContents)"
          @dragout="onDragOutFolder($event)"
        >
          <img width="50" src="/np-content/admin/img/folder.svg" />
          <p class="small" v-if="!folder.editName">{{ folder.name }}</p>
          <input
            @click.stop=""
            @keydown.enter="changeFileFolderName(folder)"
            v-if="folder.editName"
            type="text"
            v-model="folder.newName"
          />
</div>

</template>

<script setup> 
import { useAppStore } from '../../store/store'
const store = useAppStore()
defineProps(['updateFolderContents','changeFileFolderName','folders']);

const onDragOverFolder = (e) => {
  e.target.style.border = "2px solid blue";
}

const onDragOutFolder = () => {
   e.target.style.border = "1px solid black";
}

const moveFileIntoFolder = async (e, folder) => {
  const filePath = e.dataTransfer.getData('filepath')

  const params = new URLSearchParams()
  
  params.append('oldPath', filePath)
  params.append('newPath', folder.path)

  await fetch('/api/np-admin/rename-file-or-folder', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString()
  })

  updateFolderContents()
}
const changeFolder = (folder,updateFolderContents) => {
    
  store.currentFolder = store.currentFolder.replace(/\/$/, '') + '/' + folder.name
  updateFolderContents()
}
</script>
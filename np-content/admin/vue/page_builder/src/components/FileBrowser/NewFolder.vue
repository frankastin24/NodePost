<template>
<div v-if="displayNewFolder" class="new-folder file-browser-item">

    <img width="50" src="/np-content/admin/img/folder.svg" />
    
    <input
    ref="newFolderInput"
    @keydown.enter="createFolder"
    type="text"
    v-model="newFolderName"
    />

</div>

<div @click="showNewFolder" class="folder file-browser-item">
    <img width="50" src="/np-content/admin/img/folder-add.svg" />
    <p class="small">Add New Folder</p>
</div>
</template>

<script setup>
defineProps(['folders','uploadsFilePath'])

import { useAppStore } from '../../store/store'
const store = useAppStore()

import { ref, onMounted, nextTick } from 'vue'
const newFolderInput = ref(null);
const displayNewFolder = ref(false);

const showNewFolder = async () => {
  displayNewFolder.value = true
  await nextTick()
  newFolderInput.value?.focus()
}

const createFolder = async () => {
  if (newFolderName.value === '') {
    alert('Please enter a folder name')
    return
  }
  const foundFolders = folders.value.find(folder => folder.name === newFolderName.value)
  if (foundFolders) {
    alert('Folder with name already exists, please enter a unique name')
    return
  }

  const params = new URLSearchParams()
  params.append('folderPath', uploadsFilePath.value + store.currentFolder + newFolderName.value)

  await fetch('/api/np-admin/create-directory', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString()
  })

  folders.value.push({
    name: newFolderName.value,
    editName: false,
    newName: newFolderName.value,
    path
  })

  displayNewFolder.value = false
  newFolderName.value = ''
  updateFolderContents()
}
</script>
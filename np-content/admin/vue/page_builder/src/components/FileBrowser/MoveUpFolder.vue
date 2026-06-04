<template>
    <div v-if="store.currentFolder !== '/'" @click="moveUpFolder(updateFolderContents,currentFolder)" class="up-one-level file-browser-item">
          <img width="50" src="/np-content/admin/img/folder-up.svg" />
        </div>
</template>

<script setup>

defineProps(['updateFolderContents','currentFolder'])

import { useAppStore } from '../../store/store'
const store = useAppStore()

const moveUpFolder = (updateFolderContents) => {
  if (store.currentFolder === '/') return
  const segments = store.currentFolder.split('/').filter(Boolean)
  segments.pop()
  store.currentFolder = '/' + segments.join('/')
  updateFolderContents()
}

</script>

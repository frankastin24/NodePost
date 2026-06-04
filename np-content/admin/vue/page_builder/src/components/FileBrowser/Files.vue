<template>
<div
    v-for="file in files"
    :key="file.name"
    draggable="true"
    @dragstart="dragFileStart($event, file)"
    :class="['file', 'file-browser-item', (file.selected ? 'selected' : '')]"
    @click="selectFile(file)"
>
        <div :style="fileStyles(file)"></div>
        
        <p class="small" @click.stop="file.editName = true" v-if="!file.editName">{{ file.name }}</p>
        <input
        @click.stop=""
        v-if="file.editName"
        @keydown.enter="changeFileFolderName(file)"
        type="text"
        v-model="file.newName"
        />
</div>
</template>

<script setup>

defineProps(['files','changeFileFolderName']);

import { useAppStore } from '../../store/store'
const store = useAppStore()

const fileStyles = (file) => {

  if(store.fileBrowserMode == 'images') {
   return {
      backgroundImage: `url("${file.path}")`,
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      width: '50px',
      height: '50px',
      backgroundRepeat: 'no-repeat'
    }
  } else {
    return {
      backgroundImage: `url("/np-content/admin/img/file.svg")`,
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      width: '50px',
      height: '50px',
      backgroundRepeat: 'no-repeat'
    }
  }

}

const dragFileStart = (e, file) => {
  e.dataTransfer.setData('filename', file.name)
}

const selectFile = (file) => {
  file.selected = !file.selected
}

</script>
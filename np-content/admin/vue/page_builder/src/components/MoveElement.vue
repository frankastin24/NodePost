<template>
    <div class="move-element flex">
        <div @click="moveUp(element)"><img width="20" src="/np-content/admin/img/chevron-up.svg"/></div>
        <div @click="moveDown(element)"><img width="20" src="/np-content/admin/img/chevron-down.svg"/></div>
    </div>
</template>
<script setup>

import {useAppStore} from '../store/store';
const store = useAppStore();
defineProps(['element']);
const moveUp = (element) => {

    const index = store.currentContainer.indexOf(element);

    if(index > 0) {
    store.currentContainer.splice(index,1);
    store.currentContainer.splice(index -1 ,0, element);
    setTimeout(() => {
store.currentElement = store.currentContainer[index - 1];
    },100)
    
    }

   

}
const moveDown = (element) => {

     const index = store.currentContainer.indexOf(element);
     const length = store.currentContainer.length - 1;
    if(index < length) {
    store.currentContainer.splice(index,1);
    store.currentContainer.splice(index +1 ,0, element);
   setTimeout(() => {
store.currentElement = store.currentContainer[index + 1];
    },100)
    }

}

</script>
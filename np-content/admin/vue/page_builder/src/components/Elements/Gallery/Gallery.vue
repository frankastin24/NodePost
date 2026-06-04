<template>

    <div @click="setGallery(element)" class="np-gallery">
        <button @click="addImage">
            <img width="30" src="/np-content/admin/img/image-upload.svg"/>
            <p>Add Image</p>
        </button>

        <div class="np-gallery-images flex flex-wrap">
            <div :style="{backgroundImage:'url('+img+')'}" class="np-gallery-image" v-for="img in element.images">
               <button @click="deleteImage(img)"><img width="15" src="/np-content/admin/img/bin.svg"/></button>
            </div>
        </div>
    </div>

</template>

<script setup>
import { useAppStore } from '../../store/store';

const store = useAppStore();

defineProps(['element'])

const setGallery = (element) => {
    store.currentGallery = element;
}

const addImage = (element) => {
    store.imageMode = 'gallery';
    store.displayFileBrowser = true;
}

const deleteImage = (img) => {
    const index = store.currentGallery.images.indexOf(img);
    store.currentGallery.images.splice(index,1);
}

</script>
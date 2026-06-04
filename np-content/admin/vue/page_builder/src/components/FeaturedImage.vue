<template>

    <div :style="styles()" @click="selectFeaturedImage" class="featured-image">
        <div v-if="!store.featuredImage">
        <img width="200" src="/np-content/admin/img/image-upload.svg"/>
        <h2>FEATURED IMAGE</h2>
        </div>
    </div>

</template>
<script setup>

import { useAppStore } from '../store/store'
const store = useAppStore()
const styles = () => {
    return {
        backgroundImage : (store.featuredImage ? `url("${store.featuredImage}")` : ''),
    }
}
const selectFeaturedImage = () => {
    
    store.imageMode = 'featured';

    store.displayFileBrowser = true;

}

</script>
<template>
    <section class="np-create-cpt">

      <h1>Create New Custom Post Type</h1>
      
      <label>Title</label>
      <input @input="onTitleInput" type="text" placeholder="Blog" v-model="title"/>
      
      <label>Slug</label>
      <input @input="onSlugChange" type="text" placeholder="blog" v-model="slug"/>
      
      <label>Singular Name</label>
      <input type="text" placeholder="Post" v-model="singular"/>
      
      <label>Plural Name</label>
      <input type="text" placeholder="Posts" v-model="plural"/>
    
      <label>Top level</label>
      <input type="checkbox" v-model="topLevel"/>

      <label>Display posts in Rest?</label>
      <input type="checkbox" v-model="rest"/>

      <label>Use content editor</label>
      <input type="checkbox" v-model="contentEditor"/>

      <label>Use page builder</label>
      <input type="checkbox" v-model="pageBuilder"/>


      <button @click="create" class="btn btn-primary">Create!</button>

    </section>
</template>
<script setup>
import { useAppStore } from '../store/store';
const store = useAppStore();
import {ref,onMounted} from 'vue'
defineProps(['setCurrentStep']);

const siteTitle = ref('');
const siteTagLine = ref('');
const hasSlugChanged = ref(false);
const title = ref('');
const slug = ref('');
const singular = ref('');
const plural = ref('');

const onTitleInput = (e) => {
    if(!hasSlugChanged.value) {
        slug.value = title.value.toLowerCase().replaceAll(' ', '-');
    }   
}

const onSlugChange = () => {
    if(slug.value !== title.value.toLowerCase().replaceAll(' ', '-')) {
        hasSlugChanged.value = true;
    }
}

const create = () => {
    if(title.value == '') {
       return alert('Please add a title')
    }
    if(slug.value == '') {
       return alert('Please add a slug')
    }
}



onMounted(() => {
   
})

</script>
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

const hasSlugChanged = ref(false);
const title = ref('');
const slug = ref('');
const singular = ref('');
const plural = ref('');
const contentEditor = ref(true);
const pageBuilder = ref(true);

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

const create = async () => {
    if(title.value == '') {
       return alert('Please add a title')
    }
    if(slug.value == '') {
       return alert('Please add a slug')
    }

    const json = JSON.stringify({
        title : title.value,
        slug: slug.value,
        singular: singular.value,
        plural: plural.value,
        content_editor: contentEditor.value,
        page_builder : pageBuilder.value
    })
    const formData = new FormData();
    formData.append('cpt', json);
    await fetch('/np-admin/np-ajax/?action=create_cpt' , {
        method : 'post',
        body : formData
    })

    window.location.href = '/np-admin/cps/view-all';
}



onMounted(() => {
   
})

</script>
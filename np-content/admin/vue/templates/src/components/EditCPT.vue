<template>
<div class="edit-cpt">

      <h2>Edit CPT</h2>
     
      <label>Title</label>
      <input  type="text" placeholder="Blog" v-model="currentCPT.title"/>
      
      <label>Slug</label>
      <input  type="text" placeholder="blog" v-model="currentCPT.slug"/>
      
      <label>Singular Name</label>
      <input type="text" placeholder="Post" v-model="currentCPT.singular"/>
      
      <label>Plural Name</label>
      <input type="text" placeholder="Posts" v-model="currentCPT.plural"/>
    
      <label>Top level</label>
      <input type="checkbox" v-model="currentCPT.top_level"/>

      <label>Display posts in Rest?</label>
      <input type="checkbox" v-model="currentCPT.use_rest"/>

      <label>Use content editor</label>
      <input type="checkbox" v-model="currentCPT.content_editor"/>

      <label>Use page builder</label>
      <input type="checkbox" v-model="currentCPT.page_builder"/>
      
      <button @click="update(currentCPT,displayEdit)" class="btn btn-primary">Update!</button>


</div>
</template>

<script setup>

defineProps(['currentCPT','displayEdit'])

const update = async (cpt,displayEdit) => {

    const json = JSON.stringify(cpt)
    
    const formData = new FormData();
    
    formData.append('cpt', json);

    await fetch('/np-admin/np-ajax/?action=update_cpt' , {
        method : 'post',
        body : formData
    })
}
</script>
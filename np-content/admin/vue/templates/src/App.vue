<template>
    <div class="templates">

        <table width="60%">
            <tbody>
                
                <tr>
                    <th>Template Name</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>

                <tr v-for="template in templates">
                    <td>{{ template.name }}</td>
                    <td><a :href="`/np-admin/edit-template/${template.id}`">Edit</a></td>
                    <td><button @click="deleteTemplate(template)">Delete</button></td>
                </tr>

            </tbody>
        
        </table>

        <button @click="displayNewTemplatePopup = true">+ Add Template</button>

        <div v-if="displayNewTemplatePopup" class="new-template-popup">
            
            <div @click="displayNewTemplatePopup = false" class="close-button">X</div>

            <label>Template Name</label>
            
            <input v-model="newTemplateName" type="text" />
            
            <button @click="createTemplate">Create Template</button>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

let postType = '';

const templates = ref([]);

const newTemplateName = ref('');

const displayNewTemplatePopup = ref(false);

const createTemplate = async () => {

    if(newTemplateName.value === '') {
        alert('Please enter a template name');
        return;
    }   

    const newTemplate = {
        name : newTemplateName.value,
    }
    
    const formData = new FormData();
    formData.append('post_type', postType);
    formData.append('name', newTemplate.name)

    const response = await fetch('/np-admin/np-ajax/?action=create-template', {
        method:'post',
        body: formData
    })

    const id = await response.text();
    
    newTemplate.id = id;

    templates.value.push(newTemplate);

}

onMounted(async () => {

    const splitURL = window.location.href.split('/');

    postType = splitURL[5];

    const response = await fetch('/np-admin/np-ajax/?action=get_templates&post_type=' + postType);

    const json = await response.json();

    templates.value = json;

})



</script>

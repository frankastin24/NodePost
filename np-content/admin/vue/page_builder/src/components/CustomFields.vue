<template>
    <div class="custom-fields">

        <div class="fields">
            
            <h2>Custom Fields</h2>

            <div class="field flex" v-for="field in store.customFields">
                <h4>{{field.title}}</h4>

                <input type="text" v-model="field.value" v-if="field.type == 'text'"/>
                <input type="number" v-model="field.value" v-if="field.type == 'number'"/>
                <textarea v-model="field.value" v-if="field.type == 'long-text' || field.type == 'html' || field.type == 'json' ">
                </textarea>
            </div>

            <button class="btn btn-primary" @click="displayCreateField = true">Create New Field</button>

        </div>

        <div v-if="displayCreateField" class="register-field">

            <div @click="displayCreateField = false" class="close">X</div>

            <h2>Register Custom Field</h2>

            <div class="field">
                <label>Field Title</label>
                <input type="text" v-model="newFieldTitle" />
            </div>
            
            <div class="field">
                <label>Field Type</label>

                <select v-model="newFieldType">
                    <option value="text">Short Text</option>
                    <option value="long-text">Long Text</option>
                    <option value="number">Number</option>
                    <option value="html">HTML</option>
                </select>

            </div>

            <div class="checkbox">
                <label>Isolate to this post?</label>
                <input type="checkbox" v-model="newFieldIsolate" />
            </div>

            <button class="btn btn-primary" @click="createField">Create Field</button>


        </div>
    </div>

</template>

<script setup>

import { ref } from 'vue';
import {useAppStore} from '../store/store';

let store = useAppStore();

const displayCreateField = ref(false);
const newFieldTitle = ref('');
const newFieldType = ref('text');
const newFieldIsolate = ref(false);
const newFieldDefault = ref('');

const createField = async () => {
    
    const field = {
        cpt : store.postType,
        title : newFieldTitle.value,
        type : newFieldType.value,
        isolateToPost : (newFieldIsolate.value ? store.postID : false ),
        value : '',
        defaultValue : newFieldDefault.value
    }

    store.customFields.push(field);
    
    const formData = new FormData();
    formData.append('field', JSON.stringify(field));

    await fetch('/np-admin/np-ajax?action=register_custom_field', {
        method:'post',
        body : formData
    })

}

</script>
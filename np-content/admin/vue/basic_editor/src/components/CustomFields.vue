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

        </div>

        <div v-if="displayCreateField" class="register-field">

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

const displayCreateField = ref(true);
const newFieldTitle = ref('');
const newFieldType = ref('text');
const newFieldIsolate = ref(false);

const createField = () => {
    const field = {
        cpt : store.postType,
        title : newFieldTitle.value,
        type : newFieldType.value,
        isolateToPost : (newFieldIsolate.value ? false : store.postID)
    }


}

</script>
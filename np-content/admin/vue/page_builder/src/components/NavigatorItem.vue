<template>

    <div @click="store.currentElement = element" :class="['navigator-item', 'flex', (store.currentElement == element ? 'selected' : '')]" :data-container="container">

        <img :src="`/np-content/admin/img/${element.type}.svg`" alt="icon" />

        <span><input v-if="editingId" v-model="element.id" type="text" /><p @click="editId" v-if="!editingId">{{element.id != '' ? element.id : element.type}}</p></span>

    </div>


</template>

<script setup>
defineProps(['container','element']);
import {useAppStore} from '../store/store';
const store = useAppStore();
import {ref} from 'vue';

const editingId = ref(false);

let isDoubleClick = false;

const editId = () => {
    if(isDoubleClick) {
        isDoubleClick = false;
        editingId.value = true;
        return;
    }
    isDoubleClick = true;
    setTimeout(() => {
        isDoubleClick = false;
    },300); 
    
}

</script>
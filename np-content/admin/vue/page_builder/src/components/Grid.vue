<template>
    <div class="grid">

        <div v-for="n in gridXLines" :key="'v'+n" 
            :style="{
                left: (n * store.gridSize) + 'px',
                borderLeft: '1px solid rgba(0,0,0,0.1)',
                position: 'absolute',
                top: '0',
                bottom: '0'
            }"
        ></div>

        <div v-for="n in gridYLines" :key="'h'+n" 
            :style="{
                top: (n * store.gridSize) + 'px',
                borderTop: '1px solid rgba(0,0,0,0.1)',
                position: 'absolute',
                left: '0',
                right: '0'
            }"
        ></div>

    </div>
</template>
<script setup>

import { useAppStore } from '../store/store';   
const store = useAppStore();    

import {ref,onMounted} from 'vue';

const gridXLines = ref(10);
const gridYLines = ref(10);

onMounted(() => {
    gridXLines.value = Math.floor(window.innerWidth / store.gridSize);
    gridYLines.value = Math.floor(window.innerHeight / store.gridSize);
})


</script>
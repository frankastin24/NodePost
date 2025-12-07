<template>
    <div class="cpt">
        
        <ListCPTs v-if="appState == 'list'"/>

        <CreateCPT v-if="appState == 'create'"/>

    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import ListCPTs from './components/ListCPTs.vue';
import CreateCPT from './components/CreateCPT.vue';

const appState = ref('list')


onMounted(async () => {
    if(window.location.href.includes('view-all')) {
        appState.value = 'list';
    } else {
        appState.value = 'create';
    }

})



</script>

<template>
    <div class="page-builder">

        <MenuBar />
        
        <TopBar />

        <Grid v-if="store.showGrid" />

        <div @click="selectRootContainer"
            :class="['stage', 'root-container', (store.rootElement == store.currentContainer ? 'current-container' : '')]">
        </div>

    </div>
</template>

<script setup>
import { onMounted,ref } from 'vue';
import { useAppStore } from './store/store';
import TopBar from './components/TopBar.vue';
import MenuBar from './components/MenuBar.vue';
import Grid from './components/Grid.vue';


const store = useAppStore();


onMounted(async () => {

    store.currentContainer = store.rootElement;

    store.containers.push(store.currentContainer);
    
    const splitURL = window.location.href.split('/');
    const templateId = splitURL[splitURL.length - 1];

    const response = await fetch('/np-admin/np-ajax/?action=get-template&id=' + templateId)
     
})


document.addEventListener("paste", function (e) {

    const pasted = (e.clipboardData || window.clipboardData).getData('text/html');


});
function selectRootContainer() {
    store.currentContainer = store.rootElement;
}
</script>

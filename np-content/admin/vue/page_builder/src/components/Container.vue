<template>
    <div @click.stop="selectContainer(element)" :data-container-index="element.index" :style="elementStyles(element)" :class="[element.classes,(store.currentContainer == element.elements ? 'current-container':'')]">
         <DragArea index="0" :containerIndex="element.index" />

           <div v-for="(subElement,index) in element.elements">
            
                <DragContainer :containerIndex="element.index" :element="subElement">
                    <HTMLElements :container="element.elements" :element="subElement" />
                </DragContainer>

                <DragArea :index="(index + 1)" :containerIndex="element.index" />
            </div>
    </div>
</template>
<script setup>
import HTMLElements from './HTMLElements.vue';
import DragArea from './DragArea.vue';
import DragContainer from './DragContainer.vue';
defineProps(['element']);
import {useAppStore} from '../store/store';
const store = useAppStore();
const selectContainer = (container) => {

    if(store.currentContainer == container) return;

    store.currentContainer = container;

}
const elementStyles = (element) => {
    return {
        width:`calc(${element.width} - 42px)`,
        minHeight:element.height,
        maxWidth: 'calc(100% - 42px)',
        background:element.background,
        backgroundSize: element.backgroundSize,
    }
}
</script>
<template>
    
    <div @click.stop="selectElement(column)"  :style="columnStyles(column,container)" :class="[column.classes,(column.elements == store.currentContainer ? 'current-container' : '')]">
        
        <DragArea index="0" :containerIndex="column.index" />

        <div v-for="(element,index) in column.elements">
            
            <DragContainer :containerIndex="column.index" :element="element">
                <HTMLElements :container="column.elements" :element="element" />
            </DragContainer>

            <DragArea :index="(index + 1)" :containerIndex="column.index" />

        </div>
    </div>

</template>

<script setup>
defineProps(['column','container']);

import {useAppStore} from '../store/store';
import HTMLElements from './HTMLElements.vue';
import DragArea from './DragArea.vue';
import DragContainer from './DragContainer.vue';
const store = useAppStore();

const columnStyles = (column,container) => {
   const gap = container.gap * (container.columns.length - 1);
    return {
         width: `calc(${column.width} - ${gap}px)`,       // Subtract gap once per column.
        minWidth: `calc(${column.width} - ${gap}px)`,
        minHeight: '100px',
              
    }
}

const selectElement = (column) => {
    
    store.currentElement = column;
    store.currentContainer = column.elements;
    
}

</script>
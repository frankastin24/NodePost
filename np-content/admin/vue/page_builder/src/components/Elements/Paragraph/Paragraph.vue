<template>

<div @click="selectElement(element)">
        
    <ParagraphOptions :element="element"/>

    <ParagraphElement v-model="element.content" :class="element.classes" :style="elementStyles(element)"/>
</div>

</template>
<script setup>
import ParagraphOptions from './ParagraphOptions.vue';
import ParagraphElement from './ParagraphElement.vue';
import {useAppStore} from '../../store/store';

const store = useAppStore();

defineProps(['element']);

const selectElement = (element) => {
    store.currentElement = element;
}

const elementStyles = (element) => {
    return {
        textAlign:element.align,
    }
}
</script>
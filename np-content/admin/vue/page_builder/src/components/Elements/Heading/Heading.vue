<template>
<div @click.stop="selectElement(element)">
        
    <HeadingOptions :element="element"/>

    <HeadingElement v-model="element.content" :class="element.classes" :style="elementStyles(element)"/>

 </div>
</template>
<script setup>
import HeadingOptions from './HeadingOptions.vue';
import HeadingElement from './HeadingElement.vue';
import {useAppStore} from '../../store/store';

const store = useAppStore();

defineProps(['element']);

const selectElement = (element) => {
    store.currentElement = element;
}


const elementStyles = (element) => {

    const fontSizes = {
        h1 : '40px',
        h2 : '35px',
        h3 : '30px',
        h4 : '25px',
        h5 : '20px',
        h6 : '15px'
    }

    return {
        fontSize : fontSizes[element.level],
        color: element.color,
        textAlign:element.align,
        fontWeight:(element.bold ? 'bold' : 'normal')
    }
}
</script>
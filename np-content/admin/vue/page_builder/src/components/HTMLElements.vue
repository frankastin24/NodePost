<template>
    
    <Container :element="element" @click="selectElement(element,container)"  v-if="element.type == 'container'" />
    
    <div @click.stop="selectElement(element,container)" v-if="element.type == 'columns'" style="position:relative;" :class="element.classes">
        <div :style="{width:'calc(100% - 74px)',display:'flex',gap: element.gap + 'px'}">
        <Column :column="column" :container="element" v-for="(column, index) in element.columns"/>
        </div>
    </div>
    
    <Heading @click.stop="selectElement(element,container)" :element="element" v-if="element.type == 'heading'"/>
    
    <Paragraph @click.stop="selectElement(element,container)" :element="element" v-if="element.type == 'paragraph'"/>
    
    <Image @click.stop="selectElement(element,container)" :element="element" v-if="element.type == 'image'"/>
    
    <Spacer  @click.stop="selectElement(element,container)" :element="element" v-if="element.type == 'spacer'"/>

    <Video @click.stop="selectElement(element,container)" :element="element" v-if="element.type == 'video'"/>

    <Gallery @click.stop="selectElement(element,container)" :element="element" v-if="element.type == 'gallery'"/>

    <Button @click.stop="selectElement(element,container)" :element="element" v-if="element.type == 'button'"/>
    

</template>

<script setup>

defineProps(['element','container']);

import Column from './Column.vue';
import Heading from './Heading/Heading.vue';
import Paragraph from './Paragraph/Paragraph.vue';
import Button from './Button/Button.vue';
import Image from './Image/Image.vue';
import Video from './Video/Video.vue';
import Gallery from './Gallery/Gallery.vue';
import Container from './Container.vue';
import Spacer from './Spacer.vue';

import {useAppStore} from '../store/store';
const store = useAppStore();


const selectElement = (currentElement,container) => {
    store.currentElement = currentElement;
    store.currentContainer = container;

    if(currentElement.type == 'container' || currentElement.type == 'column') {
        store.currentContainer = currentElement.elements;
    }
}


</script>
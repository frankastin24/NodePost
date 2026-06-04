<template>
    <button @click="selectContainer" class="select-element">
        <div class="container-icon"></div>
        <p>Container</p>
    </button>
</template>
<script setup>
import { useAppStore } from '../../store/store';

const store = useAppStore();

const properties = {
    width: '100%',
    height: 'auto',
    top: '0px',
    left: '0px',
    float: store.designMode === 'design' ? true : false,
    margin: {
        top: '0px',
        bottom: '0px',
        left: '0px',
        right: '0px',
    },
    padding: {
        top: '10px',
        bottom: '10px',
        left: '10px',
        right: '10px',
    },
    border: {
        width: '0px',
        style: 'solid',
        color: '#000000',
    },
    borderRadius: '0px',
};

const selectContainer = () => {
    const element = {

        type: 'container',
        id: Date.now(),

        classes: 'np-container np-element',
        extraClasses: '',


        responsive: {
            desktop: properties,
            laptop: JSON.parse(JSON.stringify(properties)),
            tablet: JSON.parse(JSON.stringify(properties)),
            mobile: JSON.parse(JSON.stringify(properties)),
        },
        elements: [],
    };

    store.currentContainer.push(element);
    store.selectedElement = element;

};  

</script>
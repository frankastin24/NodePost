<template>
    <button @click="addHeader" class="select-element">
        <img width="20" src="/np-content/admin/img/header.svg" />
        <p>Header</p>
    </button>
</template>
<script setup>

import { useAppStore } from '../../store/store';

const store = useAppStore();
const properties = {
    padding: {
        top: '10px',
        bottom: '10px',
        left: '20px',
        right: '20px',
    },

    border: {
        top: {
            width: '0px',
            style: 'solid',
            color: '#000000',
        },
        right: {
            width: '0px',
            style: 'solid',
            color: '#000000',
        },
        bottom: {
            width: '0px',
            style: 'solid',
            color: '#000000',
        },
        left: {
            width: '0px',
            style: 'solid',
            color: '#000000',
        }
    },

    borderRadius: '4px',
    align: 'left',
    color: '#000000',
    height: '60px',
    backgroundColor: '#ffffff',
    width: '100%'
}
const addHeader = () => {
    const element = {
        type: 'header',
        id: Date.now(),

        elements: [],
        responsive: {
            desktop: properties,
            laptop: JSON.parse(JSON.stringify(properties)),
            tablet: JSON.parse(JSON.stringify(properties)),
            mobile: JSON.parse(JSON.stringify(properties)),
        },
    };

    store.currentContainer.push(element);
    store.selectedElement = element;

};



</script>
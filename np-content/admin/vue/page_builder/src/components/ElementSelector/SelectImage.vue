<template>
    <button @click="addImage">
        <img width="20" src="/np-content/admin/img/image-upload.svg"/>
        <p>Image</p>
    
    </button>
    </template>

<script setup>

import { useAppStore } from '../../store/store';

const store = useAppStore();

const addImage = () => {

    store.displayFileBrowser = true;

    /*

    store.currentContainer.push({
        
        type: 'image',

        src: '',

        alt: '',

        classes: 'np-image np-element',
        
        extraClasses: '',
        
        id: '',
       
        responsive: {
            desktop: {
                
                width: 'auto',
                height: 'auto',
                
                top: '0px',
                left: '0px',
                cover: false,
                contain: false,
                imagePosition: 'center',

                margin: {
                    top: '0px',
                    bottom: '0px',
                    left: '0px',
                    right: '0px',
                },
                border: {
                    width: '0px',
                    style: 'solid',
                    color: '#000000',
                },
                borderRadius: '0px',
            },
            laptop: null,
            tablet: null,
            mobile: null,
        },
 
    });

    */

}
</script>
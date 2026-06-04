<template>
    <button @click="addButton">
        <img width="20" src="/np-content/admin/img/button.svg" />
        <p>Button</p>
    </button>
</template>

<script setup>
import { useAppStore } from '../../store/store';
const store = useAppStore();

const addButton = () => {

    const properties = {
                width: 'auto',
                height: 'auto',
                top: '0px',
                left: '0px',
                margin: {
                    top: '0px',
                    bottom: '0px',
                    left: '0px',
                    right: '0px',
                },
                padding: {
                    top: '10px',
                    bottom: '10px',
                    left: '20px',
                    right: '20px',
                },
                fontSize: '16px',
                border: {
                    width: '1px',
                    style: 'solid',
                    color: '#000000',
                },
                underline: false,
                borderRadius: '4px',
                align: 'center',
                color: '#000000',
                background: '#ffffff',
                 bold: true,
            };

    store.currentContainer.push({
        
        type: 'button',

        content: '',

        classes: 'np-button np-element',
        
        extraClasses: '',
        
        id: '',
        
        link: '',
       
        responsive: {
            desktop: properties,
            laptop: JSON.parse(JSON.stringify(properties)),
            tablet: JSON.parse(JSON.stringify(properties)),
            mobile: JSON.parse(JSON.stringify(properties)),
        },

    });

    store.unsavedChanges = true;

}   
</script>
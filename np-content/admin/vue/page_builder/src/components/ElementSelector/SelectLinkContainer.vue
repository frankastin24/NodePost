<template>
    <button @click="selectLink" class="select-element">
        <img width="20" src="/np-content/admin/img/link.svg"/>
        <p>Link Container</p>
    </button>
</template>
<script setup> 
   
    import { useAppStore } from '../../store/store';
    
    const store = useAppStore();

    const properties = {

        width: 'auto',
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

        border: {
            width: '0px',
            style: 'solid',
            color: '#000000',
        },

        borderRadius: '0px',
    
    };
    
    const selectLink = () => {
        const element = {
            type: 'link-container',
            id: Date.now(),
            href: '',
            openInNewTab: false,
            text: 'New Link',
            color: '#0000EE',
            fontSize: '16px',
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
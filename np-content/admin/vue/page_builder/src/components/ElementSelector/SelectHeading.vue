<template>
    <button @click="addHeading">
        <h1>H</h1>
        <p>Heading</p>
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
    level: 'h1',
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
    align: 'left',
    textAlign: 'left',
    bold: true,
    color: '#000',
};
const addHeading = () => {

    store.currentContainer.push({
        type: 'heading',
        content: '',
        classes: '',
        extraClasses: '',
        id: '',

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
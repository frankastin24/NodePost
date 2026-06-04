<template>
    <button @click="selectCarousel" class="select-element">
        <img width="20" src="/np-content/admin/img/carousel.svg" />
        <p>Carousel</p>
    </button>
</template>
<script setup>
import { useAppStore } from '../../store/store';

const store = useAppStore();
const properties = {

    width: '100%',
    height: '300px',
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
const selectCarousel = () => {
    const element = {
        type: 'carousel',
        id: Date.now(),

        images: [],
        direction: 'horizontal',
        carouselType: 'simple',
        autoPlay: false,
        autoPlayInterval: 3000,
        showIndicators: true,
        showArrows: true,
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
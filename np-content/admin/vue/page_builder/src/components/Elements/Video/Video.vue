<template>
 <div :style="styles(element)" class="video">
<video :style="videoStyles(element)" :src="element.src" @click.stop="selectElement(element,container)" v-if="element.type == 'video'">
       
</video>
</div>
</template>
<script setup>
defineProps(['element']);

const styles = (element) => {

    return {
        width: element.width + 'px',
        height: element.height + 'px',
        opacity: element.opacity,
        maxWidth: '100%',
        maxHeight: '200px'
    }

}

const videoStyles = (element) => {
    const style =  {
        
        width: '100%',
        height: '100%',
    }

    if(element.cover) {
       style.objectFit = 'cover';
    }

    if(element.contain) {
       style.objectFit = 'contain';
    }

    return style;
}

</script>
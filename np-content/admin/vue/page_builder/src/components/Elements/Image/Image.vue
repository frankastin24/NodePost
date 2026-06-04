<template>
   <div class="image" :style="imageStyles(element)" >
   
   </div>
</template>
<script setup>
defineProps(['element']);

const imageStyles = (element) => {

    let backgroundSize = `${element.width} ${element.height}`;

    if(element.cover) {
        backgroundSize = 'cover';
    }

    if(element.contain) {
        backgroundSize = 'contain';
    }

    let filter = "none";
    if(element.greyScale) {
        filter = 'greyscale';
    }

    if(element.sepia) {
        filter = 'sepia';
    }
    

    return {
        width:element.width,
        height:element.height,
        backgroundImage: `url("${element.src}")`,
        backgroundSize,
        filter,
        maxHeight:'200px',
        backgroundRepeat : 'no-repeat'
    }

}

</script>

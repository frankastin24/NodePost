<template>
     <div class="select-align" @click="showAlignDropdown(element)">
        <h4>{{displayAlign(element)}}</h4>
        <ul style="" v-if="element.showAligns"> 
            <li @click="changeAlign('left',element)">L</li>
            <li @click="changeAlign('center',element)">C</li>
            <li @click="changeAlign('right',element)">R</li>
        </ul>
     </div>
</template>
<script setup>

defineProps(['element']);

const showAlignDropdown = (element) => {

    element.showAligns = !element.showAligns;
    element.showLevels = false;
    element.displayElementOptions = false;

}

const displayAlign = (element) => {
    let letter = 'L';
    switch (element.align) {
        case 'left' :
            letter = 'L';
        break;
        
        case 'center' :
            letter = 'C';
        break;
        
        case 'right' :
            letter = 'R';
        break;
    }
    return letter;

}

const changeAlign = (align,element) => {
    element.align = align;
}

</script>

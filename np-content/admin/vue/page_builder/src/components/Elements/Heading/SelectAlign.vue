<template>
     <div class="select-align" @click="showAlignDropdown(element)">
       <img width="20" :src="currentSRC"/>
        <ul style="" v-if="element.showAligns"> 
            <li @click="changeAlign('left',element)"><img width="20" src="/np-content/admin/img/text-align-left.svg"/></li>
            <li @click="changeAlign('center',element)"><img width="20" src="/np-content/admin/img/text-align-center.svg"/></li>
            <li @click="changeAlign('right',element)"><img width="20" src="/np-content/admin/img/text-align-right.svg"/></li>
        </ul>
     </div>
</template>
<script setup>

defineProps(['element']);
import {ref} from 'vue'
const showAlignDropdown = (element) => {

    element.showAligns = !element.showAligns;
    element.showLevels = false;
    element.displayElementOptions = false;

}
const currentSRC = ref('/np-content/admin/img/text-align-left.svg');


const changeAlign = (align,element) => {
    element.align = align;
     switch (element.align) {
        case 'left' :
            currentSRC.value = '/np-content/admin/img/text-align-left.svg';
        break;
        
        case 'center' :
            currentSRC.value = '/np-content/admin/img/text-align-center.svg';
        break;
        
        case 'right' :
            currentSRC.value = '/np-content/admin/img/text-align-right.svg';
        break;
    }
}

</script>

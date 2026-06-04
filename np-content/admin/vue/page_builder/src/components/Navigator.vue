<template>

    <div class="navigator">

        <h1>Navigator</h1>
         
        <div data-container="0" class="drop-zone"></div>

         <div v-for="element in store.rootElement">

            <DragContainer containerIndex="0" :element="element">
               <NavigatorItem :container="0" :element="element" />
            </DragContainer>
            
            <div data-container="0" class="drop-zone"></div>

         </div>

    </div>


</template>

<script setup>  
import NavigatorItem from './NavigatorItem.vue';
import DragContainer from './DragContainer.vue';
import {useAppStore} from '../store/store';
const store = useAppStore();    
</script>
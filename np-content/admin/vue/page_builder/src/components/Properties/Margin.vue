<template>
   <div class="margins">
        <div class="margin-control">
            
            <input type="text" id="margin-top" v-model="store.currentElement.responsive[store.currentBreakpoint].margin.top" @input="updateMargin('top', properties.margin.top)" />
        </div>
        <div class="margin-control">
           <input type="text" id="margin-bottom" v-model="store.currentElement.responsive[store.currentBreakpoint].margin.bottom" @input="updateMargin('bottom', store.currentElement.responsive[store.currentBreakpoint].margin.bottom)" />
        </div>
        <div class="margin-control">
            <input type="text" id="margin-left" v-model="store.currentElement.responsive[store.currentBreakpoint].margin.left" @input="updateMargin('left', store.currentElement.responsive[store.currentBreakpoint].margin.left)" />
        </div>
        <div class="margin-control">
            <input type="text" id="margin-right" v-model="store.currentElement.responsive[store.currentBreakpoint].margin.right" @input="updateMargin('right', store.currentElement.responsive[store.currentBreakpoint].margin.right)" />
        </div>
   </div>
</template>


<script setup>  

import { useAppStore } from '../../store/store';    
const store = useAppStore();

</script>
<template>

<div class="np-element np-spacer " :style="{height:(element.height * 10) +'px'}">
<div v-if="store.currentElement == element" class="spacer-options flex">
    <p>Height</p>
    <input type="number" v-model="element.height"/> 
</div>
<div class="flex flex-center align-center">
<img style="height:50px;margin:auto;opacity:0.4;max-height:80%" src="/np-content/admin/img/spacer.svg"/>
</div>
</div>
</template>
<script setup>
import { useAppStore } from '../store/store'
const store = useAppStore()
defineProps(['element'])

</script>
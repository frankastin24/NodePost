<template>

    <div @click.stop="showLevelDropdown(element)" class="select-level">
            
        <h4>{{element.level.toUpperCase()}}</h4>

        <ul v-if="element.showLevels">
            <li v-if="element.level != 'h1'" @click="changeLevel(element,'h1',showLevels)">H1</li>
            <li v-if="element.level != 'h2'" @click="changeLevel(element,'h2',showLevels)">H2</li>
            <li v-if="element.level != 'h3'" @click="changeLevel(element,'h3',showLevels)">H3</li>
            <li v-if="element.level != 'h4'" @click="changeLevel(element,'h4',showLevels)">H4</li>
            <li v-if="element.level != 'h5'" @click="changeLevel(element,'h5',showLevels)">H5</li>
            <li v-if="element.level != 'h6'" @click="changeLevel(element,'h6',showLevels)">H6</li>
        </ul>

    </div>

</template>

<script setup>
defineProps(['element']);

const showLevelDropdown = (element) => {
    element.showLevels = !element.showLevels;
    element.showAligns = false;
    element.displayElementOptions = false;
}

const changeLevel = (element,level) => {
    element.level = level;
    
}

</script>
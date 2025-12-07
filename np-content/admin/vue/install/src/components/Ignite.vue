<template>
    <section  class="np-install-section" id="np-mysql-details">

        <h1>{{ store.langObj['How would you like to start?'] }}</h1>

        <div class="ignite-buttons flex justify-center flex-wrap">
            <button class="btn btn-primary" @click="startWithIgnition">{{ store.langObj['Start With The Ignition Theme']}}</button>
            <button class="btn btn-primary" @click="startWithBlank">{{ store.langObj['Start With The Blank Theme'] }}</button>
            <button class="btn btn-primary" @click="buildWithAI">{{ store.langObj['Build The Site With AI'] }}</button>
            <button class="btn btn-primary" @click="cloneSite">{{ store.langObj['Clone an existing site'] }}</button>
        </div>

        <div class="flex nav">
            <button class='btn btn-primary' @click="previous">{{ store.langObj['Previous'] }}</button>
        </div>


    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAppStore } from '../store/store';
const store = useAppStore();
const startWithIgnition = async () => {
    await fetch('/np-ajax/?action=start_with_igition');
    window.location.href = '/np-admin/';
}

const startWithBlank = async () => {
    await fetch('/np-ajax/?action=start_with_blank');
    window.location.href = '/np-admin/';
}

const previous = () => {
    store.step = 4;
}

</script>
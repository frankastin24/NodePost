<template>
    <div class="install">

        <p class="version">©2025 <a href="https://fuseolution.com">Fuseolution</a> | Version 0.5 </p>
        
        <Language :setCurrentStep="setCurrentStep" v-if="store.step == 1" />
        <Database :setCurrentStep="setCurrentStep" v-if="store.step == 2" />
        <MySQLCreds :setCurrentStep="setCurrentStep" v-if="store.step == 3" />
        <SiteDetails :setCurrentStep="setCurrentStep" v-if="store.step == 4" />
        <AdminCreds :setCurrentStep="setCurrentStep" v-if="store.step == 5" />
        <Ignite :setCurrentStep="setCurrentStep" v-if="store.step == 6" />
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Language from './components/Language.vue';
import Database from './components/Database.vue';
import MySQLCreds from './components/MySQLCreds.vue';
import SiteDetails from './components/SiteDetails.vue';
import AdminCreds from './components/AdminCreds.vue';
import Ignite from './components/Ignite.vue';
import { useAppStore } from './store/store';
const store = useAppStore();

const setCurrentStep = async (step) => {
    await fetch('/np-ajax/?action=set_current_step&step=' + step);
}

const getInstallStep = async () => {
    const response = await fetch('/np-ajax/?action=get_install_step');
    const currentStep = await response.text();
    store.step = parseInt(currentStep);
}


onMounted(async () => {

    getInstallStep();


})



</script>

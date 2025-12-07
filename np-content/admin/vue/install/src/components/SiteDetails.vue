<template>
    <section  class="np-install-section" id="np-mysql-details">

        <h1>Site Details</h1>

        <input v-model="siteTitle" :placeholder="store.langObj['Site Name']" type="text" />
        <input v-model="siteTagLine" :placeholder="store.langObj['Site Tag Line']" type="text" />

        <div class="flex nav">
            <button class='btn btn-primary' @click="previous(setCurrentStep)">{{ store.langObj['Previous'] }}</button>
            <button class='btn btn-primary next' @click="next(setCurrentStep)">{{ store.langObj['Next'] }}</button>
        </div>


    </section>
</template>
<script setup>
import { useAppStore } from '../store/store';
const store = useAppStore();
import {ref,onMounted} from 'vue'
defineProps(['setCurrentStep']);

const siteTitle = ref('');
const siteTagLine = ref('');

const getSiteDetails = async () => {
    const response = await fetch('/np-ajax/?action=get_site_details');
    const siteDetails = await response.json();

    siteTitle.value = siteDetails.site_title;
    siteTagLine.value = siteDetails.site_tag_line;

}

const updateSiteDetails = () => {

    const formData = new FormData()

    formData.append('site_title', siteTitle.value)
    formData.append('site_tag_line', siteTagLine.value)

    fetch('/np-ajax/?action=set_site_details', {
        method: 'post',
        body: formData,
    })

}
onMounted(() => {
    getSiteDetails();
})
const previous = () => {
    
store.step = (store.database == 'mysql'? 3 : 2 );
 setCurrentStep(store.step);  
}
const next = (setCurrentStep) => {
    updateSiteDetails();
    store.step = 5;
    setCurrentStep(5);

}
</script>
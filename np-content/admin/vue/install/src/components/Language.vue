<template>
    <section  class="np-install-section" id="np-select-lang">

        <h1>{{ store.langObj["Thanks for choosing NodePost!"] }}</h1>
        <h2>{{ store.langObj["Let's get started."] }}</h2>

        <h3>{{ languageTicker }}</h3>

        <select @change="changeLang" selected="en" v-model="store.lang">
            <option value="en">
                English
            </option>
            <option value="fr">
                Francais
            </option>
            <option value="es">
                Espanyol
            </option>
        </select>


        <a href="https://nodepost.org/request_lanuage">{{ store.langObj["Language not listed?"] }}</a>


        <div class="flex nav">
            <button class='btn btn-primary next' @click="next(setCurrentStep)">{{ store.langObj['Next'] }}</button>
        </div>

    </section>
</template>

<script setup>
import { useAppStore } from '../store/store';
const store = useAppStore();
import {ref,onMounted} from 'vue';
defineProps(['setCurrentStep'])
let languageTickerIndex = 0;

const languagesForTicker = [
    "Please select your language",
    "Por favor seleccione su idioma",
    "Veuillez sélectionner votre langue",
    "请选择您的语言"
]

const languageTicker = ref(languagesForTicker[0]);

const getCurrentLang = async () => {
   const response = await fetch('/np-ajax/?action=get_current_lang');
   const text = await response.text()
   store.lang = text;
   getLangObj(store.lang);
}

const getLangObj = async (lang) => {
   const response = await fetch('/languages/'+lang +'.json');
   const json = await response.json()
   
   store.langObj = json;
}

const setCurrentLang = async (newLang) => {

    await fetch('/np-ajax/?action=set_current_lang&lang='+newLang);
    
    getLangObj(newLang);

}

const changeLang = async (e) => {
    
    setCurrentLang(e.target.value);

}

const next = () => {
    store.step = 2;
    setCurrentStep(2);
}

onMounted(() => {
    
    getCurrentLang();

    setInterval(() => {
       languageTickerIndex ++;
       const numLangs = languagesForTicker.length - 1;
       if(languageTickerIndex > numLangs) {
          languageTickerIndex = 0;
       }
       languageTicker.value = languagesForTicker[languageTickerIndex];

    }, 2000)

})

</script>
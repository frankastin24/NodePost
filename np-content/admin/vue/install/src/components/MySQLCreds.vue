<template>
    <section  class="np-install-section" id="np-mysql-details">

        <h1>{{ store.langObj['MySQL Credentials'] }}</h1>
        <p>{{ store.langObj['Ensure you have mysql installed on your system.'] }} <a
                href="https://nodepost.org/install-mysql">{{ store.langObj["If you don't know how to install it click here!"]}}</a></p>

        <input v-model="databaseCreds.host" :placeholder="store.langObj['Database Host']" value="localhost"
            type="text"></input>
        <input v-model="databaseCreds.name" :placeholder="store.langObj['Database Name']" value="localhost"
            type="text"></input>
        <input v-model="databaseCreds.username" :placeholder="store.langObj['Database Username']" value="localhost"
            type="text"></input>
        <input v-model="databaseCreds.password" :placeholder="store.langObj['Database Password']" value="localhost"
            type="text"></input>
        
          
        <div class="checkbox">
            <input id="createDB" type="checkbox" v-model="createDB"/>
            <label for="createDB">Create Database</label>
        </div>

         <p>Select if you have not created a database for your project.</p>


        <p class="error">{{ databaseError }}</p>
        <p v-if="connectionOK" class="success">Connection Success</p>

        <div class="flex nav">
            <button class='btn btn-primary' @click="previous(setCurrentStep)">{{ store.langObj['Previous'] }}</button>

            <button class="btn btn-primary next" @click="testConnection(setCurrentStep)">Test Connection</button>
        </div>

    </section>
</template>

<script setup>
import { useAppStore } from '../store/store';
import {ref} from 'vue'
defineProps(['setCurrentStep']);
const connectionOK = ref(false);

const store = useAppStore();

const databaseCreds = ref({
    host: 'localhost',
    name : '',
    username : '',
    password : '',
})

const createDB = ref(true);

const setMySQLCreds = async () => {
    const params = new URLSearchParams()
     params.append('action', 'set_mysql_creds')
    params.append('host', databaseCreds.value.host)
    params.append('name', databaseCreds.value.name)
    params.append('username', databaseCreds.value.username)
    params.append('password', databaseCreds.value.password)
    await fetch('/np-ajax?'+params.toString());
}

const testConnection = async () => {
    await setMySQLCreds();
    
    // const response = await fetch('/np-ajax/?action=test_mysql_creds');
    
    // const isOK = await response.text();

    // if(isOK == 'success') {
       
    // } else {

    // }

}

const getMySQLCreds = () => {

}

const previous = (setCurrentStep) => {
    
    store.step = 2;

    setCurrentStep(2);
    
}
</script>
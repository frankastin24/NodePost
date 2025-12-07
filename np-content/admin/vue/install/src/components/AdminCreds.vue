<template>

    <section class="np-install-section" id="np-mysql-details">

        <h1>{{ store.langObj["Site Credentials"] }}</h1>

        <input v-model="username" :placeholder="store.langObj['Username']" type="text" />
        <input v-model="password" :placeholder="store.langObj['Password']" type="password" />

        <div class="flex nav">
            <button class='btn btn-primary' @click="previous">{{ store.langObj['Previous'] }}</button>
            <button class='btn btn-primary next' @click="next">{{ store.langObj['Next'] }}</button>
        </div>


    </section>


</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useAppStore } from '../store/store';
const store = useAppStore();

const userMessage = ref('');

const username = ref('');
const password = ref('');
onMounted(async () => {
    const userCreated = await checkIfUserCreated();
    if(userCreated) {
        store.step = 6;
    }

})
const checkIfUserCreated = async () => {

    const response = await fetch('/np-ajax/?action=check_admin_created');

    const userCreated = await response.text();

    return (userCreated == 'true');

}

const checkUserCreds = () => {
    if (username.value == '') {
        userMessage.value = 'Please enter a Username';
        return false;
    }
    if (password.value == '') {
        userMessage.value = 'Please enter a Password';
        return false;
    }

    return true;
}
const createUser = async () => {

    const formData = new FormData()

    formData.append('username', username.value)
    formData.append('password', password.value)

    await fetch('/np-ajax/?action=create_admin', {
        method: 'post',
        body: formData
    })

}

const next = async () => {

    const userCreated = await checkIfUserCreated();

    if (userCreated) {
        store.step = 6;
    } else {
        if (checkUserCreds()) {
            createUser();
            store.step = 6;
        }
    }

}
const previous = () => {

    store.step = 4;

}

</script>
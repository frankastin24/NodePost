<template>

    <div class="list-cpt">

        <h1>All Custom Post Types</h1>

        <table width="600px">
            <tbody>
                <tr>
                    <th>ID</th>
                    <th>Title</th>

                    <th></th>
                </tr>
                <tr v-for="cpt in cpts">
                    
                    <td>{{ cpt.id }}</td>
                    
                    <td>{{ cpt.title }}</td>

                    <td class="flex cpt-buttons"><button class="btn btn-primary" @click="edit(cpt)">Edit</button>
                        <button class="btn btn-primary" @click="remove(cpt)">Delete</button>
                    </td>

                </tr>
            </tbody>
        </table>

        <EditCPT v-if="displayEdit" :currentCPT="currentCPT" />

    </div>

</template>

<script setup>

import { ref, onMounted } from 'vue';
import EditCPT from './EditCPT.vue';

const cpts = ref([]);
const currentCPT = ref({});
const displayEdit = ref(false)

onMounted(async () => {
    const response = await fetch('/np-admin/np-ajax/?action=get_cpts');
    const json = await response.json();
    cpts.value = json;
})

const edit = (cpt) => {
    currentCPT.value = cpt;
    displayEdit.value = true;
}

const remove = async (cpt) => {
    const conf = confirm('Are you sure you want to delete this post type?');

    if (conf) {
        const response = await fetch('/np-admin/np-ajax/?action=delete_cpt&id=' + cpt.id)

        const index = cpts.value.indexOf(cpt);

        cpts.value.splice(index, 1);

    } 
}

const destroy = async (cpt) => {
   

    const conf = confirm('This will delete all the posts and the post type.  Are you sure?');

    if (conf) {
        const response = await fetch('/np-admin/np-ajax/?action=destroy_cpt&id=' + cpt.id)

        const index = cps.value.indexOf(cpt);

        cps.value.splice(index, 1);

    }
}

</script>
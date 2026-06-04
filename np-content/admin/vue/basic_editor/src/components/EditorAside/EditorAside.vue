<template>
    <div class="editor-aside">
        <div class="tabs">
            <header class="flex">
                <button @click="changeActiveTab(0)" :class="store.activeTab === 0 ? 'active' : ''">Element</button>
                <button @click="changeActiveTab(1)" :class="store.activeTab ===  1 ? 'active' : ''">Post</button>
            </header>
           
            <div v-if="store.activeTab === 0"  class="tab element-options-aside">
                
                <ColumnOptionsAside v-if="store.currentElement?.type == 'columns'" />
                <ImageOptionsAside v-if="store.currentElement?.type == 'image'" />
                <HeadingOptionsAside v-if="store.currentElement?.type == 'heading'" />
                
                <AllElementsAside v-if="store.currentElement" />
            </div>
            <div v-if="store.activeTab === 1" class="tab post-options-aside">
                <h4>POST STATUS: {{store.postStatus.toUpperCase()}}</h4>
                
                <div class="">
                    <button @click="publish" class="btn btn-primary">{{publishText()}}</button>
                    <a class="btn btn-primary" target="_blank" :href="`/np-admin/preview/${store.postID}`">Preview</a>
                    <button @click="saveDraft" class="btn btn-primary">{{draftText()}}</button>
                </div>

                <h4>SLUG</h4>
                <input class="slug" v-model="store.postSlug"/>
                
                <h4>POST DATE</h4>
                <div class="flex date">
                    <input class="year" v-model="store.year" />
                    <p>-</p>
                    <input class="date-small" v-model="store.month" />
                    <p>-</p>
                    <input class="date-small" v-model="store.day" />
                    <p> </p>
                    <input class="hour date-small" v-model="store.hour" />
                    <p>:</p>
                    <input class="date-small" v-model="store.min" />
                 </div>
                
                

                <h4>REVISIONS</h4>
                <p v-if="store.revisions.length === 0" class="small">No revisions saved</p>
                <ul>
                    <li v-for="revision in store.revisions">{{ revision.time }} <button class="btn btn-small" @click="loadRevision(revison)">Restore</button></li>
                </ul>
                
            </div>
        
        </div>

       

    </div>
</template>
<script setup>
import AllElementsAside from './ElementOptions/AllElementsAside.vue';
import ImageOptionsAside from './ElementOptions/ImageOptionsAside.vue';
import HeadingOptionsAside from './ElementOptions/HeadingOptionsAside.vue';
import ColumnOptionsAside from './ElementOptions/ColumnsOptions.vue';

import {useAppStore} from '../../store/store';
const store = useAppStore();
const changeActiveTab = (tab) => {
    store.activeTab = tab;
}
const publish = () => {

    store.postStatus = 'published';
    savePost();
    alert('Post published!');

}

const saveDraft = () => {
    store.postStatus = 'draft';
    savePost();
}

const savePost = async () => {
    
    const post = {
        title : store.postTitle,
        id: store.postID,
        content : store.rootElement,
        status : store.postStatus,
        slug : store.postSlug
    }

    const postJSON = JSON.stringify(post);
    const formData = new FormData();
    formData.append('post',postJSON);
    
    await fetch('/np-admin/np-ajax/?action=save_post' , {
        method : 'post',
        body : formData
    })

    const featuredFormData = new FormData();
    featuredFormData.append('key','featured_image')
    featuredFormData.append('postID',store.postID)
    featuredFormData.append('value', store.featuredImage);

    await fetch('/np-admin/np-ajax/?action=update_post_meta' , {
        method : 'post',
        body : featuredFormData
    })

    for (const field of store.customFields) {
         console.log(field.value);
        if(field.value != '') {

            const fieldFormData = new FormData();

            fieldFormData.append('postID', store.postID)
            fieldFormData.append('key', field.title)
            fieldFormData.append('value', field.value)

            await fetch('/np-admin/np-ajax/?action=update_post_meta', {
                method : 'post',
                body : fieldFormData
            });

        }
    }

}
const publishText = () => {
    if(store.postStatus == 'published') {
        return 'Update'
    } else {
        return 'Publish'
    }
}

const draftText = () => {
    if(store.postStatus == 'published') {
        return 'Set Draft'
    } else {
        return 'Save Draft'
    }
}

</script>
<template>
    <div>
        <input @focus="inputFocus" @blur="inputBlur" @input="onTitleInput" placeholder="Post Title" type="text" class="edit-post-title" v-model="store.postTitle" />

        <FeaturedImage />

        <div class="flex">

            <div @click="selectRootContainer"
                :class="['stage', 'root-container', (store.rootElement == store.currentContainer ? 'current-container' : '')]">

                <DragArea index="0" :containerIndex="0" />

                <div v-for="(element, index) in store.rootElement">
                    <DragContainer containerIndex="0" :element="element">
                        <HTMLElements :container="store.rootElement" :element="element" />
                    </DragContainer>
                    <DragArea :index="(index + 1)" :containerIndex="0" />
                </div>

            </div>

            <EditorAside />

        </div>

        <ElementSelector />

        <FileBrowser />

    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import EditorAside from './components/EditorAside/EditorAside.vue';
import HTMLElements from './components/HTMLElements.vue';
import DragContainer from './components/DragContainer.vue';
import DragArea from './components/DragArea.vue';
import FileBrowser from './components/FileBrowser/FileBrowser.vue';
import { useAppStore } from './store/store';
import FeaturedImage from './components/FeaturedImage.vue'
import ElementSelector from './components/ElementSelector.vue';
let inputIsFocused = false;


const store = useAppStore();

const inputFocus = () => {
    inputIsFocused = true;
}

const inputBlur = () => {
    inputIsFocused = false;
}

const onTitleInput = (e) => {
    store.postSlug = e.target.value.toLowerCase().replaceAll(' ','-');
}

const selectRootContainer = () => {
    store.currentContainer = store.rootElement;
}

onMounted(async () => {
    store.currentContainer = store.rootElement;
    store.containers.push(store.currentContainer);
    const splitURL = window.location.href.split('/');
   
    if( splitURL[4] == 'edit' ) {
       
        store.postID = parseInt(splitURL[5]);
        const response = await fetch('/np-admin/np-ajax?action=get_post&id='+store.postID);
        const post = await response.json();

        const featuredResponse = await fetch('/np-admin/np-ajax?action=get_post_meta&postID='+store.postID+'&key=featured_image');
        const featuredImage = await featuredResponse.text();

        if(featuredImage !== 'false') {
            store.featuredImage = featuredImage;
        }

        store.rootElement = (post.content == '' ? [] : JSON.parse(post.content) );
      
        store.currentContainer = store.rootElement;
        store.postStatus = (post.post_status == '') ? 'draft' : post.post_status;
        store.postTitle = post.title;
        store.postSlug = post.slug;
        store.containers = [store.rootElement];
        store.postType = post.post_type;

        const cfResponse = await fetch('/np-admin/np-ajax/?action=get_custom_fields&post_type='+store.postType );

        store.customFields = await cfResponse.json();
        
        store.rootElement.forEach((element) => {

            if(element.type == 'container') {
                store.containers.push(element.elements);
            }
        })

        const dateTime = post.createdAt.substr(0,post.createdAt.length - 5).split('T');
        
        const date = dateTime[0].split('-');
        store.year = date[0];
        store.month = date[1];
        store.day = date[2];
        const time = dateTime[1].split(':')
        store.hour = time[0];
        store.min = time[1];
       
    } else {

       const splitUrl = window.location.href.split('/')

       store.postType = splitUrl[5];

       const response = await fetch('/np-admin/np-ajax/?action=create_post&post_type='+store.postType );
       
       store.postID = await response.text();
       

       const cfResponse = await fetch('/np-admin/np-ajax/?action=get_custom_fields&post_type='+store.postType );

       store.customFields = await cfResponse.json();
       
       
    }
})


document.addEventListener("paste", function (e) {

    const pasted = (e.clipboardData || window.clipboardData).getData('text/html');

    if (pasted && !inputIsFocused) {
        const elements = parseHTML(pasted);

        elements.forEach((element) => {
            if (element.tag[0] == 'h') {
                store.currentContainer.push({
                    type: 'heading',
                    content: element.content,
                    type: 'heading',
                    text: 'Heading',
                    level: element.tag,
                    classes: ' np-heading',
                    id: '',
                    align: 'left',
                    color: '#000',
                    bold: true,
                    showLevels: false,
                    showAligns: false,
                    showElementOptions: false,
                    extraClasses: '',
                })
            } else if (element.tag == 'p' || element.tag == 'li') {
                store.currentContainer.push({
                    content: element.content,
                    type: 'paragraph',
                    classes: ' np-paragraph',
                    align: 'left',
                    color: '#000',
                    showAligns: false,
                    showElementOptions: false,
                    extraClasses: '',
                    id: '',
                })
            }
        })

    }



});

function parseHTML(htmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const results = [];

    function walk(node) {
        // Only process element nodes
        if (node.nodeType === Node.ELEMENT_NODE) {
            const tag = node.tagName.toLowerCase();

            // Get the text content trimmed
            const content = node.textContent.trim();

            if (content.length > 0) {
                results.push({
                    tag: tag,
                    content: content
                });
            }
        }

        // Recursively process all children
        node.childNodes.forEach(child => walk(child));
    }

    walk(doc.body);
    return results;
}
</script>

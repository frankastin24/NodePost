<template>
    <div>
        <input placeholder="Post Title" type="text" class="edit-post-title" v-model="store.postTitle" />

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

const store = useAppStore();

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

        store.rootElement = (post.content == '' ? [] : JSON.parse(post.content) );
      
        store.currentContainer = store.rootElement;
        store.postStatus = (post.post_status == '') ? 'draft' : post.post_status;
        store.postTitle = post.title;
        store.slug = post.slug;
        store.containers = [store.rootElement];
        
        store.rootElement.forEach((element) => {

            if(element.type == 'container') {
                store.containers.push(element.elements);
            }

           

        })

        const dateTime = post.createdAt.substr(0,post.createdAt.length - 5).split('T');
       
        const date = dateTime[0].split('-');
         console.log(date);
        store.year = date[0];
        store.month = date[1];
        store.day = date[2];

        const time = dateTime[1].split(':')
         console.log(time);
        store.hour = time[0];
        store.min = time[1];
       
    } else {

       const splitUrl = window.location.href.split('/')
       const response = await fetch('/np-admin/np-ajax/?action=create_post&post_type='+splitUrl[4] );
       store.postID = await response.text();
       
    }
})

const addContainersFromElement = (container) => {



}

document.addEventListener("paste", function (e) {

    const pasted = (e.clipboardData || window.clipboardData).getData('text/html');

    if (pasted) {
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

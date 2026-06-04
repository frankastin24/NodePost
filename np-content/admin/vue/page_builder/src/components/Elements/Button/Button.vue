<template>

    <div class="np-button">

        <div  v-if="element === store.currentElement" class="all-element-options flex">
            <div type="button" class="bold"  @mousedown.prevent="element.bold = !element.bold" >B</div>
            <div class="link-option" @click="toggleLink">

                <img width="20" src="/np-content/admin/img/link.svg" />

                <div v-if="displayLinkInput" class="link-input-container">
                    <p class="link-placeholder">{{ linkPlaceHolder }}</p>
                    <p class="link-input" type="text">{{ currentLink }}<span class="blinking-cursor">|</span></p>
                </div>
            </div>
        </div>
        <div class="flex flex-center">
          <ButtonText :style="styles(element)" v-model="element.text" />
        </div>
    </div>

</template>

<script setup>
import {ref} from 'vue';
defineProps(['element']);
import ButtonText from './ButtonText.vue';
import { useAppStore } from '../../store/store'
const store = useAppStore()
const styles = (element) => {
    return {
        backgroundColor: element.backgroundColor,
        color: element.textColor,
        fontWeight: (element.bold ? 'bold' : 'normal' ),
        border: element.borderWidth + ' solid ' + element.borderColor
    }
}

const currentLink = ref('');
const displayLinkInput = ref(false);

const linkPlaceHolderText = "Search or enter URL";
const linkPlaceHolder = ref(linkPlaceHolderText);

document.addEventListener('keydown', function (e) {
  // Ignore modifier keys, only accept visible keypresses
  if (displayLinkInput.value) {

    if (e.key.length === 1) {
      currentLink.value = currentLink.value += e.key;
      e.preventDefault(); // Prevent page scrolling etc.
    }

    if (e.key === 'Backspace') {
      currentLink.value = currentLink.value.slice(0, -1);
      e.preventDefault();
    }
    if(currentLink.value.length > 1) {
      linkPlaceHolder.value = '';
    } else {
      linkPlaceHolder.value = linkPlaceHolderText; 
    }
   
    setLink();
  }

});

const toggleLink = () => {
  if (!displayLinkInput.value) {
    
    const selection = window.getSelection();

    if (!selection.rangeCount) return null;

    // Get the node where the selection starts
    let node = selection.anchorNode;

    // If it's a text node, get its parent
    if (node.nodeType === Node.TEXT_NODE) {
      node = node.parentNode;
    }

    // Traverse up to find the span with class 'link'
    while (node && node !== document.body) {
      if (
        node.nodeType === Node.ELEMENT_NODE &&
        node.tagName.toLowerCase() === 'span' &&
        node.classList.contains('link')
      ) {
        currentLink.value = node.getAttribute('data-href');
      }
      node = node.parentNode;
    }
    //Please select text to add a link to
    displayLinkInput.value = true;


  } else {
    currentLink.value = '';
    displayLinkInput.value = false;
  }

}

</script>
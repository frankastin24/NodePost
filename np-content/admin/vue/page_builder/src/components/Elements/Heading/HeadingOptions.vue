<template>
    <div v-if="element == store.currentElement" class="all-element-options flex">
           
           <SelectLevel :element="element"/>
           
           <div @mousedown.prevent="changeBold(element)" class="bold">B</div>
           <div @mousedown.prevent="wrapSelection('em')" class="italic">i</div>
           
           <input type="color" v-model="element.color" />
           
          <SelectAlign :element="element"/>
          
           
        </div>
    </template>
    <script setup>

import {useAppStore} from '../../store/store';

const store = useAppStore();

defineProps(['element']);

import SelectLevel from './SelectLevel.vue';
import SelectAlign from './SelectAlign.vue';

const changeBold = (element) => {
    element.bold = !element.bold;
}

const wrapSelection = (tag) => {
  const sel = window.getSelection();
  if (!sel.rangeCount) return;

  const range = sel.getRangeAt(0);
  if (range.collapsed) return; // Nothing selected

  // Prevent nested tags by unwrapping if already inside
  const parentTag = sel.anchorNode.parentElement?.tagName.toLowerCase();
  if (parentTag === tag) {
    // Unwrap: replace parent with its inner HTML
    const parent = sel.anchorNode.parentElement;
    if (parent) {
      parent.outerHTML = parent.innerHTML;
    }
    emitContent();
    return;
  }

  // Wrap
  const wrapper = document.createElement(tag);
  try {
    range.surroundContents(wrapper);
  } catch (e) {
    // If selection is across multiple elements, fallback: just use execCommand
    document.execCommand(tag === 'strong' ? 'bold' : 'italic', false, null);
  }

  // Move caret after wrapper (optional)
  sel.removeAllRanges();
  const after = document.createRange();
  after.setStartAfter(wrapper);
  after.collapse(true);
  sel.addRange(after);
}

</script>
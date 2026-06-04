<template>
  <div v-if="element === store.currentElement" class="all-element-options flex">
    <div type="button" class="bold" title="Bold" @mousedown.prevent="wrapSelection('b')" aria-label="Bold">B</div>
    <div type="button" class="italic" title="Italic" @mousedown.prevent="wrapSelection('em')" aria-label="Italic">i
    </div>
    <div class="link-option" @click="toggleLink">

      <img width="20" src="/np-content/admin/img/link.svg" />

      <div v-if="displayLinkInput" class="link-input-container">
        <p class="link-placeholder">{{linkPlaceHolder}}</p>
        <p class="link-input" type="text">{{ currentLink }}<span class="blinking-cursor">|</span></p>
        
        <ul style="display:none">
          <li data-href="/portfolio">Portfolio</li>
          <li data-href="/portfolio/fuseolution-logo">Fusolution Logo</li>
        </ul>

      </div>
    </div>
    <input type="color" @change.prevent="changeColor" title="Text color" aria-label="Text color" />
    <SelectAlign :element="element" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAppStore } from '../../store/store'
import SelectAlign from './SelectAlign.vue'
const linkPlaceHolderText = "Search or enter URL";
const linkPlaceHolder = ref(linkPlaceHolderText);
const store = useAppStore()
defineProps(['element'])
const currentLink = ref('');
const displayLinkInput = ref(false);

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

const setLink = () => {
 const selection = window.getSelection();
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);

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
      node.setAttribute('data-href', currentLink.value); // <-- Fix here
      return;
    }
    node = node.parentNode;
  }

  // If not already in a link, create a new span
  const span = document.createElement('span');
  span.className = 'link';
  span.setAttribute('data-href', currentLink.value);

  span.appendChild(range.extractContents());
  range.insertNode(span);

  // Optionally, reselect the span
  selection.removeAllRanges();
  const newRange = document.createRange();
  newRange.selectNodeContents(span);
  selection.addRange(newRange);

}


/**
 * Emits a change event for syncing content.
 * Call this after making a change to the DOM.
 */
function emitContent() {
  // You may want to emit an event here if the parent needs to sync.
  // For example: emit('update:content', element.content)
}

/**
 * Wraps the current text selection in a given tag.
 * If already wrapped, unwraps.
 */
function wrapSelection(tag) {
  const sel = window.getSelection()
  if (!sel || sel.rangeCount === 0) return

  const range = sel.getRangeAt(0)
  if (range.collapsed) return // Nothing selected

  // Detect if selection is already wrapped in the tag
  const anchorEl = sel.anchorNode.parentElement
  if (anchorEl && anchorEl.tagName.toLowerCase() === tag) {
    // Unwrap: replace parent with its child nodes
    const parent = anchorEl
    const fragment = document.createDocumentFragment()
    while (parent.firstChild) {
      fragment.appendChild(parent.firstChild)
    }
    parent.replaceWith(fragment)
    emitContent()
    return
  }

  // Wrap selection
  const wrapper = document.createElement(tag)
  try {
    range.surroundContents(wrapper)
  } catch (e) {
    // Fallback for complex selections: use execCommand (deprecated but still works)
    document.execCommand(tag === 'b' || tag === 'strong' ? 'bold' : 'italic')
  }

  // Move caret after wrapper (optional)
  sel.removeAllRanges()
  const after = document.createRange()
  after.setStartAfter(wrapper)
  after.collapse(true)
  sel.addRange(after)
  emitContent()
}

/**
 * Changes the color of the current selection.
 * If already colored, updates color.
 */
function changeColor(event) {
  const sel = window.getSelection();
  const color = event.target.value;
  if (!sel || sel.rangeCount === 0) return;

  const range = sel.getRangeAt(0);
  if (range.collapsed) return;

  // Always wrap the full selection in a new span
  const wrapper = document.createElement('span');
  if (color) wrapper.style.color = color;

  // Surround contents (will unwrap any nested spans inside selection)
  try {
    range.surroundContents(wrapper);
  } catch (e) {
    // If selection is across multiple nodes, fallback: use execCommand
    document.execCommand('foreColor', false, color || '#000');
  }

  // Move caret after new span (optional)
  sel.removeAllRanges();
  const after = document.createRange();
  after.setStartAfter(wrapper);
  after.collapse(true);
  sel.addRange(after);

}
</script>

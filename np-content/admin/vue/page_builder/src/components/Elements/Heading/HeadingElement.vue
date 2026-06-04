<template>
  <h1
    ref="editable"
    contenteditable="true"
    @input="onInput"
    @blur="onInput"
  ></h1>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({ modelValue: String })
const emit = defineEmits(['update:modelValue'])
const editable = ref(null)

// Only update DOM if prop changes (not during typing)
watch(() => props.modelValue, (newVal) => {
  if (editable.value && editable.value.innerHTML !== newVal) {
    editable.value.innerHTML = newVal || ''
  }
})

// Set initial value on mount
onMounted(() => {
  if (editable.value) editable.value.innerHTML = props.modelValue || ''
})

// Emit changes to parent
function onInput() {
  emit('update:modelValue', editable.value.innerHTML)
}
</script>
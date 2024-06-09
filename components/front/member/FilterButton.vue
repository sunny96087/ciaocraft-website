<script setup lang="ts">
const props = defineProps<{
  button: {
    filterName: String
    buttonName: String
    count: Number
  }
}>()

const button = props.button
const emit = defineEmits(['setFilter'])

// const setCurrentView = (filter: string) => {
//   emit('setCurrentView', filter)
// }

const setFilter = (name: string) => {
  emit('setFilter', name)
}
</script>

<template>
  <button
    class="rounded border-[1px] border-solid border-primary px-5 py-2"
    @click="setFilter(button.filterName!)"
  >
    {{ button.buttonName }}({{ button.count }})
  </button>
</template>

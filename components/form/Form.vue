<script setup lang="ts">
const emit = defineEmits(['send'])
const props = defineProps()

const submitHandler = (e: Event) => {
  const target = e.target as HTMLFormElement

  const form = new FormData(target)
  emit('send', form)
}
</script>
<template>
  <form @submit.prevent="submitHandler" v-bind="{ ...props }">
    <slot></slot>
  </form>
</template>
<style lang="scss" scoped></style>

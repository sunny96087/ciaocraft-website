<script setup lang="ts">
const props = defineProps({
  breadcrumb: {
    type: Array,
    required: true
  }
})
const breadcrumbs: any = props.breadcrumb

console.log('breadcrumb')
</script>

<template>
  <div class="mb-5 w-full space-x-2">
    <NuxtLink
      v-for="(item, index) in breadcrumbs"
      :to="item.link"
      :class="{
        'cursor-default  text-dark1': item.isCurrentPage,
        'text-gray': !item.isCurrentPage
      }"
      :disabled="item.isCurrentPage"
    >
      {{ item.pageName }}
      <Icon class="mx-2 text-gray" name="ph:caret-right" v-if="index < breadcrumb.length - 1" />
    </NuxtLink>
  </div>
</template>

<style scoped></style>

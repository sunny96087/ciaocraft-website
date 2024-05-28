<script setup lang="ts">
const router = useRouter()
const route = useRoute()

const teacherId = route.params.teacherId
</script>
<template>
  <div class="">teacher {{ teacherId }}</div>
</template>
<style scoped></style>

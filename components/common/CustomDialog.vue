<script setup lang="ts">
import {
  dialogTitle,
  dialogMessage,
  showDialog,
  confirmDialog,
  cancelDialog,
  userInput
} from '~/stores/eventBus'
</script>

<template>
  <div v-if="showDialog" class="custom-dialog-overlay">
    <div class="custom-dialog">
      <div class="custom-dialog-header">
        <h4>{{ dialogTitle }}</h4>
      </div>
      <div class="custom-dialog-body">
        <p>{{ dialogMessage }}</p>

        <!-- input -->
        <input v-if="userInput !== null" v-model="userInput" class="input" type="text" />
      </div>
      <div class="custom-dialog-footer">
        <button @click="cancelDialog" class="btn cancel">取消</button>

        <button
          v-if="userInput !== null"
          @click="confirmDialog"
          class="btn check"
          :disabled="!userInput"
        >
          確認
        </button>
        <button v-else @click="confirmDialog" class="btn check">確認</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-dialog-overlay {
  position: fixed;

  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1021;
}

.custom-dialog {
  background-color: #fff;
  /* backdrop-filter: blur(4px); */
  max-width: 300px;
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2);
}

.custom-dialog-header {
  font-size: 20px;
}

.custom-dialog-body {
  margin-top: 12px;
}

.input {
  @apply mt-2 w-full rounded-lg border border-gray p-2;
}

.custom-dialog-footer {
  margin-top: 20px;
  /* text-align: right; */
  @apply flex gap-3;
}

/* .custom-dialog-footer button {
  margin-left: 12px;
} */

.btn {
  @apply w-full rounded-lg py-[5px];
}

.cancel {
  @apply border border-gray text-gray;
}

.check {
  @apply bg-primary text-white;
}
</style>

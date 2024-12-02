<template>
  <dialog ref="loading" @close="model = false">
    <h4 class="mb-4">결과를 분석하고 있어요... 📈</h4>
    <div class="spinner"></div>
  </dialog>
</template>

<script setup>
import { ref, watch, onMounted, defineModel } from 'vue'

const model = defineModel({ required: true })

const loading = ref(null)

onMounted(control)

watch(model, control)

function control() {
  if (model.value) loading.value.showModal()
  else loading.value.close()
}
</script>

<style scoped>
dialog {
  outline: none;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: transparent;
}

.spinner {
  --square-size: 48px;

  width: var(--square-size);
  height: var(--square-size);

  border: 5px solid #f3f3f3;
  border-top: 5px solid #5e72e3;
  border-radius: 50%;

  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
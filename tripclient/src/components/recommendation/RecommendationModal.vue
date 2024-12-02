<template>
  <div class="modal-backdrop d-flex justify-content-center align-items-center">
    <div class="modal-content p-4 rounded shadow-lg">
      <h3 class="mb-4 text-center">목적지를 선택하세요</h3>
      <ul class="list-group mb-4">
        <li v-if="destinationList.length === 0" class="list-group-item text-center text-muted">
          선택 가능한 목적지가 없습니다.
        </li>
        <li v-for="(response, index) in destinationList" :key="index"
          class="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <h5 class="mb-1">{{ response.name }}</h5>
            <p class="mb-1 text-muted">{{ response.address }}</p>
          </div>
          <button class="btn btn-outline-primary" @click="selectDestination(response)">
            선택
          </button>
        </li>
        <div v-if="selected" class="d-flex align-items-center mt-3">
          <h5 class="me-3">목적지 : </h5>
          <button class="btn btn-primary">{{ selected.name }}</button>
        </div>
      </ul>
      <div class="d-flex justify-content-center">
        <button class="btn btn-primary w-100 me-3" @click="toPath">여행 계획 보기</button>
        <button class="btn btn-secondary w-100" @click="$emit('close')">닫기</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStorageStore } from '@/stores/storage';
import { useRecommendationStore } from '@/stores/recommendation';
import router from '@/router';

const props = defineProps({
  gptResponse: {
    type: Object,
    required: true,
  },
});

const destinationList = Object.values(props.gptResponse || {});
const { setStart, addMid, setEnd, removeStart, clearMid, removeEnd } = useStorageStore();
const { recommendation } = useRecommendationStore();
const selected = ref(null);

const selectDestination = (destination) => {
  removeEnd(0);
  selected.value = destination;
  setEnd(destination);
};

const toPath = () => {
  removeStart(0);
  clearMid();
  setStart(recommendation[0]);
  recommendation
    .filter((item) => item.attractionId !== recommendation[0].attractionId)
    .forEach((item) => addMid(item));
  router.push("/attraction/result");
}

</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1050;
}

.modal-content {
  max-width: 500px;
  background-color: #fff;
}

.list-group-item {
  padding: 15px;
}
</style>

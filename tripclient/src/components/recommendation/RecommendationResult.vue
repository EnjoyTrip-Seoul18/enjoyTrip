<template>
  <div class="container">
    <div class="section d-flex">
      <h4 class="section-title me-5">방문한 곳!</h4>
      <div class="d-flex flex-wrap">
        <button v-for="(item, index) in recommendation" :key="index" class="btn btn-primary me-2 mb-2"
          @click="removeRecommendation(index)">
          {{ item.name }}
          <RemoveItem />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRecommendationStore } from "@/stores/recommendation";
import RemoveItem from "@/assets/icons/RemoveItem.vue";
const { recommendation, removeRecommendation } = useRecommendationStore();
</script>

<style scoped>
.section {
  border-bottom: 2px solid #ddd;
  padding-bottom: 15px;
  margin-bottom: 20px;
}

.section-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

button {
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

button:hover {
  opacity: 0.9;
}
</style>

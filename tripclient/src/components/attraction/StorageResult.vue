<template>
  <div class="container">
    <div class="section d-flex">
      <h4 class="section-title me-5">출발지</h4>
      <div class="d-flex flex-wrap">
        <button
          v-for="(startItem, index) in start"
          :key="index"
          class="btn btn-primary me-2 mb-2"
          @click="removeStart(index)"
        >
          {{ startItem.name }}
          <RemoveItem />
        </button>
      </div>
    </div>

    <div class="section d-flex">
      <h4 class="section-title me-5">경유지</h4>
      <div class="d-flex flex-wrap">
        <button
          v-for="(midItem, index) in mid"
          :key="index"
          class="btn btn-warning me-2 mb-2"
          @click="removeMid(index)"
        >
          {{ midItem.name }}
          <RemoveItem />
        </button>
      </div>
    </div>

    <div class="section d-flex">
      <h4 class="section-title me-5">목적지</h4>
      <div class="d-flex flex-wrap">
        <button
          v-for="(endItem, index) in end"
          :key="index"
          class="btn btn-success me-2 mb-2"
          @click="removeEnd(index)"
        >
          {{ endItem.name }}
          <RemoveItem />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStorageStore } from "@/stores/storage";
import RemoveItem from "@/assets/icons/RemoveItem.vue";
const storage = useStorageStore();
const { start, mid, end, removeStart, removeMid, removeEnd } = storage;
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

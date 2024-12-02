<template>
  <div class="d-flex justify-content-between align-items-center p-3 bg-light border">
    <!-- Select Box -->
    <div class="me-3">
      <select class="form-select" v-model="selectedOption" @change="onOptionChange">
        <option value="select">선택</option>
        <option v-for="(option, idx) in options" :key="idx" :value="option.value">
          {{ option.name }}
        </option>
      </select>
    </div>

    <!-- Search Input -->
    <div class="flex-grow-1">
      <input type="text" class="form-control" placeholder="Search..." v-model="searchQuery" @input="onSearchChange" />
    </div>

    <!-- Search Button -->
    <div class="ms-3">
      <button class="btn btn-primary" @click="onSearchSubmit">Search</button>
    </div>
  </div>
</template>


<script setup>
import { ref, defineEmits } from "vue";

// Define options for the select box
const options = ref([
  { name: "제목", value: "subject" },
  { name: "작성자", value: "user_id" },
]);

// Define emits
const emit = defineEmits(["option-change", "search-change", "search-submit"]);

// Reactive variables
const selectedOption = ref("select"); // Default to "선택"
const searchQuery = ref("");

// Emit events for changes
const onOptionChange = () => {
  emit("option-change", selectedOption.value);
};

const onSearchChange = () => {
  emit("search-change", searchQuery.value);
};

const onSearchSubmit = () => {
  emit("search-submit", {
    option: selectedOption.value,
    query: searchQuery.value,
  });
};
</script>

<style>
.menu-bar {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 0.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>

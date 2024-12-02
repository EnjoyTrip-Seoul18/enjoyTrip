<template>
  <nav>
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <button class="page-link" @click="changePage(currentPage - 1)" :disabled="currentPage === 1">
          Previous
        </button>
      </li>
      <li v-for="page in totalPageCount" :key="page" class="page-item" :class="{ active: page === currentPage }">
        <button class="page-link" @click="changePage(page)">
          {{ page }}
        </button>
      </li>
      <li class="page-item" :class="{ disabled: currentPage === totalPageCount }">
        <button class="page-link" @click="changePage(currentPage + 1)" :disabled="currentPage === totalPageCount">
          Next
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup>
const props = defineProps({
  totalPageCount: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["page-change"]);

const changePage = (page) => {
  if (page > 0 && page <= props.totalPageCount) {
    emit("page-change", page);
  }
};
</script>

<style>
.pagination .active .page-link {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

.pagination .disabled .page-link {
  color: #6c757d;
  pointer-events: none;
  background-color: #fff;
  border-color: #dee2e6;
}
</style>

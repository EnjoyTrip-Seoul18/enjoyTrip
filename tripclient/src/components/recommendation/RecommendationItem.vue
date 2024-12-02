<template>
  <tr>
    <td>{{ index + 1 }}</td>
    <td>
      <img
        :src="props.item.image ? props.item.image : '/50.png'"
        alt=""
        style="width: 50px; height: 50px"
      />
    </td>
    <td>{{ props.item.name }}</td>
    <td>
      <button
        class="btn btn-primary me-2 mb-2"
        @click="addRecommendation(props.item)"
      >
        선택하기
      </button>
    </td>
  </tr>
</template>

<script setup>
import { useRecommendationStore } from "@/stores/recommendation";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

const { addRecommendation } = useRecommendationStore();
</script>

<style scoped></style>

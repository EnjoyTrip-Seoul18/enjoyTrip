import { ref } from "vue";
import { defineStore } from "pinia";

export const useRecommendationStore = defineStore(
  "recommendation",
  () => {
    const recommendation = ref([]);
    function addRecommendation(item) {
      if (!recommendation.value.includes(item)) {
        recommendation.value.push(item);
      }
    }
    function removeRecommendation(index) {
      recommendation.value.splice(index, 1);
    }
    function clearRecommendations() {
      recommendation.value = [];
    }
    return {
      recommendation,
      addRecommendation,
      removeRecommendation,
      clearRecommendations,
    };
  },
  { persist: true }
);

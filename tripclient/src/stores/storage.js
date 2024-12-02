import { ref } from "vue";
import { defineStore } from "pinia";

export const useStorageStore = defineStore(
  "storage",
  () => {
    const start = ref([]);
    const mid = ref([]);
    const end = ref([]);

    const setStart = (item) => {
      if (start.value.length == 0) {
        start.value.push(item);
      } else {
        alert("출발지는 하나만 지정 가능합니다.");
      }
      syncLocalStorage();
    };

    const addMid = (item) => {
      const isDuplicate = mid.value.some(
        (midItem) => midItem.name === item.name
      );
      if (!isDuplicate && mid.value.length < 10) {
        mid.value.push(item);
      } else if (isDuplicate) {
        alert("이미 추가된 경유지입니다.");
      }
      syncLocalStorage();
    };

    const setEnd = (item) => {
      if (end.value.length == 0) {
        end.value.push(item);
      } else {
        alert("목적지는 하나만 지정 가능합니다.");
      }
      syncLocalStorage();
    };

    const removeStart = (index) => {
      start.value.splice(index, 1);
      syncLocalStorage();
    };

    const removeMid = (index) => {
      mid.value.splice(index, 1);
      syncLocalStorage();
    };

    const removeEnd = (index) => {
      end.value.splice(index, 1);
      syncLocalStorage();
    };

    const syncLocalStorage = () => {
      localStorage.setItem("start", JSON.stringify(start.value));
      localStorage.setItem("mid", JSON.stringify(mid.value));
      localStorage.setItem("end", JSON.stringify(end.value));
    };

    const loadFromLocalStorage = () => {
      start.value = JSON.parse(localStorage.getItem("start")) || [];
      mid.value = JSON.parse(localStorage.getItem("mid")) || [];
      end.value = JSON.parse(localStorage.getItem("end")) || [];
    };

    const clearMid = () => {
      mid.value = [];
    }

    return {
      start,
      mid,
      end,
      setStart,
      addMid,
      setEnd,
      removeStart,
      removeMid,
      removeEnd,
      clearMid,
      loadFromLocalStorage,
    };
  },
  { persist: true }
);

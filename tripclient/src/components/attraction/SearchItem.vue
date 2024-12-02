<template>
  <tr>
    <td>{{ index + 1 }}</td>
    <td>
      <img
        :src="props.item.image ? props.item.image : '/50.png'"
        onerror="this.src='https://via.placeholder.com/50'"
        alt=""
        style="width: 50px; height: 50px"
      />
    </td>
    <td>{{ props.item.name }}</td>
    <td>
      <button class="btn btn-primary me-2 mb-2" @click="setStart(props.item)">
        출발지
      </button>

      <button class="btn btn-warning me-2 mb-2" @click="addMid(props.item)">
        경유지
      </button>

      <button class="btn btn-success me-2 mb-2" @click="setEnd(props.item)">
        목적지
      </button>
    </td>
  </tr>
</template>

<script setup>
import { useStorageStore } from "@/stores/storage";

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

const { setStart, addMid, setEnd } = useStorageStore();
</script>

<style scoped></style>

<template>
  <form @submit.prevent="emitSearch">
    <div class="formClass mb-3">
      <select
        v-model="localsido"
        class="form-select select-box"
        @change="setGugun"
      >
        <option value="0" selected>검색 할 지역 선택</option>
        <option
          v-for="sido in sidos"
          :key="sido.sidoCode"
          :value="sido.sidoCode"
        >
          {{ sido.sidoName }}
        </option>
      </select>
    </div>
    <div class="formClass mb-3">
      <select v-model="localgugun" class="form-select select-box">
        <option value="0" selected>구/군</option>
        <option
          v-for="gu in localguguns"
          :key="gu.gugunCode"
          :value="gu.gugunCode"
        >
          {{ gu.gugunName }}
        </option>
      </select>
    </div>
    <div class="formClass mb-3">
      <select v-model="localcontentType" class="form-select select-box">
        <option value="0" selected>관광지 유형</option>
        <option
          v-for="type in contentTypes"
          :key="type.contentTypeId"
          :value="type.contentTypeId"
        >
          {{ type.contentTypeName }}
        </option>
      </select>
    </div>
    <div class="mt-3 d-flex justify-content-center align-items-center">
      <input
        type="search"
        class="form-control search-input"
        v-model="localkeyword"
        placeholder="검색어를 입력하세요"
      />
      <button class="btn w-25 search-button" type="button" @click="emitSearch">
        <SearchIcon />
      </button>
    </div>
  </form>
</template>

<script setup>
import { getGuguns } from "@/api/attraction";
import SearchIcon from "@/assets/icons/SearchIcon.vue";
import { ref, watch } from "vue";

// Props로 데이터 전달
const props = defineProps({
  sido: String,
  gugun: String,
  contentType: String,
  keyword: String,
  sidos: Array,
  guguns: Array,
  contentTypes: Array,
});

// Emit 이벤트 정의
const emit = defineEmits(["search"]);

// Local Data
const localsido = ref("0");
const localgugun = ref("0");
const localcontentType = ref("0");
const localkeyword = ref("");
const localguguns = ref([]);

// Props와 Local Data 동기화
watch(
  () => [props.sido, props.gugun, props.contentType, props.keyword],
  ([sido, gu, type, keyword]) => {
    localsido.value = sido;
    localgugun.value = gu;
    localcontentType.value = type;
    localkeyword.value = keyword;
  },
  { immediate: true }
);

// 검색 이벤트 발생
const emitSearch = () => {
  emit("search", {
    sido: localsido.value,
    gugun: localgugun.value,
    contentType: localcontentType.value,
    keyword: localkeyword.value,
  });
};

const setGugun = async () => {
  localgugun.value = "0";
  await getGuguns(
    localsido.value,
    (response) => {
      localguguns.value = response.data;
    },
    (error) => {
      console.error(error);
    }
  );
};
</script>

<style scoped>
.select-box {
  flex-grow: 1;
  border-radius: 20px;
  background-color: var(--bs-white);
  padding: 10px 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  outline: none;
}

.search-input {
  flex-grow: 1;
  border-radius: 20px 0 0 20px;
  background-color: var(--bs-white);
  padding: 10px 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  outline: none;
}

.search-button {
  border-radius: 0 20px 20px 0;
  background-color: var(--bs-secondary);
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
</style>

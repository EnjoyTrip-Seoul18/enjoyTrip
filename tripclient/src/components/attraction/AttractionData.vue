<template>
  <div class="container d-flex justify-content-center">
    <button class="btn btn-primary me-3" @click="handleSearch(0, 0, 0, '')">전체 데이터 받기</button>
    <button class="btn btn-secondary me-3">시도 데이터 받기</button>
    <button class="btn btn-success me-3">구군 데이터 받기</button>
    <button class="btn btn-danger">컨텐츠 데이터 받기</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getData } from '@/api/attraction'

const serviceKey = import.meta.env.VITE_OPEN_API_SERVICE_KEY;

const areaCode = ref(0);
const sigunguCode = ref(0);
const contentTypeId = ref(0);
const keyword = ref("");

let searchUrl = ``;

const setParam = (area, gungu, contentType, key) => {
  areaCode.value = area;
  sigunguCode.value = gungu;
  contentTypeId.value = contentType;
  keyword.value = key;
}

const makeUrl = () => {
  let queryString = `serviceKey=` + serviceKey + `&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=A`;
  if (areaCode.value > 0) queryString += `&areaCode=` + areaCode;
  if (sigunguCode.value > 0) queryString += `&sigunguCode=` + sigunguCode;
  if (contentTypeId.value > 0) queryString += `&contentTypeId=` + contentTypeId;

  let service = ``;
  if (keyword.value > 0) {
    service = `searchKeyword1`;
    queryString += `&keyword=` + keyword;
  } else {
    service = `areaBasedList1`;
  }

  searchUrl = service + "?" + queryString;
  console.log(searchUrl);
}

const handleSearch = async (area, gungu, contentType, key) => {
  setParam(area, gungu, contentType, key);
  makeUrl();
  await getData(searchUrl,
    (response) => {
      console.log(response);
    },
    (error) => {
      console.error(error);
    }
  )
}
</script>
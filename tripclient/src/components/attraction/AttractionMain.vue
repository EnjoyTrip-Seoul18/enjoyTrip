<template>
  <div class="container container-section">
    <div style="height: 70px"></div>
    <div class="row"></div>
    <div class="col-md-12">
      <h2 class="mb-3 header-title">여행 계획</h2>
      <p>출발지 경유지 도착지로 최단거리 구하기!</p>
      <SearchForm
        :sido="sido"
        :gugun="gugun"
        :contentType="contentType"
        :keyword="keyword"
        :sidos="sidos"
        :guguns="guguns"
        :contentTypes="contentTypes"
        @search="handleSearch"
      />

      <KakaoMap
        :lat="coordinate.lat"
        :lng="coordinate.lng"
        :draggable="true"
        style="width: 100%; height: 400px"
        class="mt-3"
        id="kakao-map"
      >
        <div v-for="(marker, index) in markers" :key="index">
          <KakaoMapMarker
            :lat="marker.lat"
            :lng="marker.lng"
            @onClickKakaoMapMarker="toggleOverlay(index)"
            :clickable="true"
          />
          <KakaoMapCustomOverlay
            :lat="marker.lat"
            :lng="marker.lng"
            :yAnchor="1.4"
            :visible="marker.visible"
            :content="
              generateOverlayContent(marker.name, marker.image, marker.address)
            "
          />
        </div>
      </KakaoMap>

      <div class="row mt-3">
        <table class="table table-striped" v-if="tripList.length">
          <thead>
            <tr>
              <th></th>
              <th>이미지</th>
              <th>관광지명</th>
              <th>계획</th>
            </tr>
          </thead>
          <tbody>
            <SearchItem
              v-for="(trip, index) in tripList"
              :key="index"
              :item="trip"
              :index="index"
            />
          </tbody>
        </table>
        <div v-else class="text-center">검색 결과가 없습니다.</div>
      </div>

      <div class="container mt-3">
        <h2>여행 경로</h2>
        <StorageResult />
      </div>

      <button class="btn btn-primary mt-5" @click="getAttractionResult">
        최적의 여행계획 짜기!
      </button>
    </div>
  </div>
</template>
<script setup>
import { onBeforeMount, reactive, ref } from "vue";
import {
  KakaoMap,
  KakaoMapMarker,
  KakaoMapCustomOverlay,
} from "vue3-kakao-maps";
import SearchItem from "./SearchItem.vue";
import SearchForm from "@/components/attraction/SearchForm.vue";
import StorageResult from "@/components/attraction/StorageResult.vue";
import { useStorageStore } from "@/stores/storage";
import router from "@/router";
import { getContentTypes, getList, getSidos } from "@/api/attraction";

const coordinate = reactive({
  lat: 33.450701,
  lng: 126.570667,
});

const sido = ref("0");
const gugun = ref("0");
const contentType = ref("0");
const keyword = ref("");

const sidos = ref([]);
const guguns = ref([]);
const contentTypes = ref([]);

const tripList = reactive([]);
const markers = reactive([]);

const generateOverlayContent = (name, image, address) => `
  <div
    style="
      padding: 10px;
      background-color: white;
      border: 1px solid #ccc;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    "
  >
  <div style="font-weight: bold; margin-bottom: 5px">${name}</div>
  <div style="display: flex">
    <div style="margin-right: 10px">
      <img src="${image ? image : "~/assets/logo.png"}" />
    </div>
      <div>${address}</div>
    </div>
  </div>
`;

const scrollToElement = () => {
  document.querySelector("#kakao-map").scrollIntoView(true);
};

const handleSearch = async ({ sido, gugun, contentType, keyword }) => {
  let dummyData = [];

  await getList(
    { sido, gugun, contentType, keyword },
    (response) => {
      dummyData = response.data;
    },
    (error) => {
      console.error(error);
    }
  );

  tripList.splice(0, tripList.length, ...dummyData);

  if (dummyData.length > 0) {
    coordinate.lat = dummyData[0].latitude;
    coordinate.lng = dummyData[0].longitude;
  }

  markers.splice(
    0,
    markers.length,
    ...dummyData.map((data, index) => ({
      lat: data.latitude,
      lng: data.longitude,
      name: data.name,
      image: data.image,
      address: data.address,
      visible: false,
    }))
  );

  scrollToElement();
};

const toggleOverlay = (index) => {
  markers.forEach((marker, i) => {
    marker.visible = i === index;
  });
};

const getAttractionResult = () => {
  const { start, mid, end } = useStorageStore();
  if (start.length == 0 || mid.length == 0 || end.length == 0) {
    alert("누락된 항목이 있는지 확인하세요!");
    return;
  }
  router.push("/attraction/result");
};

const setSido = async () => {
  await getSidos(
    (response) => {
      sidos.value = response.data;
    },
    (error) => {
      console.error(error);
    }
  );
};

const setContentType = async () => {
  await getContentTypes(
    (response) => {
      contentTypes.value = response.data;
    },
    (error) => {
      console.error(error);
    }
  );
};

onBeforeMount(() => {
  setSido();
  setContentType();
});
</script>

<style scoped>
.container-section {
  background-color: var(--bs-light);
  padding: 30px;
  border-radius: 15px;
  text-align: center;
}

.header-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--bs-primary);
  margin-bottom: 20px;
}
</style>

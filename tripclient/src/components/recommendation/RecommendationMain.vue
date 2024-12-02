<template>
  <div class="container container-section">
    <div style="height: 70px"></div>

    <!-- 검색 섹션 -->
    <div class="row">
      <div class="col-md-12">
        <h2 class="mb-3 header-title">어디가지?</h2>
        <p>우선... 지금까지 방문한 곳들을 볼까요?</p>
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
      </div>
    </div>

    <!-- 지도 섹션 -->
    <div>
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
    </div>

    <!-- 추천 여행지 리스트 -->
    <div class="row mt-3">
      <h2>추천 여행지 목록</h2>
      <table class="table table-striped" v-if="tripList.length">
        <thead>
          <tr>
            <th>#</th>
            <th>이미지</th>
            <th>관광지명</th>
            <th>계획</th>
          </tr>
        </thead>
        <tbody>
          <RecommendationItem
            v-for="(item, index) in tripList"
            :key="index"
            :item="item"
            :index="index"
          />
        </tbody>
      </table>
      <div v-else class="text-center">추천할 여행지가 없습니다.</div>
    </div>
    <RecommendationResult class="mt-3" />

    <!-- 최적화 버튼 -->
    <div class="text-center mt-5">
      <button class="btn btn-primary" @click="getRecommendationResult">
        어디갈지 추천받기!
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
import SearchForm from "@/components/attraction/SearchForm.vue";
import { useRecommendationStore } from "@/stores/recommendation";
import router from "@/router";
import RecommendationItem from "./RecommendationItem.vue";
import RecommendationResult from "./RecommendationResult.vue";
import { getContentTypes, getSidos, getList } from "@/api/attraction";

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
const { recommendation } = useRecommendationStore();

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
      <img src="${image ? image : require("@/assets/logo.png")}" />
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
      image: data.image ? data.image : "~/assets/logo.png",
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

const getRecommendationResult = () => {
  if (recommendation.length === 0) {
    alert("여행지를 하나 이상 선택하세요!");
    return;
  }

  // console.log("Recommendation:", recommendation);
  router.push("/recommendation/review");
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

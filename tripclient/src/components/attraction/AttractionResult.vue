<template>
  <div class="container container-section">
    <div style="height: 70px"></div>
    <div class="row"></div>
    <div class="col-md-12">
      <h2 class="mb-3 header-title">최적의 여행계획 짜기!</h2>
      <KakaoMap
        :lat="latLngList[latLngList.length - 1].lat"
        :lng="latLngList[latLngList.length - 1].lng"
        :draggable="true"
        style="width: 100%; height: 400px"
        class="mt-3"
      >
        <KakaoMapMarkerPolyline
          :markerList="latLngList"
          strokeColor="#C74C5E"
          :strokeOpacity="1"
        />
      </KakaoMap>
    </div>
    <div v-for="(pair, index) in pairIndex" :key="index" class="route-card">
      <div class="place">
        <img
          :src="
            attractions[pair.before].image
              ? attractions[pair.before].image
              : '/50.png'
          "
          alt="Place Image"
          class="place-image"
        />
        <div class="place-details">
          <h3>{{ attractions[pair.before].name }}</h3>
          <p>{{ attractions[pair.before].address }}</p>
        </div>
      </div>
      <div class="route-info">
        <span class="arrow">➡️</span>
        <span class="distance">{{ distance[index].toFixed(2) }} km</span>
      </div>
      <div class="place">
        <img
          :src="
            attractions[pair.after].image
              ? attractions[pair.after].image
              : '/50.png'
          "
          alt="Place Image"
          class="place-image"
        />
        <div class="place-details">
          <h3>{{ attractions[pair.after].name }}</h3>
          <p>{{ attractions[pair.after].address }}</p>
        </div>
      </div>
    </div>
    <div class="d-flex mt-5 justify-content-center">
      <div v-if="isLoggedIn">
        <button class="btn btn-primary me-3" @click="attractionReview()">
          여행 계획 평가하기
        </button>
        <button class="btn btn-secondary" @click="router.back()">
          계획 다시 짜기
        </button>
      </div>
      <div v-else>
        여행 계획을 평가해볼까요?
        <button
          class="btn btn-primary ms-3"
          @click="router.push('/member/login')"
        >
          로그인 후 진행
        </button>
      </div>
      <div></div>
    </div>
  </div>
</template>
<script setup>
import { getPath } from "@/api/attraction";
import { onBeforeMount, ref, computed } from "vue";
import { KakaoMap, KakaoMapMarkerPolyline } from "vue3-kakao-maps";
import { useStorageStore } from "@/stores/storage";
import { useMemberStore } from "@/stores/member";
import router from "@/router";

const memberStore = useMemberStore();

const isLoggedIn = computed(() => memberStore.isLoggedIn);

const { start, mid, end } = useStorageStore();
const attractions = ref([...start, ...mid, ...end]);
const latLngList = ref([]);
const pairIndex = ref([]);
const distance = ref([]);

const changeType = () => {
  attractions.value.forEach((attraction, index) => {
    const latLng = {};
    latLng.index = index;
    latLng.name = attraction.name;
    latLng.lat = attraction.latitude;
    latLng.lng = attraction.longitude;
    latLngList.value.push(latLng);
  });
};

const handleResult = async () => {
  await getPath(
    latLngList.value,
    (response) => {
      latLngList.value = response.data.attractionList;
      distance.value = response.data.distanceList;
      let before = 0;
      for (let data of latLngList.value) {
        if (data.index == before) continue;
        pairIndex.value.push({
          before,
          after: data.index,
        });
        before = data.index;
      }
    },
    (error) => {
      console.error(error);
    }
  );
};

const attractionReview = () => {
  const data = [];
  pairIndex.value.forEach((pair, index) => {
    const item = {};
    item.before = attractions.value[pair.before];
    item.after = attractions.value[pair.after];
    item.distance = distance.value[index];
    data.push(item);
  });
  router.push({
    name: "review",
    state: { data: JSON.stringify(data) },
  });
};

onBeforeMount(() => {
  changeType();
  handleResult();
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

.route-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
}

.route-card {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.place {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.place-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  border: 1px solid #ddd;
}

.place-details {
  display: flex;
  flex-direction: column;
}

.place-details h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #333;
}

.place-details p {
  margin: 0;
  font-size: 0.9rem;
  color: #666;
}

.route-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  color: #555;
}

.arrow {
  font-size: 1.5rem;
}

.distance {
  font-weight: bold;
}
</style>

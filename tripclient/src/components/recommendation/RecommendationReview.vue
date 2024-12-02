<template>
  <div v-if="isLoading">
    <Loading v-model="isLoading" />
  </div>
  <div v-else class="fadeIn container mt-4">
    <KakaoMap :lat="gptResponse.nearest.latitude" :lng="gptResponse.nearest.longitude" :draggable="true"
      style="width: 100%; height: 400px" class="mt-3 mb-5" id="kakao-map">
      <div v-for="(item, index) in recommendation" :key="index">
        <KakaoMapMarker :lat="item.latitude" :lng="item.longitude" :clickable="true" />
      </div>
      <div v-for="(item, index) in gptResponse" :key="index">
        <KakaoMapMarker :lat="item.latitude" :lng="item.longitude" :image="{
            imageSrc:
              'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png',
            imageWidth: 64,
            imageHeight: 64,
            imageOption: {},
          }" />
      </div>
    </KakaoMap>
    <!-- gptResponse.nearest -->
    <div class="card mb-4">
      <div class="card-header bg-light text-primary text-center">
        <h4>가장 가까운 여행지 추천해주세요! 🚩</h4>
      </div>
      <div class="card-body">
        <div style="
            padding: 10px;
            background-color: white;
            border: 1px solid #ccc;
            border-radius: 5px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          ">
          <div style="font-weight: bold; margin-bottom: 5px">
            {{ gptResponse.nearest.name }}
          </div>
          <div>{{ gptResponse.nearest.address }}</div>
          <div>{{ gptResponse.nearest.description }}</div>
        </div>
      </div>
    </div>

    <!-- gptResponse.similar -->
    <div class="card mb-4">
      <div class="card-header bg-light text-success text-center">
        <h4>지금과 비슷한 여행지를 가고 싶어요! 🧭</h4>
      </div>
      <div class="card-body">
        <div style="
            padding: 10px;
            background-color: white;
            border: 1px solid #ccc;
            border-radius: 5px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          ">
          <div style="font-weight: bold; margin-bottom: 5px">
            {{ gptResponse.similar.name }}
          </div>
          <div>{{ gptResponse.similar.address }}</div>
          <div>{{ gptResponse.similar.description }}</div>
        </div>
      </div>
    </div>

    <!-- gptResponse.different -->
    <div class="card mb-4">
      <div class="card-header bg-light text-danger text-center">
        <h4>색다른 여행지를 가고 싶어요! 🗺️</h4>
      </div>
      <div class="card-body">
        <div style="
            padding: 10px;
            background-color: white;
            border: 1px solid #ccc;
            border-radius: 5px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          ">
          <div style="font-weight: bold; margin-bottom: 5px">
            {{ gptResponse.different.name }}
          </div>
          <div>{{ gptResponse.different.address }}</div>
          <div>{{ gptResponse.different.description }}</div>
        </div>
      </div>
    </div>
    <!-- Navigation Button -->
    <div class="d-flex justify-content-center mt-5 mb-5">
      <button class="btn btn-primary me-3" @click="openModal">
        새로운 추천지로 여행 계획 세우기
      </button>
      <button class="btn btn-secondary" @click="router.push('/')">
        홈으로 돌아가기
      </button>
      <RecommendationModal v-if="isModalOpen" :gptResponse="gptResponse" @close="closeModal" />
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { getReview } from "@/api/recommendation";
import { useMemberStore } from "@/stores/member";
import { useRecommendationStore } from "@/stores/recommendation";
import router from "@/router";
import Loading from "@/components/common/Loading.vue";
import { KakaoMap, KakaoMapMarker } from "vue3-kakao-maps";
import RecommendationModal from "./RecommendationModal.vue";

const memberStore = useMemberStore();
const { recommendation } = useRecommendationStore();

const data = ref([]);
// const isLoading = ref(false);
const isLoading = ref(true);

const gptResponse = ref({
  nearest: {
    name: "남산타워",
    address: "서울 용산구 남산동 1-3",
    description: "서울을 한 눈에 내려다볼 수 있는 전망대",
    latitude: 37.551169,
    longitude: 126.988227,
  },
  similar: {
    name: "북한산국립공원",
    address: "서울 강북구 미아동 산 15-1",
    description: "서울 시내와는 다른 자연 풍경을 즐길 수 있는 국립공원",
    latitude: 37.659495,
    longitude: 126.954738,
  },
  different: {
    name: "연남동",
    address: "서울 마포구 연남동",
    description: "젊고 감각적인 예술과 음식이 어우러진 예술촌",
    latitude: 37.562291,
    longitude: 126.922862,
  },
});

const edit = (jsonWithTags) => {
  console.log(jsonWithTags);
  return JSON.parse(
    jsonWithTags
      .replace(/```json/, "")
      .replace(/```/, "")
      .trim()
  );
};

const createResponse = async () => {
  const { accessToken } = memberStore;
  await getReview(
    {
      accessToken,
      data: data.value,
    },
    (response) => {
      gptResponse.value = edit(response.data.choices[0].message.content.trim());
      isLoading.value = false;
    },
    (error) => {
      console.error(error);
      // alert("적절하지 못한 접근입니다.");
      // router.push("/member/login");
    }
  );
};

const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

onBeforeMount(() => {
  const accessToken = memberStore.accessToken;
  if (!accessToken) {
    alert("로그인이 필요합니다.");
    return router.push("/member/login");
  }
  data.value = recommendation;
  createResponse();
});
</script>

<style scoped>
.loading {
  z-index: 2;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 0 9999px;
}

.fadeIn {
  animation: fadeInAnimation 1s ease-in-out;
}

@keyframes fadeInAnimation {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.card-body {
  padding: 2rem;
}

.card-header {
  font-size: 1.25rem;
}
</style>

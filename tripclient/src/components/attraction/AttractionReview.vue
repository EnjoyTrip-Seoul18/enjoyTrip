<template>
  <div v-if="isLoading">
    <Loading v-model="isLoading" />
  </div>
  <div v-else class="fadeIn container mt-4">
    <!-- Total Summary Card -->
    <div class="card mb-4">
      <div class="card-header bg-light text-primary text-center">
        <h4>총평</h4>
      </div>
      <div class="card-body">
        <div v-html="gptResponse.total"></div>
      </div>
    </div>

    <!-- Good Points Card -->
    <div class="card mb-4">
      <div class="card-header bg-light text-success text-center">
        <h4>이런 점이 좋아요 👍</h4>
      </div>
      <div class="card-body">
        <div v-html="gptResponse.good"></div>
      </div>
    </div>

    <!-- Bad Points Card -->
    <div class="card mb-4">
      <div class="card-header bg-light text-danger text-center">
        <h4>이런 점이 아쉬워요... 😢</h4>
      </div>
      <div class="card-body">
        <div v-html="gptResponse.bad"></div>
      </div>
    </div>

    <!-- Feedback Card -->
    <div class="card mb-4">
      <div class="card-header bg-light text-info text-center">
        <h4>피드백</h4>
      </div>
      <div class="card-body">
        <div v-html="gptResponse.feedback"></div>
      </div>
    </div>

    <!-- Navigation Button -->
    <div class="d-flex justify-content-center mt-5 mb-5">
      <button class="btn btn-primary" @click="router.push('/')">
        홈으로 돌아가기
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { getReview } from "@/api/attraction";
import { useMemberStore } from "@/stores/member";
import router from "@/router";
import Loading from "../common/Loading.vue";

const memberStore = useMemberStore();

const data = ref([]);
// const isLoading = ref(false);
const isLoading = ref(true);
const gptResponse = ref({
  total:
    "전체적으로 효율적인 여행 계획이네요! 짧은 거리로 이동하면서 다양한 관광지를 방문하는 것이 장점입니다.",
  good: "1. 짧은 거리에 다양한 관광지를 포함하여 일정이 다채로워 보입니다.<br>2. 숙소와 식당이 관광지 근처에 위치하여 이동이 용이한 점이 좋습니다.<br>3. 지도상에서 보면 순서대로 이동이 가능하므로 시간을 효율적으로 활용할 수 있을 것 같아요.<br>",
  bad: "1. 일부 관광지 사이의 거리가 조금 떨어져 있어 이동이 불편할 수 있습니다.<br>2. 모든 관광지가 비슷한 테마여서 다양성이 부족할 수 있습니다.<br>",
  feedback:
    "일부 거리가 떨어진 관광지는 순서를 조정하여 근거리에 있는 관광지와 교체해보면 더욱 효율적일 것 같습니다. <b>10점 만점에 9점</b>을 주고 싶네요.",
});

const edit = (jsonWithTags) => {
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

onBeforeMount(() => {
  const accessToken = memberStore.accessToken;
  if (!accessToken) {
    alert("로그인이 필요합니다.");
    return router.push("/member/login");
  }
  data.value = JSON.parse(window.history.state.data);
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

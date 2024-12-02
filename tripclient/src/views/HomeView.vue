<script setup lang="ts">
import CommunityUsers from "@/assets/icons/CommunityUsers.vue";
import LocationDot from "@/assets/icons/LocationDot.vue";
import NodeGraph from "@/assets/icons/NodeGraph.vue";
</script>

<template>
  <div>
    <header class="header"></header>
    <section class="theater-mode d-flex justify-content-center align-items-start">
      <div class="text-center position-relative">
        <img :src="'/thumbnail.png'" alt="" id="thumbnail" />
        <router-link to="/recommendation">
          <button class="btn btn-primary btn-lg btn-thumbnail position-absolute">
            추천 시스템 체험하기
          </button>
        </router-link>
      </div>
    </section>
  </div>
  <!-- 카드 섹션 -->
  <section class="cards-section">
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <div class="card">
            <div class="card-body text-center">
              <h5 class="card-title">어디가지</h5>
              <LocationDot style="height:2rem" class="mt-3 mb-3" />
              <p class="card-text">
                방문한 지역들을 바탕으로 새로운 지역을 추천 받아보세요! 가장
                가까운 곳, 비슷한 테마, 색다른 테마 3가지를 추천 받을 수
                있습니다!
              </p>
              <router-link to="/recommendation" class="btn btn-primary">
                바로 가기
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-body text-center">
              <h5 class="card-title">여행계획</h5>
              <NodeGraph style="height:2rem" class="mt-3 mb-3" />
              <p class="card-text">
                지역들의 최단 경로를 조사해보고, 계획을 평가 받아보세요. 계획과
                평가를 한번에 받는 서비스!
              </p>
              <router-link to="/attraction" class="btn btn-primary">
                바로 가기
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-body text-center">
              <h5 class="card-title">커뮤니티</h5>
              <CommunityUsers style="height:2rem" class="mt-3 mb-3" />
              <p class="card-text">
                다른 사람들의 생각은 어떨까요? 다른 사람과 생각도 공유해봐요!
              </p>
              <router-link to="/board/list?pgno=1" class="btn btn-primary">
                바로 가기
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.header {
  background-color: var(--bs-light);
  padding: 10px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}

.theater-mode {
  text-align: center;
  background-color: var(--bs-light);
}

#thumbnail {
  width: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.text-center {
  position: relative;
}

.btn-thumbnail {
  background-color: #5e72e3;
  border: none;
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.cards-section {
  padding: 50px 0;
}

.card {
  border: none;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  min-height: 300px;
}

.card-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
}

.card-text {
  font-size: 14px;
  color: #6c757d;
  margin-bottom: 20px;
  min-height: 80px;
}

.card .btn {
  background-color: #5e72e3;
  border: none;
  color: white;
  font-size: 14px;
  padding: 10px 20px;
  border-radius: 5px;
}

@media (max-width: 400px) {
  .btn-thumbnail {
    display: none;
  }
}
</style>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary sticky-top">
    <div class="container-fluid">
      <router-link :to="{ name: 'home' }" class="navbar-brand">
        <img src="@/assets/logo.png" class="rounded mx-auto d-block logo" alt="로고" />
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll"
        aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarScroll">
        <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
          <li class="nav-item">
            <router-link :to="'/recommendation/'" class="nav-link">
              <b style="color: #5e72e3">어디가지</b>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="'/attraction/'" class="nav-link">
              <b>여행계획</b>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="'/board/'" class="nav-link">
              커뮤니티
            </router-link>
          </li>
          <li v-if="isLoggedIn" class="nav-item">
            <router-link :to="'/member/mypage/'" class="nav-link">
              마이페이지
            </router-link>
          </li>
        </ul>
        <ul class="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll">
          <li v-if="!isLoggedIn" class="nav-item">
            <router-link to="/member/login" class="nav-link">
              로그인
            </router-link>
          </li>
          <li v-if="!isLoggedIn" class="nav-item">
            <router-link to="/member/join" class="nav-link">
              회원가입
            </router-link>
          </li>
          <li v-if="isLoggedIn" class="nav-item">
            <router-link to="/" @click.prevent="logout" class="nav-link">
              로그아웃
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useMemberStore } from "@/stores/member";
import { computed } from "vue";

const memberStore = useMemberStore();

const isLoggedIn = computed(() => memberStore.isLoggedIn);

const logout = () => {
  memberStore.logout();
  console.log("User logged out!");
};
</script>

<style scoped>
.navbar {
  background-color: #f8f9fa;
}

.nav-link:hover {
  color: #007bff;
}

.logo {
  width: 150px;
  height: auto;
}

@media (max-width: 768px) {
  .logo {
    width: 100px;
  }
}

@media (max-width: 480px) {
  .logo {
    width: 75px;
  }
}
</style>

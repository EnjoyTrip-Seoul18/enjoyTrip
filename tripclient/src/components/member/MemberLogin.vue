<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-8 col-md-10 col-sm-12">
        <h2 class="my-3 py-3 text-center">
          로그인
        </h2>
      </div>
      <div class="col-lg-8 col-md-10 col-sm-12">
        <form @submit.prevent="handleLogin">
          <div class="form-check mb-3 float-end">
            <input class="form-check-input" type="checkbox" value="ok" id="saveid" v-model="saveId" />
            <label class="form-check-label" for="saveid"> 아이디저장 </label>
          </div>
          <div class="mb-3">
            <label for="memberId" class="form-label">아이디 :</label>
            <input type="text" class="form-control" id="memberId" v-model="form.memberId" placeholder="아이디..." />
          </div>
          <div class="mb-3">
            <label for="memberPwd" class="form-label">비밀번호 :</label>
            <input type="password" class="form-control" id="memberPwd" v-model="form.memberPwd" placeholder="비밀번호..." />
          </div>
          <div class="text-danger mb-2">{{ msg }}</div>
          <div class="col-auto text-center">
            <button type="submit" class="btn btn-outline-primary mb-3 me-3">
              로그인
            </button>
            <button type="button" class="btn btn-outline-success mb-3" @click="moveToJoin">
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { login } from "@/api/member";
import { useRouter } from "vue-router";
import { useMemberStore } from "@/stores/member";

const form = ref({
  memberId: "",
  memberPwd: "",
});
const saveId = ref(false);
const msg = ref("");

const router = useRouter();
const memberStore = useMemberStore();

const handleLogin = () =>
  login(
    {
      memberId: form.value.memberId,
      memberPwd: form.value.memberPwd,
    },
    (response) => {
      const data = response.data
      memberStore.login(data['access-token'], data['refresh-token']);
      alert("로그인 성공!");
      router.push("/");
    },
    (error) => {
      console.error(error);
      alert("로그인 실패! 아이디와 비밀번호를 확인해주세요.");
    }
  );

const moveToJoin = () => {
  router.push("/member/join");
}
</script>

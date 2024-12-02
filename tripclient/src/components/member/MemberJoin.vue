<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-8 col-md-10 col-sm-12">
        <h2 class="my-3 py-3 text-center">회원가입</h2>
      </div>
      <div class="col-lg-8 col-md-10 col-sm-12">
        <form @submit.prevent="registerMember">
          <div class="mb-3">
            <label for="memberName" class="form-label">이름 :</label>
            <input type="text" class="form-control" id="memberName" v-model="form.memberName" placeholder="이름..." />
          </div>
          <div class="mb-3">
            <label for="memberId" class="form-label">아이디 :</label>
            <input type="text" class="form-control" id="memberId" v-model="form.memberId" @input="checkMemberId"
              placeholder="아이디..." />
          </div>
          <div id="result-view" class="mb-3" :class="resultClass">
            {{ resultMessage }}
          </div>
          <div class="mb-3">
            <label for="memberPwd" class="form-label">비밀번호 :</label>
            <input type="password" class="form-control" id="memberPwd" v-model="form.memberPwd" placeholder="비밀번호..." />
          </div>
          <div class="mb-3">
            <label for="pwdcheck" class="form-label">비밀번호확인 :</label>
            <input type="password" class="form-control" id="pwdcheck" v-model="form.pwdcheck" placeholder="비밀번호확인..." />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">이메일 :</label>
            <input type="email" class="form-control" id="email" v-model="form.email"
              placeholder="example@example.com" />
          </div>
          <div class="mb-3">
            <label for="address" class="form-label">주소 :</label>
            <input type="text" class="form-control" id="address" v-model="form.address" placeholder="서울시 강남구 역삼동" />
          </div>
          <div class="col-auto text-center">
            <button type="submit" class="btn btn-outline-primary mb-3 me-3">
              회원가입
            </button>
            <button type="reset" class="btn btn-outline-danger mb-3" @click="resetForm">
              초기화
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { idCheck, join } from "@/api/member"
import router from "@/router";

const resultMessage = ref("");
const resultClass = ref("");
const isUseId = ref(false);
const form = ref({
  memberName: "",
  memberId: "",
  memberPwd: "",
  pwdcheck: "",
  email: "",
  address: "",
});

const checkMemberId = async () => {
  if (form.value.memberId.length < 4 || form.value.memberId.length > 16) {
    resultMessage.value = "아이디는 4자 이상 16자 이하입니다.";
    resultClass.value = "text-danger";
    isUseId.value = false;
    return;
  }
  await idCheck(
    form.value.memberId,
    (response) => {
      const data = parseInt(response.data);
      if (data === 0) {
        resultMessage.value = `${form.value.memberId}은 사용할 수 있습니다.`;
        resultClass.value = "text-success";
        isUseId.value = true;
      } else {
        resultMessage.value = `${form.value.memberId}은 사용할 수 없습니다.`;
        resultClass.value = "text-danger";
        isUseId.value = false;
      }
    },
    (error) => {
      console.error("ID 체크 중 오류:", error);
    }
  );
};

const registerMember = async () => {
  if (!form.value.memberName) {
    alert("이름 입력!!");
    return;
  }
  if (!form.value.memberId) {
    alert("아이디 입력!!");
    return;
  }
  if (!isUseId.value) {
    alert("아이디 중복 확인!!");
    isUseId.value = true
    return;
  }
  if (!form.value.memberPwd) {
    alert("비밀번호 입력!!");
    return;
  }
  if (form.value.memberPwd !== form.value.pwdcheck) {
    alert("비밀번호 확인!!");
    return;
  }
  await join(
    form.value,
    (response) => {
      alert(response.data.message);
      router.push("/");
    },
    (error) => {
      alert("회원가입 중 오류 발생!");
      console.error(error);
    }
  );
}

const resetForm = () => {
  form.value = {
    memberName: "",
    memberId: "",
    memberPwd: "",
    pwdcheck: "",
    email: "",
    address: "",
  };
  resultMessage.value = "";
  resultClass.value = "";
  isUseId.value = false;
};
</script>

<style scoped>
/* 스타일 추가 가능 */
</style>

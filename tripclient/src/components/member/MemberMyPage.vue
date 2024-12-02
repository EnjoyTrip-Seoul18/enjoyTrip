<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-8 col-md-10 col-sm-12">
        <h2 class="my-3 py-3 text-center">마이페이지</h2>
      </div>
      <form @submit.prevent="handleUpdateMember" class="mb-3 mt-3 col-lg-8 col-md-10 col-sm-12">
        <div class="form-group mb-3">
          <label for="memberId" class="form-label">아이디 : </label>
          <input type="text" class="form-control" id="memberId" v-model="member.memberId" readonly />
        </div>

        <div class="form-group mb-3">
          <label for="memberName" class="form-label">이름 : </label>
          <input type="text" class="form-control" id="memberName" v-model="member.memberName" />
        </div>

        <div class="form-group mb-3">
          <label for="email" class="form-label">이메일 : </label>
          <input type="email" class="form-control" id="email" v-model="member.email" placeholder="example@domain.com" />
        </div>

        <div class="form-group mb-3">
          <label for="address" class="form-label">주소 : </label>
          <input type="text" class="form-control" id="address" v-model="member.address" placeholder="서울시 강남구 역삼동" />
        </div>

        <div class="form-group mb-3">
          <label for="joinDate" class="form-label">가입일 : </label>
          <input type="text" class="form-control" id="joinDate" v-model="member.joinDate" readonly />
        </div>
        <div class="d-flex justify-content-center mb-3">
          <button type="submit" class="btn btn-outline-primary">
            정보 수정
          </button>
          <form @submit.prevent="handleDeleteMember">
            <button type="submit" class="btn btn-outline-danger" @click="confirmDeletion">
              회원 삭제
            </button>
          </form>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { useMemberStore } from "@/stores/member";
import { info, updateMember, deleteMember } from "@/api/member";
import { useRouter } from "vue-router";

const memberStore = useMemberStore();
const accessToken = memberStore.accessToken;
const router = useRouter();

const member = ref({
  memberId: "",
  memberName: "",
  email: "",
  address: "",
  joinDate: "",
});

onBeforeMount(async () => {
  if (!accessToken) {
    alert("로그인이 필요합니다.");
    return router.push("/member/login");
  }
  await info(
    accessToken,
    (response) => {
      const userInfo = response.data.userInfo;
      member.value.memberId = userInfo.memberId;
      member.value.memberName = userInfo.memberName;
      member.value.email = userInfo.email;
      member.value.address = userInfo.address;
      member.value.joinDate = userInfo.joinDate;
    },
    (error) => {
      console.error("회원 정보 가져오기 실패:", error);
      alert("회원 정보를 가져오는 중 오류가 발생했습니다.");
    }
  );
});

const handleUpdateMember = async () => {
  try {
    await updateMember(
      {
        accessToken, member: member.value
      },
      () => {
        alert("정보가 수정되었습니다.");
      },
      (error) => {
        console.error("정보 수정 실패:", error);
      }
    );
  } catch (error) {
    console.error("정보 수정 중 예외 발생:", error);
  }
};

const handleDeleteMember = async () => {
  if (!confirm("정말로 회원을 삭제하시겠습니까?")) return;
  try {
    await deleteMember(
      accessToken,
      () => {
        alert("회원이 삭제되었습니다.");
        memberStore.logout();
        router.push("/");
      },
      (error) => {
        console.error("회원 삭제 실패:", error);
      }
    );
  } catch (error) {
    console.error("회원 삭제 중 예외 발생:", error);
  }
};

</script>

<style scoped></style>

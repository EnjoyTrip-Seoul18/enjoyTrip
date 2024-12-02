<template>
  <div class="container mt-5">
    <div class="card shadow-sm fill-color2 p-4">
      <h3 class="text-center mb-4">게시글 수정</h3>
      <form @submit.prevent="onSubmit">
        <!-- 제목 입력 -->
        <div class="mb-3">
          <label for="title" class="form-label">제목</label>
          <input type="text" id="title" class="form-control" placeholder="제목을 입력하세요" v-model="formData.subject"
            required />
        </div>

        <!-- 내용 입력 -->
        <div class="mb-3">
          <label for="content" class="form-label">내용</label>
          <textarea id="content" class="form-control" rows="6" placeholder="내용을 입력하세요" v-model="formData.content"
            required></textarea>
        </div>

        <!-- 버튼 섹션 -->
        <div class="d-flex justify-content-center mt-4">
          <!-- 목록으로 돌아가기 버튼 -->
          <router-link to="/board/list?pgno=1" class="btn btn-secondary me-2">
            목록으로 돌아가기
          </router-link>

          <!-- 게시글 수정 버튼 -->
          <button type="submit" class="btn btn-success">
            게시글 수정
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { modifyArticle, getArticle } from "@/api/board";
import { info } from "@/api/member";
import { useMemberStore } from "@/stores/member";
import router from "@/router";
import { useRoute } from "vue-router";

const route = useRoute();
const formData = ref({
  boardId: 0,
  subject: "",
  content: "",
});

const { accessToken } = useMemberStore();

const onSubmit = async () => {
  await modifyArticle(
    {
      board: formData.value,
      accessToken: accessToken,
    },
    () => {
      alert("게시글이 수정되었습니다!");
      router.push(`/board/detail/${formData.value.boardId}`);
    },
    (error) => {
      alert("게시글 수정 중 문제가 발생했습니다.");
      console.error(error);
    }
  );
};

const getMemberId = async () => {
  let id = "";
  await info(accessToken,
    (response) => {
      id = response.data.userInfo.memberId;
      console.log(id);
    },
    (error) => {
      console.error(error);
    }
  );
  return id;
}

onBeforeMount(async () => {
  const boardId = route.params.boardId;
  formData.value.boardId = boardId;
  await getArticle({
      boardId, accessToken
    },
    async (response) => {
      let id = await getMemberId();
      if(response.data.memberId != id) {
        throw new Error('다른 유저입니다.');
      }
      formData.value.subject = response.data.subject;
      formData.value.content = response.data.content;
    },
    (error) => {
      alert("잘못된 접근입니다");
      console.error(error);
      useMemberStore().logout();
      router.push("/member/login");
    }
  );
});
</script>

<style>
.fill-color2 {
  background-color: #f0f8ff;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.card {
  max-width: 600px;
  margin: 0 auto;
}
</style>

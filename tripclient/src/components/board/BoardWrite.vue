<template>
  <div class="container mt-5">
    <div class="card shadow-sm fill-color2 p-4">
      <h3 class="text-center mb-4">게시글 작성</h3>
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

          <!-- 게시글 작성 버튼 -->
          <button type="submit" class="btn btn-primary">
            게시글 작성
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { writeArticle } from "@/api/board"
import { useMemberStore } from "@/stores/member";
import router from "@/router";

// Form 데이터
const formData = ref({
  subject: "",
  content: "",
});
const {accessToken} = useMemberStore();

// 제출 핸들러
const onSubmit = async () => {
  await writeArticle({
    board: formData.value,
    accessToken: accessToken
  },
  () => {
    alert("게시글이 작성되었습니다!");
    router.push("/board/list?pgno=1");
  })
};
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

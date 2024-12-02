<template>
  <div class="container mt-5">
    <div class="card shadow-sm fill-color2 p-4">
      <!-- 제목 -->
      <h3 class="text-center mb-4">{{ board.subject }}</h3>

      <!-- 게시글 정보 -->
      <div class="mb-4 text-muted small d-flex justify-content-between">
        <div>
          <span><strong>글 번호:</strong> {{ board.boardId }}</span> |
          <span><strong>작성자:</strong> {{ board.memberName }}</span> |
          <span><strong>조회수:</strong> {{ board.hit }}</span>
        </div>
        <div><strong>작성일:</strong> {{ board.registerTime }}</div>
      </div>

      <!-- 글 내용 -->
      <div class="mb-4">
        <p>{{ board.content }}</p>
      </div>

      <!-- 댓글 섹션 -->
      <CommentSection :boardId="board.boardId" />
      <div class="d-flex justify-content-center mt-4">
        <RouterLink to="/board/list?pgno=1" class="btn btn-secondary me-2">
          목록으로 돌아가기
        </RouterLink>
        <span v-if="board.show">
          <RouterLink
            :to="{ name: 'boardUpdate', params: { boardId: board.boardId } }"
          >
            <button class="btn btn-primary me-2">수정하기</button>
          </RouterLink>
          <button class="btn btn-danger" @click="handleDelete">삭제하기</button>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { deleteArticle, getArticle } from "@/api/board";
import { info } from "@/api/member";
import router from "@/router";
import { useRoute } from "vue-router";
import { useMemberStore } from "@/stores/member";
import { ref, onBeforeMount } from "vue";
import CommentSection from "./items/CommentSection.vue";
const board = ref({
  boardId: 0,
  memberId: "",
  memberName: "",
  subject: "",
  content: "",
  hit: 0,
  registerTime: "0",
  show: false,
});

const comments = ref([]);
const { accessToken } = useMemberStore();

const handleDelete = async () => {
  await deleteArticle(
    {
      boardId: board.value.boardId,
      accessToken: accessToken,
    },
    () => {
      alert("게시글이 삭제되었습니다!");
      router.push("/board/list?pgno=1");
    },
    (error) => {
      alert("게시글 삭제 중 문제가 발생했습니다.");
      console.error(error);
    }
  );
};

const getMemberId = async () => {
  let id = "";
  await info(
    accessToken,
    (response) => {
      id = response.data.userInfo.memberId;
    },
    (error) => {
      console.error(error);
    }
  );
  return id;
};

onBeforeMount(async () => {
  const route = useRoute();
  const boardId = route.params.boardId;
  board.value.boardId = boardId;
  await getArticle(
    {
      boardId,
      accessToken,
    },
    async (response) => {
      let id = await getMemberId();
      if (response.data.memberId == id) {
        board.value.show = true;
      }
      board.value.memberId = response.data.memberId;
      board.value.memberName = response.data.memberName;
      board.value.subject = response.data.subject;
      board.value.content = response.data.content;
      board.value.hit = response.data.hit;
      board.value.registerTime = response.data.registerTime;
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
  max-width: 800px;
  margin: 0 auto;
}

.comment-card {
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  line-height: 1.5;
}
</style>

<template>
  <div>
    <h5 class="mb-3">댓글</h5>
    <div
      v-for="(comment, index) in comments"
      :key="index"
      class="comment-card mb-3 p-3 shadow-sm"
    >
      <div v-if="comment.status === 'Y'">
        <div class="d-flex justify-content-between align-items-center">
          <strong>{{ comment.memberName }}</strong>
          <div v-if="comment.memberId === memberId">
            <button
              class="btn btn-sm btn-outline-secondary me-2"
              @click="editComment(index, comment.commentId)"
            >
              수정
            </button>
            <button
              class="btn btn-sm btn-outline-danger"
              @click="deleteComment(index, comment.commentId)"
            >
              삭제
            </button>
          </div>
        </div>
        <p class="mb-0" v-if="!comment.isEditing">{{ comment.content }}</p>
        <div v-else>
          <input
            type="text"
            class="form-control mb-2"
            v-model="comment.editContent"
          />
          <button
            class="btn btn-sm btn-primary"
            @click="saveEdit(index, comment.commentId)"
          >
            저장
          </button>
        </div>
      </div>
      <div v-else>
        <p class="text-muted">삭제된 댓글입니다.</p>
      </div>
    </div>

    <CommentInput
      @add-comment="addComment"
      :memberId="memberId"
      :boardId="boardId"
    />
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import CommentInput from "./CommentInput.vue";
import {
  listCommentAPI,
  writeCommentAPI,
  updateCommentAPI,
  deleteCommentAPI,
} from "@/api/comment";
import { useMemberStore } from "@/stores/member";
import { info } from "@/api/member";

const memberId = ref("");
const memberName = ref("");
const { accessToken } = useMemberStore();
const props = defineProps({
  boardId: [String, Number],
});
const comments = ref([
  {
    commentId: 1,
    refId: null,
    content: "내용1",
    memberId: "ssafy",
    memberName: "김싸피",
    boardId: 1,
    status: "Y",
  },
  {
    commentId: 2,
    refId: null,
    content: "내용2",
    memberId: "ssafy",
    memberName: "김싸피",
    boardId: 1,
    status: "N",
  },
  {
    commentId: 3,
    refId: null,
    content: "내용3",
    memberId: "ssafy",
    memberName: "김싸피",
    boardId: 1,
    status: "Y",
  },
]);

const addComment = async (comment) => {
  await writeCommentAPI(
    { comment, accessToken },
    (response) => {
      // console.log(response);
    },
    (error) => {
      console.error(error);
    }
  );
  comments.value.push({
    ...comment,
    isEditing: false,
    editContent: "",
    memberName: memberName.value,
    status: "Y",
  });
};

const deleteComment = async (index, commentId) => {
  await deleteCommentAPI(
    { commentId, accessToken },
    (response) => {
      // console.log(response);
    },
    (error) => {
      console.error(error);
    }
  );
  comments.value[index] = "N";
};

const editComment = (index, commentId) => {
  const comment = comments.value[index];
  comment.isEditing = true;
  comment.editContent = comment.content;
};

const saveEdit = async (index, commentId) => {
  const comment = comments.value[index];
  if (comment.editContent.trim() === "") {
    alert("수정 내용은 비어 있을 수 없습니다.");
    return;
  }
  let beforeData = comment.content;
  comment.content = comment.editContent;
  await updateCommentAPI(
    { comment, accessToken },
    (response) => {
      console.log(response);
      comment.isEditing = false;
    },
    (error) => {
      comment.content = beforeData;
      console.error(error);
    }
  );
};

const setMemberId = async () => {
  await info(
    accessToken,
    (response) => {
      const userInfo = response.data.userInfo;
      memberId.value = userInfo.memberId;
      memberName.value = userInfo.memberName;
    },
    (error) => {
      console.error(error);
    }
  );
};

const setComments = async () => {
  await listCommentAPI(
    { boardId: props.boardId, accessToken },
    (response) => {
      comments.value = response.data;
    },
    (error) => {
      console.error(error);
    }
  );
};

onBeforeMount(async () => {
  await setMemberId();
  await setComments();
});
</script>

<style scoped>
.comment-card {
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
}
</style>

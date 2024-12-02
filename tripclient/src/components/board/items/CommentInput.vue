<template>
  <div class="input-group mb-3">
    <input
      type="text"
      class="form-control"
      placeholder="댓글을 입력하세요..."
      v-model="newComment.content"
    />
    <button class="btn btn-primary" @click="submitComment">댓글 작성</button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  boardId: [String, Number],
  memberId: String,
});

const newComment = ref({
  memberId: props.memberId,
  content: "",
  boardId: props.boardId,
});

const emit = defineEmits(["add-comment"]);

const submitComment = () => {
  if (newComment.value.content.trim() === "") {
    alert("댓글 내용을 입력하세요.");
    return;
  }

  emit("add-comment", { ...newComment.value });
  newComment.value.content = "";
};
</script>

<style scoped>
.input-group {
  display: flex;
  align-items: center;
}

.form-control {
  flex-grow: 1;
}

.btn {
  margin-left: 10px;
}
</style>

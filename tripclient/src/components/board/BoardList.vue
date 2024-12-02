<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-8 col-md-10 col-sm-12">
        <h2 class="my-3 py-3 text-center">커뮤니티</h2>
      </div>
      <MenuBar :options="menuOptions" @option-change="handleOptionChange" @search-change="handleSearchChange"
        @search-submit="handleSearchSubmit" />
      <table class="table table-hover">
        <thead>
          <tr class="text-center">
            <th scope="col">글번호</th>
            <th scope="col">제목</th>
            <th scope="col">작성자</th>
            <th scope="col">조회수</th>
            <th scope="col">작성일</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="board in boards" :key="board.boardId" class="text-center">
            <th scope="row">{{ board.boardId }}</th>
            <td class="text-start">
              <router-link :to="{
                  name: 'boardDetail',
                  params: { boardId: board.boardId },
                }" class="board-title link-dark">
                {{ board.subject }}
              </router-link>
            </td>
            <td>{{ board.memberId }}</td>
            <td>{{ board.hit }}</td>
            <td>{{ board.registerTime }}</td>
          </tr>
        </tbody>
      </table>
      <RouterLink :to="'/board/write'">
        <button class="btn btn-primary ms-3 mb-3 row justify-content-center">
          글 작성
        </button>
      </RouterLink>

      <Pagination :totalPageCount="totalPageCount" :currentPage="currentPage" @page-change="onPageChange" />
    </div>
  </div>
</template>

<script setup>
import { listArticle } from "@/api/board";
import router from "@/router";
import { onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Pagination from "./items/Pagination.vue";

const request = ref({});
const boards = ref([]);
const currentPage = ref(0);
const totalPageCount = ref(0);
const route = useRoute();

const getList = async (request) => {
  boards.value = [];
  await listArticle(
    request,
    (response) => {
      response.data.articles.forEach((board) => boards.value.push(board));
      currentPage.value = response.data.currentPage;
      totalPageCount.value = response.data.totalPageCount;
    },
    (error) => {
      console.error(error);
    }
  );
};

const menuOptions = ref([
  { name: "제목", value: "subject"},
  { name: "작성자", value: "user_id" },
]);

const handleOptionChange = (selectedOption) => {
  request.value.key = selectedOption;
};

const handleSearchChange = (searchQuery) => {
  request.value.word = searchQuery;
};

const handleSearchSubmit = () => {
  router.push({
    query: {
      ...router.currentRoute.value.query,
      pgno: 1,
      key: route.query.key,
      word: route.query.word,
    },
  });
  // setRequest();
  getList(urlBuilder());
};

const onPageChange = (newPage) => {
  request.value.pgno = newPage;
  router.push({
    query: {
      ...router.currentRoute.value.query,
      pgno: newPage,
    },
  });
  // setRequest();
  getList(urlBuilder());
};

onBeforeMount(async () => {
  setRequest();
  await getList(urlBuilder());
});

const urlBuilder = () => {
  let result = `/board/list?pgno=${request.value.pgno}&spp=${request.value.spp}`;
  if (request.value.word) result += `&word=${request.value.word}`;
  if (request.value.user_id)
    result += `&user_id=${request.value.user_id}`;
  return result;
}

const setRequest = () => {
  request.value = {
    pgno: route.query.pgno || 1,
    word: route.query.key === "subject" ? route.query.word : "",
    user_id: route.query.key === "user_id" ? route.query.word : "",
    spp: 10,
  };
}
</script>

<style></style>

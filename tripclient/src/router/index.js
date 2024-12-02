import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import RecommendationView from "@/views/RecommendationView.vue";
import BoardView from "@/views/BoardView.vue";
import MemberLogin from "@/components/member/MemberLogin.vue";
import MemberJoin from "@/components/member/MemberJoin.vue";
import MemberMyPage from "@/components/member/MemberMyPage.vue";
import RecommendationMain from "@/components/recommendation/RecommendationMain.vue";
import BoardList from "@/components/board/BoardList.vue";
import BoardDetail from "@/components/board/BoardDetail.vue";
import BoardUpdate from "@/components/board/BoardUpdate.vue";
import BoardWrite from "@/components/board/BoardWrite.vue";
import AttractionData from "@/components/attraction/AttractionData.vue";
import AttractionResult from "@/components/attraction/AttractionResult.vue";
import AttractionMain from "@/components/attraction/AttractionMain.vue";
import AttractionReview from "@/components/attraction/AttractionReview.vue";
import { useMemberStore } from "@/stores/member";
import RecommendationReview from "@/components/recommendation/RecommendationReview.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/recommendation",
      name: "recommendation",
      component: RecommendationView,
      children: [
        {
          path: "",
          name: "recommendationMain",
          component: RecommendationMain,
        },
        {
          path: "review",
          name: "recommendationReview",
          component: RecommendationReview,
        }
      ],
    },
    {
      path: "/board",
      name: "boardView",
      component: BoardView,
      redirect: { path: "/board/list", query: { pgno: "1" } },
      children: [
        {
          path: "list",
          name: "boardList",
          component: BoardList,
        },
        {
          path: "detail/:boardId",
          name: "boardDetail",
          component: BoardDetail,
        },
        {
          path: "update/:boardId",
          name: "boardUpdate",
          component: BoardUpdate,
        },
        {
          path: "write",
          name: "boardWrite",
          component: BoardWrite,
        },
      ],
    },
    {
      path: "/attraction",
      name: "attraction",
      children: [
        {
          path: "",
          name: "main",
          component: AttractionMain,
        },
        {
          path: "data",
          name: "data",
          component: AttractionData
        },
        {
          path: "result",
          name: "result",
          component: AttractionResult
        },
        {
          path: "review",
          name: "review",
          component: AttractionReview
        }
      ]
    },
    {
      path: "/member",
      name: "member",
      redirect: "/member/login",
      children: [
        {
          path: "login",
          name: "memberLogin",
          component: MemberLogin,
        },
        {
          path: "join",
          name: "memberJoin",
          component: MemberJoin,
        },
        {
          path: "mypage",
          name: "memberMyPage",
          component: MemberMyPage,
        },
      ],
    },
  ],
});

router.beforeEach((to) => {
  const store = useMemberStore();
  if (to.meta.requiresAuth && !store.isLoggedIn) return 'member/login'
})

router.afterEach(() => {
  const collapseBtn = document.querySelector(".container-fluid>button");
  const collapse = document.getElementById("navbarScroll");
  collapseBtn.setAttribute("class", "navbar-toggler");
  collapseBtn.setAttribute("aria-expanded", false);
  collapse.setAttribute("class", "collapse navbar-collapse");
});

export default router;

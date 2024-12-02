import "@/assets/style.css"

import { createApp } from "vue";
import { createPinia } from "pinia";
import { createBootstrap } from "bootstrap-vue-next";
import { useKakao } from 'vue3-kakao-maps/@utils';
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";
import "bootstrap";

import "@fontsource/noto-sans-kr";
import "@fontsource/noto-sans-kr/700.css";

const app = createApp(App);
const pinia = createPinia();
const kakao = import.meta.env.VITE_KAKAO_MAP_SERVICE_KEY;

pinia.use(piniaPluginPersistedstate);
useKakao(kakao);

app.use(pinia);
app.use(router);
app.use(createBootstrap());

const globalStyle = document.createElement("style");
globalStyle.textContent = `
  * {
    font-family: 'Noto Sans KR', sans-serif;
  }
`;
document.head.appendChild(globalStyle);

app.mount("#app");

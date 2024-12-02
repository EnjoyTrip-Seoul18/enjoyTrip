import { areaAxios, serverAxios } from "@/util/http-commons";
import axios from "axios";

const area = areaAxios();
const server = serverAxios();
const API_KEY = import.meta.env.VITE_GPT_API_SERVICE_KEY;
const GPT = import.meta.env.VITE_VUE_GPT_URL;

async function getData(url, success, fail) {
  await area.get(url).then(success).catch(fail);
}

async function getPath(attractions, success, fail) {
  await server.post("/attraction/path", attractions).then(success).catch(fail);
}

async function getReview(request, success, fail) {
  await axios
    .post(
      GPT,
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You have been a tour guide for over 10 years. You know the famous and hidden tourist spots, accommodations, and restaurants in a given city, county, or state very well, and you are also a critic who values ​​efficiency above all else and hates wasting money on transportation and other expenses. You will have a travel plan from now on. You can think of it as moving from the first to the last in order. To help you make a travel plan, think of a travel route (a combination of the shortest distance and content type) between tourist spots and recommend an evaluation of the tour plan according to the given format.`,
          },
          {
            role: "user",
            content: `
            <instruction>
              우선 데이터는 다음과 같아. ${request} 각각이 의미하는 바는 다음과 같아:
              before : 출발지
              after: 도착지
              name : 관광지명
              address : 주소
              latitude : 위도
              longitude : 경도
              distance : before과 after 사이의 harversine 거리로, 단위는 km야. 이 값이 10이 넘는게 있으면 무조건 비효율적이라 알려줘.

              이제 너가 응답해야 될 답변은 다음과 같아.
              1. 총평 : total,
              2. 계획의 좋은점 : good으로 하고 어떤 점이 좋은지는 1, 2, 3 이렇게 설명해줘
              3. 계획의 아쉬운 점 : bad으로 하고 어떤 점이 나쁜지는 1, 2, 3 이렇게 설명해줘
              4. 피드백 : feedback으로 하고, 총점을 10점 만점에 몇 점인지 평가해줘.
            </instruction>
            <example>
            {
              "total": "전체적으로 훌륭한 계획이네요! 거리가 5km 정도로 이동하기 불편하다는 단점이 있지만 전반적으로 잘 짜신 여행 계획인 것 같아요",
              "good": "1. 우선 전반적인 테마가 잘 짜여져있다는 점이 가장 마음에 들어요.<br>2. 전반적으로는 1km 이내인 점이 이동성에서 좋은 계획이네요.<br>"
              "bad": "1. 한군데가 좀 많이 멀리 떨어져 있네요.<br>2. 비슷한 테마라 질릴 수도 있긴 하네요."
              "feedback" : "마지막에 멀리 떨어져 있는 관광지는 다른 테마의 근거리 관광지로 하는 편이 좋을 것 같아요.<b>10점 만점에 8점</b> 정도인 것 같아요"
            }
            </example>
          `,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    )
    .then(success)
    .catch(fail);
}

async function getSidos(success, fail) {
  await server.get("/attraction/sido").then(success).catch(fail);
}

async function getGuguns(request, success, fail) {
  await server
    .get("/attraction/gugun/" + request)
    .then(success)
    .catch(fail);
}

async function getContentTypes(success, fail) {
  await server.get("/attraction/contentType").then(success).catch(fail);
}

async function getList(request, success, fail) {
  await server.post("/attraction/list", request).then(success).catch(fail);
}

export {
  getData,
  getPath,
  getReview,
  getSidos,
  getGuguns,
  getContentTypes,
  getList,
};

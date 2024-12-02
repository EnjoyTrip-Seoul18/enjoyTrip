import { serverAxios } from "@/util/http-commons";

const server = serverAxios();

async function login(form, success, fail) {
  // console.log("member.js 로그인");
  await server.post("/member/login", form).then(success).catch(fail);
}

async function info(request, success, fail) {
  // console.log("member.js 회원 정보 요청 ", request);
  await server
    .get("/member/info", {
      headers: {
        Authorization: `Bearer ${request.trim()}`
      }
    })
    .then(success)
    .catch(fail);
}

async function updateMember(request, success, fail) {
  // console.log("member.js 회원 정보 수정 요청");
  await server
    .patch("/member/update", 
      request.member, {
        headers: {
          Authorization: `Bearer ${request.accessToken.trim()}`
        },
    })
    .then(success)
    .catch(fail);
}

async function deleteMember(request, success, fail) {
  // console.log("member.js 회원 삭제 요청");
  await server
    .delete("/member/delete", {
      headers: {
        Authorization: `Bearer ${request.trim()}`
      }
    })
    .then(success)
    .catch(fail);
}

async function join(request, success, fail) {
  // console.log("member.js 회원 가입 요청 ", request);
  await server
    .post("/member/join", request)
    .then(success)
    .catch(fail);
}

async function idCheck(request, success, fail) {
  // console.log("member.js 아이디 확인", request);
  await server
    .post("/member/idCheck", request)
    .then(success)
    .catch(fail);
}

export { login, info, updateMember, deleteMember, join, idCheck };


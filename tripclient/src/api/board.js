import { serverAxios } from "@/util/http-commons";

const server = serverAxios();

async function writeArticle(request, success, fail) {
  await server
    .post("/board", request.board, {
      headers: {
        Authorization: `Bearer ${request.accessToken}`,
      },
    })
    .then(success)
    .catch(fail);
}

async function listArticle(request, success, fail) {
  await server.get(request).then(success).catch(fail);
}

async function getArticle(request, success, fail) {
  await server
    .get(`/board/${request.boardId}`, {
      headers: {
        Authorization: `Bearer ${request.accessToken}`,
      },
    })
    .then(success)
    .catch(fail);
}

async function modifyArticle(request, success, fail) {
  await server
    .put(`/board/${request.board.boardId}`, request.board, {
      headers: {
        Authorization: `Bearer ${request.accessToken}`,
      },
    })
    .then(success)
    .catch(fail);
}

async function deleteArticle(request, success, fail) {
  await server
    .delete(`/board/${request.boardId}`, {
      headers: {
        Authorization: `Bearer ${request.accessToken}`,
      },
    })
    .then(success)
    .catch(fail);
}

export { writeArticle, listArticle, getArticle, modifyArticle, deleteArticle };

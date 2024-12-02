import { serverAxios } from "@/util/http-commons";

const server = serverAxios();

async function listCommentAPI(request, success, fail) {
  await server
    .get(`/comment/list/${request.boardId}`, {
      headers: {
        Authorization: `Bearer ${request.accessToken}`,
      },
    })
    .then(success)
    .catch(fail);
}

async function writeCommentAPI(request, success, fail) {
  await server
    .post(`/comment/`, request.comment, {
      headers: {
        Authorization: `Bearer ${request.accessToken}`,
      },
    })
    .then(success)
    .catch(fail);
}

async function updateCommentAPI(request, success, fail) {
  await server
    .put(`/comment/${request.comment.commentId}`, request.comment, {
      headers: {
        Authorization: `Bearer ${request.accessToken}`,
      },
    })
    .then(success)
    .catch(fail);
}

async function deleteCommentAPI(request, success, fail) {
  await server
    .delete(`/comment/${request.commentId}`, {
      headers: {
        Authorization: `Bearer ${request.accessToken}`,
      },
    })
    .then(success)
    .catch(fail);
}

export { listCommentAPI, writeCommentAPI, updateCommentAPI, deleteCommentAPI };

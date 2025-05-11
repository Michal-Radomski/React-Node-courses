import axios from "axios";

import { SAVE_COMMENT, FETCH_COMMENTS, CHANGE_AUTH } from "actions/types";

export function saveComment(comment: string) {
  return {
    type: SAVE_COMMENT,
    payload: comment,
  };
}

export function fetchComments() {
  const URL = "https://jsonplaceholder.typicode.com/comments";
  const response = axios.get(URL);

  return {
    type: FETCH_COMMENTS,
    payload: response,
  };
}

export function changeAuth(isLoggedIn: boolean) {
  return {
    type: CHANGE_AUTH,
    payload: isLoggedIn,
  };
}

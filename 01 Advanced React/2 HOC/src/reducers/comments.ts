import { SAVE_COMMENT, FETCH_COMMENTS } from "actions/types";

const commentsReducers = function (state = [], action: Action) {
  switch (action.type) {
    case SAVE_COMMENT:
      return [...state, action.payload];
    case FETCH_COMMENTS:
      const comments = action.payload.data.map((comment: { name: string }) => comment.name);
      return [...state, ...comments];

    default:
      return state;
  }
};

export default commentsReducers;

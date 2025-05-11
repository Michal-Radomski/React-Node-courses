import { combineReducers } from "redux";

import commentsReducers from "reducers/comments";

const rootReducer = combineReducers({
  comments: commentsReducers,
});

export default rootReducer;

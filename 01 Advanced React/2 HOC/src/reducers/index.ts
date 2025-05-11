import { combineReducers } from "redux";

import commentsReducers from "reducers/comments";
import authReducer from "./auth";

const rootReducer = combineReducers({
  comments: commentsReducers,
  auth: authReducer,
});

export default rootReducer;

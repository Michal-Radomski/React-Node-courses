import { CHANGE_AUTH } from "actions/types";

const authReducer = function (state: RootState = false, action: { type: string } | Action) {
  switch (action.type) {
    case CHANGE_AUTH:
      return action.payload;
    default:
      return state;
  }
};

export default authReducer;

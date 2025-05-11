import commentsReducers from "reducers/comments";
import { SAVE_COMMENT } from "actions/types";

//* Test 7
it("handles actions of type SAVE_COMMENT", () => {
  const action = {
    type: SAVE_COMMENT,
    payload: "New Comment",
  };
  const newState = commentsReducers([], action);
  expect(newState).toEqual(["New Comment"]);
});

//* Test 8
it("handles actions unknown type", () => {
  const newState = commentsReducers([], {});
  expect(newState).toEqual([]);
});

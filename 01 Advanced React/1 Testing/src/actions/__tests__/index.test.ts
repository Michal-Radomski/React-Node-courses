import { SAVE_COMMENT } from "actions/types";
import { saveComment } from "actions/index";

//* Tests 9
describe("saveComment", () => {
  it("has the correct type", () => {
    const action = saveComment("any");
    expect(action.type).toEqual(SAVE_COMMENT);
  });

  it("has the correct payload", () => {
    const action = saveComment("New Comment");
    expect(action.payload).toEqual("New Comment");
  });
});

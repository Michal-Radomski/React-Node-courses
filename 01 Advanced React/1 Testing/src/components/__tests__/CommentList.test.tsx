import { ReactWrapper, mount } from "enzyme";

import CommentList from "components/CommentList";
import Root from "Root";

//* Tests 10
let wrapped: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
beforeEach(() => {
  const initialState = {
    comments: ["Comment_1", "Comment_2"],
  };

  wrapped = mount(
    <Root initialState={initialState}>
      <CommentList />
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});

it("creates one LI per comment", () => {
  // console.log(wrapped.find("li").length);
  expect(wrapped.find("li").length).toEqual(2);
});

it("shows the text for the each comment", () => {
  // console.log(wrapped.render().text());
  expect(wrapped.render().text()).toContain("Comment_1");
  expect(wrapped.render().text()).toContain("Comment_2");
});

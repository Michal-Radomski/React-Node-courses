// import React from "react";
// import ReactDOM from "react-dom";
import { ShallowWrapper, shallow } from "enzyme";

import App from "components/App";
import CommentBox from "components/CommentBox";
import CommentList from "components/CommentList";

//* Test 0 - static
// describe("<App/>", () => {
//   it("renders one div", () => {
//     const view = render(<App />);
//     expect(view.find("div").length).toBeTruthy();
//   });
// });

//* First test
// test("renders without crashing", () => {
//   const div = document.createElement("div");
//   ReactDOM.render(
//     <React.Fragment>
//       <App />
//     </React.Fragment>,
//     div
//   );
//   expect(div.innerHTML).toContain("Hi there!");
//   ReactDOM.unmountComponentAtNode(div);
// });

//* Test 2
// it("shows a comment box", () => {
//   const div = document.createElement("div");
//   ReactDOM.render(
//     <React.Fragment>
//       <App />
//     </React.Fragment>,
//     div
//   );
//   console.log(div.innerHTML);
//   expect(div.innerHTML).toContain("Comment Box");
//   expect(div.innerHTML).toContain("Comment List");
//   expect(div.innerHTML).toBeTruthy();
//   ReactDOM.unmountComponentAtNode(div);
// });

//* Tests 3
let wrapped: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
beforeEach(() => {
  wrapped = shallow(<App />);
});

afterAll(() => {
  wrapped.unmount();
});

it("shows a comment box", () => {
  // const wrapped = shallow(<App />);
  expect(wrapped.find(CommentBox).length).toEqual(1);
});

it("shows a comment list", () => {
  // const wrapped = shallow(<App />);
  expect(wrapped.find(CommentList).length).toEqual(1);
});

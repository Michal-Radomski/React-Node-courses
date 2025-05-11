import React from "react";
import { mount } from "enzyme";
import moxios from "moxios";

import Root from "Root";
import App from "components/App";

//* Tests 11
beforeEach(() => {
  const URL = "https://jsonplaceholder.typicode.com/comments";

  moxios.install();
  moxios.stubRequest(URL, {
    status: 200,
    response: [{ name: "Fetched #1" }, { name: "Fetched #2" }, { name: "Fetched #3" }],
  });
});

afterAll(() => {
  moxios.uninstall();
});

it("can fetch a list of comments and display them", (done) => {
  // console.log("done:", done);
  const wrapped = mount(
    // Attempt to render the *entire* app
    <React.Fragment>
      <Root>
        <App />
      </Root>
    </React.Fragment>
  );

  // Find the "fetchComments" button and click it
  wrapped.find(".fetch-comments").simulate("click");

  // Expect to find a list of comments!
  // setTimeout(() => {
  // eslint-disable-next-line testing-library/await-async-utils
  moxios.wait(() => {
    wrapped.update();
    expect(wrapped.find("li").length).toEqual(3);
    done();
    wrapped.unmount();
  });
});

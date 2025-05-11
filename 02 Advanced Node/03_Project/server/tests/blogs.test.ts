const CustomPage = require("./helpers/pageTS");

let customPage: typeof CustomPage;
// console.log({ page });

beforeEach(async () => {
  customPage = await CustomPage.build();
  // console.log({ page });
  await customPage.goto("http://localhost:3000");
});

afterEach(async () => {
  await customPage.close();
});

//* Test 4
// test("when logged in, we can see blog create form", async () => {
//   await customPage.login();
//   await customPage.click("a.btn-floating");
//   const label = await customPage.getContentsOf("form label");
//   expect(label).toEqual("Blog Title");
// });

describe("When logged in, we", () => {
  beforeEach(async () => {
    await customPage.login();
    await customPage.click("a.btn-floating");
  });

  //* Test 4 moved here
  test("can see blog create form", async () => {
    const label = await customPage.getContentsOf("form label");
    expect(label).toEqual("Blog Title");
  });
  //* Test 4 -> V2
  // it("shows a  blog create form", async () => {
  //   const label = await customPage.getContentsOf("form label");
  //   expect(label).toEqual("Blog Title");
  // });

  describe("and using invalid inputs", () => {
    beforeEach(async () => {
      await customPage.click("form button");
    });

    test("the form shows an error message", async () => {
      const titleError = await customPage.getContentsOf(".title .red-text");
      const contentError = await customPage.getContentsOf(".content .red-text");

      expect(titleError).toEqual("You must provide a value");
      expect(contentError).toEqual("You must provide a value");
    });
  });

  describe("and using valid inputs", () => {
    beforeEach(async () => {
      await customPage.type(".title input", "My Title");
      await customPage.type(".content input", "My Content");
      await customPage.click("form button");
    });

    test("Submitting takes user to review screen", async () => {
      const text = await customPage.getContentsOf("h5");
      expect(text).toEqual("Please confirm your entries");
    });

    test("Submitting then saving adds blog to index page", async () => {
      await customPage.click("button.green");
      await customPage.waitForSelector(".card");

      const title = await customPage.getContentsOf(".card-title");
      const content = await customPage.getContentsOf("p");

      expect(title).toEqual("My Title");
      expect(content).toEqual("My Content");
    });
  });
});

describe("user is not logged in", () => {
  //* V1
  // test("user can't create blog post", async () => {
  //   const result = await customPage.evaluate(() => {
  //     return fetch("/api/blogs", {
  //       method: "POST",
  //       credentials: "same-origin",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         title: "My title3",
  //         content: "My Content3",
  //       }),
  //     }).then((res: Response) => res.json());
  //   });
  //   // console.log("result:", result);
  //   expect(result).toEqual({ error: "You must log in!" });
  // });

  // test("user can't get a list of posts", async () => {
  //   const result = await customPage.evaluate(() => {
  //     return fetch("/api/blogs", {
  //       method: "GET",
  //       credentials: "same-origin",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }).then((res: Response) => res.json());
  //   });
  //   // console.log("result:", result);
  //   expect(result).toEqual({ error: "You must log in!" });
  // });

  //* V2 -> shorter version!
  const actions = [
    {
      method: "get",
      path: "/api/blogs",
    },
    {
      method: "post",
      path: "/api/blogs",
      data: {
        title: "Title 4",
        content: "Content 4",
      },
    },
  ];

  test("blog related actions are prohibited", async () => {
    const results = await customPage.execRequests(actions);
    for (let result of results) {
      expect(result).toEqual({ error: "You must log in!" });
    }
  });
});

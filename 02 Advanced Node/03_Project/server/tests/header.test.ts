//* Importing CustomPage as Page!
const Page = require("./helpers/pageTS");
// console.log("Page:", Page);

// test("Adds two numbers", () => {
//   const sum = 1 + 2;
//   expect(sum).toEqual(3);
// });

let page: typeof Page;
// console.log({ page });

beforeEach(async () => {
  page = await Page.build();
  // console.log({ page });
  await page.goto("http://localhost:3000");
});

afterEach(async () => {
  await page.close();
});

test("the header has the correct text", async () => {
  // const text = await page.$eval("a.brand-logo", (el: HTMLAnchorElement) => el.innerHTML);
  const text = await page.getContentsOf("a.brand-logo");
  // console.log("text:", text);
  expect(text).toEqual("Blogster");
});

test("clicking login starts oauth flow", async () => {
  await page.click(".right a");
  const url = await page.url();
  // console.log("url:", url);
  expect(url).toMatch(/accounts\.google\.com/);
});

//* test.only("when signed in, shows logout button", async () => { //* run this test only!
test("when signed in, shows logout button", async () => {
  await page.login();
  // const text = await page.$eval('a[href="/auth/logout"]', (el: HTMLAnchorElement) => el.innerHTML);
  const text = await page.getContentsOf('a[href="/auth/logout"]');
  expect(text).toEqual("Logout");
});

// console.log("process.env.NODE_ENV:", process.env.NODE_ENV); //* Default Value: test !!!

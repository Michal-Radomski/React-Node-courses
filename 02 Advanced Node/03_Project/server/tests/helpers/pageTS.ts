import puppeteer, { Page as PageInterface } from "puppeteer";

const { sessionFactory } = require("../factories/sessionFactory");
const { userFactory } = require("../factories/userFactory");

class CustomPage {
  page: PageInterface;
  constructor(page: PageInterface) {
    this.page = page;
  }

  static async build() {
    const browser = await puppeteer.launch({
      // headless: false,
      // headless: true,
      headless: "new",
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();
    const customPage = new CustomPage(page);

    return new Proxy(customPage, {
      get: (target, property, receiver) => {
        if ((target as any)[property]) {
          return (target as any)[property];
        }

        let value = (browser as any)[property];
        if (value instanceof Function) {
          return function (this: any, ...args: any) {
            return value.apply(this === receiver ? browser : this, args);
          };
        }

        value = (page as any)[property];
        if (value instanceof Function) {
          return function (this: any, ...args: any) {
            return value.apply(this === receiver ? page : this, args);
          };
        }
        return value;
      },
    });
  }

  async login() {
    const user = await userFactory();
    const { sessionString, cookieSig } = sessionFactory(user);

    await this.page.setCookie({ name: "session", value: sessionString });
    await this.page.setCookie({ name: "session.sig", value: cookieSig });
    // Refresh page
    // await this.page.goto("http://localhost:3000");
    await this.page.goto("http://localhost:3000/blogs");
    // Wait until the element appears
    await this.page.waitForSelector('a[href="/auth/logout"]');
  }

  async getContentsOf(selector: string) {
    return this.page.$eval(selector, (el) => el.innerHTML);
  }

  get(path: string) {
    return this.page.evaluate((_path) => {
      return fetch(_path, {
        method: "GET",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
    }, path);
  }

  post(path: string, data: Object) {
    return this.page.evaluate(
      (_path, _data) => {
        return fetch(_path, {
          method: "POST",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(_data),
        }).then((res) => res.json());
      },
      path,
      data
    );
  }

  execRequests(actions: { method: string; path: string; data: Object }[]) {
    return Promise.all(
      actions.map(({ method, path, data }) => {
        return (this as any)[method](path, data);
      })
    );
  }
}

module.exports = CustomPage;

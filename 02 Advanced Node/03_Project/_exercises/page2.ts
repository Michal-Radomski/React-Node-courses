class Page {
  goto(url: string) {
    console.log("I'm going to another page" + url);
  }
  setCookie() {
    console.log("I'm setting a cookie");
  }
}

class CustomPage {
  static build() {
    const page = new Page();
    const customPage = new CustomPage(page);
    const superPage = new Proxy(customPage, {
      get: function (target, property) {
        return target[property] || page[property];
      },
    });
    return superPage;
  }
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  login() {
    this.page.goto("localhost:3000");
    this.page.setCookie();
  }
}

const superPage = CustomPage.build();
console.log("superPage:", superPage);

superPage.login();
superPage.login();

console.clear();

class Greetings {
  english() {
    return "Hello";
  }
  spanish() {
    return "Hola";
  }
}

class MoreGreetings {
  german() {
    return "Hallo";
  }
  french() {
    return "Bonjour";
  }
}

const greetings = new Greetings();
const moreGreetings = new MoreGreetings();
console.log("greetings:", greetings, typeof greetings);

console.log(greetings.english());
console.log(greetings.spanish());
console.log(moreGreetings.german());
console.log(moreGreetings.french());

const allGreetings = new Proxy(moreGreetings, {
  //* target = moreGreetings
  get: function (_target, property: string) {
    // console.log({ _target });
    // console.log({ property });
    return moreGreetings[property as keyof MoreGreetings] || greetings[property as keyof Greetings];
  },
});

console.log(allGreetings.french());
console.log(allGreetings.german());
// @ts-ignore
console.log(allGreetings.english());

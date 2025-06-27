//* Regular expression denial of service example

import safe from "safe-regex";

// eslint-disable-next-line security/detect-unsafe-regex
const regex: RegExp = /^([a-z]+.)+[A-Za-z]+$/;

console.log("safe(regex):", safe(regex));

let str = "";

for (let i = 0; i < 100; i++) {
  str += "a";
}

str = str + "7";
console.log("str:", str);

console.log(str.match(regex));
console.log("something");

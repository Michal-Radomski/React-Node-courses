//* Partial -> all optional, Required -> all required!

//* keyof / typeof

export {};
type ObjectType = {
  key1: 1;
  key2: 2;
};

type result = keyof ObjectType & string; //* "key1" | "key2"

const test: result = "key1"; //* or key2
console.log({ test });

type Obj = {
  0: "I'm 0";
  1: "I'm 1";
  2: "c";
};

type test0 = Obj[2]; //* c
const test0const: test0 = "c";
console.log({ test0const });

type Obj2 = {
  a: "A";
  b: "B";
  c: number;
};

type res = Obj2[keyof Obj2]; //*  number | "A" | "B"

type set1 = "a" | "b" | "c";
type set2 = "b" | "c" | "d";
type UnioType = set1 | set2; //* "b" | "c" | "d" | "a"
type IntersectionType = set1 & set2; //* "b" | "c"

type Obj3 = {
  [key in "a" | "b" | "c"]: number;
};
// type Obj3 = {
//     c: number;
//     a: number;
//     b: number;
// }

type mask = {
  [key in keyof Obj3]: boolean;
};
// type mask = {
//     c: boolean;
//     a: boolean;
//     b: boolean;
// }

type newType = Pick<Obj3, "a" | "b">;
// type newType = {
//     a: number;
//     b: number;
// }

type newType2 = Omit<Obj3, "a" | "b">;
// type newType2 = {
//     c: number;
// }

// A simple object
const person = {
  name: "Alice",
  age: 30,
  location: "Wonderland",
};

// Using typeof to get the type of the 'person' object
type PersonType = typeof person;
//^ type PersonType = {
//^     name: string;
//^     age: number;
//^     location: string;
//^ }

// Using keyof to get a union type of the keys of PersonType
type PersonKeys = keyof PersonType; // "name" | "age" | "location"
//^ type PersonKeys = "name" | "age" | "location"

type Test = keyof typeof person; //^ "name" | "age" | "location"

// Example function using keyof
function getProperty(obj: PersonType, key: PersonKeys) {
  return obj[key];
}

// Usage
const name = getProperty(person, "name"); // OK
// const invalid = getProperty(person, "invalidKey"); // Error: Argument of type '"invalidKey"' is not assignable to parameter of type 'PersonKeys'.
console.log({ name }); //* Alice

const COLORS = {
  red: "#FF0000",
  green: "#00FF00",
  blue: "#0000FF",
};

// typeof COLORS gives the type: { red: string; green: string; blue: string; }
// keyof typeof COLORS gives the union type: "red" | "green" | "blue"
type ColorKeys = keyof typeof COLORS; //* "red" | "green" | "blue"

function getColorName(color: ColorKeys) {
  return COLORS[color];
}

console.log(getColorName("red")); // OK -> #FF0000
// getColorName("yellow"); // Error: Argument not assignable to parameter of type 'ColorKeys'

const account = {
  username: "donald_duck",
  email: "donald.duck@example.com",
  role: "admin",
};

const accountKeys = Object.keys(account); // string[]

const greetings = accountKeys.map((key) => `Hello, your ${key} is ${account[key as keyof typeof account]}`);
console.log(greetings);
// [
//   'Hello, your username is donald_duck',
//   'Hello, your email is donald.duck@example.com',
//   'Hello, your role is admin'
// ]

//* Generics
// A generic type that takes a type T and creates a new type with a property
// whose name is a template literal based on the keys of T
type PropertyDescription<T> = {
  // For each key K in T (which must be a string), create a property
  // with key `${K}Description` and type string
  [K in keyof T as `${string & K}Description`]: string;
};

// Example type
type User = {
  name: string;
  age: number;
  active: boolean;
};

// Using the generic type with User
type UserDescriptions = PropertyDescription<User>;
// type UserDescriptions = {
//     nameDescription: string;
//     ageDescription: string;
//     activeDescription: string;
// }

// Example usage
const userDesc: UserDescriptions = {
  nameDescription: "The user's full name",
  ageDescription: "The user's age in years",
  activeDescription: "Whether the user is active or not",
};
console.log(userDesc);

type Linked<T> = {
  value: T;
  next?: Linked<T>;
};

const textLinked: Linked<string> = {
  value: "string",
  next: {
    value: "string2",
  },
};

const buildLink = <T>(value: T): Linked<T> => {
  return { value };
};

const test2 = buildLink("link");
console.log({ test2 });

const test3 = buildLink(3);
console.log({ test3 });

// Overload signatures
function add(a: string, b: string): string;
function add(a: number, b: number): number;

// Implementation signature
function add(a: any, b: any): any {
  return a + b;
}

console.log(add("Hello, ", "world!")); // returns "Hello, world!"
console.log(add(10, 20)); // returns 30

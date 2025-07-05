interface User {
  name: string;
  age: number;
  country: string;
  books: string[];
}

interface Book {
  name: string;
  price: number;
  title: string;
  pages: number;
}

interface ObjectI {
  [key: string]: string | number;
}

type Any = User | Book | ObjectI;

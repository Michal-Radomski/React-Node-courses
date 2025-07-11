interface ObjectI {
  [key: string]: string | number | ObjectI;
}

interface CustomError extends Error {
  aborted: boolean;
}

interface Quote {
  quote: string;
  author: string;
  id: string;
}

interface ObjectI {
  [key: string]: string | number | ObjectI;
}

interface CustomError extends Error {
  aborted: boolean;
}

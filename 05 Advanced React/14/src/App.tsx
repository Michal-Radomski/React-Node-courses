import React from "react";
import axios from "axios";

import "./App.scss";
import ShoppingCard from "./use_state/shopping-card";
import { BookI } from "./Interfaced";
import Loader from "./use_state/loader/loader";
import Book from "./use_state/books/book";
import Books from "./use_state/books/books";
// import { useUser } from "./useUser";
import { useUser2 } from "./useUser2";
import ShoppingCard2 from "./reducer/shopping-card";
import ColorsApp from "./app/ColorsApp";
import { ColorProvider } from "./app/context/context";
import Input from "./type_helper/input";
import Exercises from "./exercises/Exercises";

// eslint-disable-next-line react-refresh/only-export-components
export const fetchRandomBook = async (): Promise<BookI> => {
  const response = await axios.get(`/api/books/random`);
  return response.data;
};

// eslint-disable-next-line react-refresh/only-export-components
export const fetchBooks = async (count: number): Promise<BookI[]> => {
  const response = await axios.get(`/api/books?limit=${count}`);
  return response.data;
};

//* Custom hook
// const useUrl = (defaultUrl: string): readonly [string, React.Dispatch<React.SetStateAction<string>>] => {
//   const [url, setUrl] = React.useState(defaultUrl);

//   return [url, setUrl] as const;
// };

const useLocalStorage = <T,>(identifier: string) => {
  const set = (key: string, value: T) => {
    window.localStorage.setItem(key + identifier, JSON.stringify(value));
  };

  const get = (key: string): T | null => {
    return JSON.parse(window.localStorage.getItem(key + identifier) || "null");
  };
  return { set, get };
};

const App = (): JSX.Element => {
  const client = useLocalStorage<{ level: string }>("client");

  client.set("level", { level: "student" });

  const clientLevel = client.get("level");
  console.log({ clientLevel });

  // const state = useUser("https://jsonplaceholder.typicode.com/users/1");
  // console.log("state:", state);

  // const user = useUser2("https://jsonplaceholder.typicode.com/users/1");
  // console.log("user:", user);

  const [status, value] = useUser2("https://jsonplaceholder.typicode.com/users/1");
  console.log("value:", value);

  const [book, setBook] = React.useState<BookI | null>(null);
  // console.log("book:", book);
  // const [count, setCount] = React.useState<number>(4);
  const [books, setBooks] = React.useState<BookI[]>([]);

  const inputRef = React.useRef<HTMLInputElement>(null);

  // const [url] = useUrl("google.com");
  // console.log({ url });

  React.useEffect(() => {
    if (inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 500);
    }
  }, []);

  React.useEffect(() => {
    fetchRandomBook().then(setBook);
  }, []);

  if (!book) {
    return <Loader />;
  }

  if (status === "fetching") {
    return <div>Fetching...</div>;
  }

  if (status === "error") {
    return <div>Error: {value.message}</div>;
  }

  return (
    <React.Fragment>
      <Exercises />
      <br />
      <React.Fragment>
        <Input label="Name" value="Codelicks" onChange={() => {}} />
        <Input label="Name" />
        {/* <Input label="Name" value="Codelicks" />
      <Input label="Name" onChange={() => {}} /> */}
      </React.Fragment>
      <br />
      <ColorProvider>
        <ColorsApp />
      </ColorProvider>
      <br />
      <ShoppingCard2 />

      <input ref={inputRef} />
      <main className="w-full max-w-2xl py-16 mx-auto">
        <Books
          // count={count}
          // onChange={(e) => setCount(e.target.valueAsNumber)}
          // onSubmit={() => fetchBooks(count).then(setBooks)}
          setBooks={setBooks}
        >
          {books.map((book: BookI, index: number) => {
            return <Book title={book.title} author={book.author} key={index} />;
          })}
        </Books>

        <Book title={book.title} author={book.author} />
      </main>
      <ShoppingCard />
    </React.Fragment>
  );
};

export default App;

/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { useLoaderData, useAsyncValue, Await, defer } from "react-router";

import { MainHeading } from "./styled-elements";
import delay from "./delay";

const Books = (): JSX.Element => {
  const { bookCountPromise, authorsPromise } = useLoaderData() as { bookCountPromise: unknown; authorsPromise: unknown };

  return (
    <React.Fragment>
      <div>
        <MainHeading>Books</MainHeading>
        <div>
          <h1>Available Books:</h1>
          <React.Suspense fallback="Fetching...">
            <Await resolve={bookCountPromise}>{(data) => <strong>{data}</strong>}</Await>
          </React.Suspense>
        </div>
        <div>
          <h1>Authors:</h1>
          <React.Suspense fallback="Fetching...">
            <Await resolve={authorsPromise}>
              <Authors />
            </Await>
          </React.Suspense>
        </div>
      </div>
    </React.Fragment>
  );
};

const Authors = (): JSX.Element => {
  const authors = useAsyncValue() as string;
  console.log("authors:", authors);

  return (
    <React.Fragment>
      <strong>{authors}</strong>
    </React.Fragment>
  );
};

function loader() {
  const bookCountPromise = delay(10, 1000);
  const authorsPromise = delay("Codelicks", 2000);

  return defer({
    bookCountPromise,
    authorsPromise,
  });
}

export const booksRoute = { element: <Books />, loader };

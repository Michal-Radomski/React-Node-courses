import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Nav from "./nav";
import delay from "./delay";
import { booksRoute } from "./books";
import { loader } from "./main-loader";

const Club = React.lazy(() => delay(import("./club"), 1000));
const Main = React.lazy(() => delay(import("./main"), 1000));

const router = createBrowserRouter(
  [
    {
      element: <Nav />,
      children: [
        { index: true, loader: loader, element: <Main /> },
        { path: "/books", ...booksRoute },
        { path: "/club", element: <Club /> },
      ],
    },
  ],
  {}
);

const Wrapper = (): JSX.Element => {
  return (
    <React.Fragment>
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true,
        }}
      />
    </React.Fragment>
  );
};

export default Wrapper;

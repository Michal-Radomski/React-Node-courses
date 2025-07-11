import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.scss";
import FetchTopQuotes from "./components/top-quotes";
import UpdateQuotes from "./components/update-quotes";
import PaginatedQuotes from "./components/paginated-quotes";
import InfiniteScrollQuotes from "./components/infinite-scroll-quotes";

const queryClient = new QueryClient();

const App = (): JSX.Element => {
  return (
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <InfiniteScrollQuotes />

        <PaginatedQuotes />
        <UpdateQuotes />
        <FetchTopQuotes />
      </QueryClientProvider>
    </React.Fragment>
  );
};

export default App;

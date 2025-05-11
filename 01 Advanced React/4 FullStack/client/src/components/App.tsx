import React from "react";

import "../styles/App.scss";
import Header from "./Header";

const App = ({ children }: { children: JSX.Element }): JSX.Element => {
  return (
    <React.Fragment>
      <div className="container">
        <Header />
        {children}
      </div>
    </React.Fragment>
  );
};

export default App;

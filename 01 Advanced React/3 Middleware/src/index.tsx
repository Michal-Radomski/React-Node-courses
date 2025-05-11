import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

import App from "components/App";
import Root from "Root";

ReactDOM.render(
  <React.StrictMode>
    <Root>
      <Router>
        <Route path="/" component={App} />
      </Router>
    </Root>
  </React.StrictMode>,
  document.getElementById("root") as HTMLElement
);

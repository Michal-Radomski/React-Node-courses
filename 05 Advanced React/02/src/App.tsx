import React from "react";

import "./App.scss";

const App = (): JSX.Element => {
  React.useEffect(() => {
    fetch("/api/current-user")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return <React.Fragment>App</React.Fragment>;
};

export default App;

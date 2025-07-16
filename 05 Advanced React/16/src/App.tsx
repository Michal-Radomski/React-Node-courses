import React from "react";

import "./App.scss";
import ClassInfo from "./components/class-info/class-info";
import Dashboard from "./components/settings/settings";

const App = (): JSX.Element => {
  const [inputName, setInputName] = React.useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setInputName(event.target.value);
  };

  return (
    <React.Fragment>
      <main>
        <Dashboard inputName={inputName} handleChange={handleChange} />
        <ClassInfo name={"Mich"} />
      </main>
    </React.Fragment>
  );
};

export default App;

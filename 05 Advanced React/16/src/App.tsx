import React from "react";

import "./App.scss";
import ClassInfo from "./components/class-info/class-info";
import Dashboard from "./components/settings/settings";
import Card from "./components/button/card";
import { Button } from "./components/button/button";

const App = (): JSX.Element => {
  const [inputName, setInputName] = React.useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setInputName(event.target.value);
  };

  return (
    <React.Fragment>
      <Button children="Button" type={undefined} onClick={() => console.log("onClick")} />

      <main>
        <Card>
          Welcome to a custom component!
          <p>Inside, we can have various elements.</p>
          <Card>
            <h2>Another custom component within.</h2>
          </Card>
          <Card>
            <h2 className="mb-4">A nested custom component with multiple elements.</h2>
            <p>This is the second element.</p>
          </Card>
        </Card>
      </main>

      <main>
        <Dashboard inputName={inputName} handleChange={handleChange} />
        <ClassInfo name={"Mich"} />
      </main>
    </React.Fragment>
  );
};

export default App;

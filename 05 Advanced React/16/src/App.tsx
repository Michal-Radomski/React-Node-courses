import React from "react";

import "./App.scss";
import ClassInfo from "./components/class-info/class-info";
import Dashboard from "./components/settings/settings";
import Card from "./components/button/card";
import { Button } from "./components/button/button";
import Alert from "./components/alert";
import Alert2 from "./components/alert2";

const App = (): JSX.Element => {
  const [inputName, setInputName] = React.useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setInputName(event.target.value);
  };

  return (
    <React.Fragment>
      <div>
        <Alert2 variant="with-code" code="101" btnColor="crimson" />
        <Alert2 variant="no-code" btnColor="crimson" />
      </div>

      <div>
        <Alert variant="with-code" code="101" />
        <Alert variant="no-code" />
        <Alert variant="no-code" />
      </div>

      <Button children="Button" type={undefined} onClick={() => console.log("onClick")} />

      <main>
        <Card color="crimson">
          Welcome to a custom component!
          <p>Inside, we can have various elements.</p>
          <Card color="brown">
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

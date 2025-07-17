import React from "react";

import "./App.scss";
import ClassInfo from "./components/class-info/class-info";
import Dashboard from "./components/settings/settings";
import Card from "./components/button/card";
import { Button } from "./components/button/button";
import Alert from "./components/alert";
import Alert2 from "./components/alert2";
import Profile from "./components/profile";
import Input from "./components/input";
import Rows from "./components/rows";
import Button2 from "./components/button2";
import Label from "./components/label";
import Button3 from "./components/buttons";

const Component = (props: { data: Record<string, never> }): JSX.Element => {
  console.log("props:", props);

  return <div />;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BUTTON_TYPES = {
  0: "warning",
  1: "success",
  2: "error",
} as const;

type ButtonTypes = typeof BUTTON_TYPES;
// {
//   0: "warning",
//   1: "success",
//   2: "error",
// }

type TypesKeys = keyof ButtonTypes; //*  0 | 2 | 1
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type TypesValues = ButtonTypes[TypesKeys]; //* "warning" | "success" | "error"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Types = keyof typeof BUTTON_TYPES; //* 0 | 2 | 1

const App = (): JSX.Element => {
  const [inputName, setInputName] = React.useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setInputName(event.target.value);
  };

  return (
    <React.Fragment>
      <React.Fragment>
        <Button3 variant="reset"></Button3>
        <Button3 variant="submit"></Button3>
        <Button3 variant="skip"></Button3>
        {/* Error */}
        {/* <Button3 variant="blabla"></Button3> */}
      </React.Fragment>

      <Label space="l" />
      <Label space="x" />

      <React.Fragment>
        <Button2 variant="primary"></Button2>
        <Button2 variant="secondary"></Button2>
        <Button2 variant="tertiary"></Button2>
        <Button2 variant="danger"></Button2>
      </React.Fragment>

      <React.Fragment>
        <Rows
          renderRow={(index: number) => {
            return <div key={index}>{index}</div>;
          }}
        />
        <Rows
          renderRow={(index) => {
            return index;
          }}
        />
        <Rows
          renderRow={(index) => {
            console.log("index:", index);
            return null;
          }}
        />
      </React.Fragment>

      <React.Fragment>
        <Input label="Name" value="Codelicks" onChange={() => {}} />
        <Input label="Name" />
      </React.Fragment>
      <Component data={{}} />

      <div>
        <Profile showLinkedin linkedinId="test-lnk" />
        <Profile githubId="test-gth" />
        <Profile githubId="test-gth" />
        <Profile showLinkedin linkedinId="test-lnk" />
      </div>

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

import React from "react";

import "./App.scss";
import { UncontrolledForm } from "./components/uncontrolled-form";
import { ControlledForm } from "./components/controlled-form";
import { UncontrolledModal } from "./components/uncontrolled-modal";
import { ControlledModal } from "./components/controlled-modal";
import { UncontrolledFlow } from "./components/uncontrolled-flow";

const StepOne = ({ next }: { next?: () => void }): JSX.Element => {
  return (
    <React.Fragment>
      <h1>Step #1</h1>
      <button onClick={next}>Next</button>
    </React.Fragment>
  );
};
const StepTwo = ({ next }: { next?: () => void }): JSX.Element => {
  return (
    <React.Fragment>
      <h1>Step #2</h1>
      <button onClick={next}>Next</button>
    </React.Fragment>
  );
};
const StepThree = ({ next }: { next?: () => void }): JSX.Element => {
  return (
    <React.Fragment>
      <h1>Step #3</h1>
      <button onClick={next}>Next</button>
    </React.Fragment>
  );
};

const App = (): JSX.Element => {
  const [showModal, setShowModal] = React.useState<boolean>(false);

  return (
    <React.Fragment>
      <React.Fragment>
        <UncontrolledFlow>
          <StepOne />
          <StepTwo />
          <StepThree />
        </UncontrolledFlow>
      </React.Fragment>
      <br />
      <UncontrolledModal children={<div>Uncontrolled Modal</div>} />
      <br />
      <React.Fragment>
        <button onClick={() => setShowModal(!showModal)}>{showModal ? "Hide Modal" : "Show Modal"} </button>
        <ControlledModal shouldShow={showModal} close={() => setShowModal(false)}>
          <h1>I am the body of the modal!</h1>
        </ControlledModal>
      </React.Fragment>
      <br />
      <UncontrolledForm />
      <ControlledForm />
    </React.Fragment>
  );
};

export default App;

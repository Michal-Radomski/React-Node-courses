import React from "react";

import "./App.scss";
import { UncontrolledForm } from "./components/uncontrolled-form";
import { ControlledForm } from "./components/controlled-form";
import { UncontrolledModal } from "./components/uncontrolled-modal";
import { ControlledModal } from "./components/controlled-modal";
import { UncontrolledFlow } from "./components/uncontrolled-flow";
import { ControlledFlow } from "./components/controlled-flow";

const StepOne = ({ next }: { next?: (arg0: { [key: string]: string | number }) => void }): JSX.Element => {
  return (
    <React.Fragment>
      <h1>Step #1: Enter your name</h1>
      <button onClick={() => next!({ name: "TestName" })}>Next</button>
    </React.Fragment>
  );
};
const StepTwo = ({ next }: { next?: (arg0: { [key: string]: string | number }) => void }): JSX.Element => {
  return (
    <React.Fragment>
      <h1>Step #2: Enter your age</h1>
      <button onClick={() => next!({ age: 23 })}>Next</button>
    </React.Fragment>
  );
};
const StepThree = ({ next }: { next?: (arg0: { [key: string]: string | number }) => void }): JSX.Element => {
  return (
    <React.Fragment>
      <h1>Step #3: Enter your country</h1>
      <button onClick={() => next!({ country: "Poland" })}>Next</button>
    </React.Fragment>
  );
};

const App = (): JSX.Element => {
  const [showModal, setShowModal] = React.useState<boolean>(false);

  const [data, setData] = React.useState<{ [key: string]: string | number }>({});
  console.log("data:", data);
  const [currentStepIndex, setCurrentStepIndex] = React.useState<number>(0);

  const next = (dataFromStep: { [key: string]: string | number }) => {
    setData(dataFromStep);
    setCurrentStepIndex(currentStepIndex + 1);
  };

  return (
    <React.Fragment>
      <React.Fragment>
        <ControlledFlow currentStepIndex={currentStepIndex} onNext={next}>
          <StepOne />
          <StepTwo />
          <StepThree />
        </ControlledFlow>

        <br />

        <UncontrolledFlow
          onDone={(data) => {
            console.log("data:", data);
            alert("Onboarding Flow Done!");
          }}
        >
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

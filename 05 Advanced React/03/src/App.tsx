import React from "react";

import "./App.scss";
import { UncontrolledForm } from "./components/uncontrolled-form";
import { ControlledForm } from "./components/controlled-form";
import { UncontrolledModal } from "./components/uncontrolled-modal";
import { ControlledModal } from "./components/controlled-modal";

const App = (): JSX.Element => {
  const [showModal, setShowModal] = React.useState<boolean>(false);

  return (
    <React.Fragment>
      <UncontrolledModal children={<div>Uncontrolled Modal</div>} />

      <React.Fragment>
        <button onClick={() => setShowModal(!showModal)}>{showModal ? "Hide Modal" : "Show Modal"} </button>
        <ControlledModal shouldShow={showModal} close={() => setShowModal(false)}>
          <h1>I am the body of the modal!</h1>
        </ControlledModal>
      </React.Fragment>

      <UncontrolledForm />
      <ControlledForm />
    </React.Fragment>
  );
};

export default App;

import React from "react";
import { createPortal } from "react-dom";

import "./App.scss";
import { ErrorBoundary } from "./error-boundary";
import { Child } from "./child";

const App = (): JSX.Element => {
  const [show, setShow] = React.useState<boolean>(false);

  return (
    <React.Fragment>
      <React.Fragment>
        <h1>Parent Component</h1>
        <ErrorBoundary fallback={<h1>Error in child</h1>}>
          <Child />
        </ErrorBoundary>
      </React.Fragment>

      <div style={{ position: "absolute", marginTop: "200px" }}>
        <h1>Other Content</h1>
        <button onClick={() => setShow(true)}>Show Message</button>
        <Alert show={show} onClose={() => setShow(false)}>
          A sample message to show.
          <br />
          Click it to close.
        </Alert>
      </div>
    </React.Fragment>
  );
};

const Alert = ({
  children,
  onClose,
  show,
}: {
  children: React.ReactNode;
  onClose: () => void;
  show: boolean;
}): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!show) return null as any;

  return createPortal(
    <div className="alert" onClick={onClose}>
      {children}
    </div>,
    document.querySelector("#alert-holder") as HTMLDivElement
  );
};

export default App;

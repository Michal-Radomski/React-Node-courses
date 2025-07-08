import React from "react";
import { createPortal } from "react-dom";

import "./App.scss";
// import { ErrorBoundary } from "./error-boundary";
// import { Child } from "./child";
import Counter from "./counter";
import LayoutEffect from "./LayoutEffect";

const App = (): JSX.Element => {
  const [show, setShow] = React.useState<boolean>(false);
  const [changeShirts, setChangeShirts] = React.useState<boolean>(false);

  return (
    <React.Fragment>
      <LayoutEffect />

      <br />
      <br />
      <br />
      <br />

      <div>
        {changeShirts ? (
          <React.Fragment>
            {/* //* To differ the component */}
            <span>Shirts counts: </span> <Counter key="shirts" /> s
          </React.Fragment>
        ) : (
          <React.Fragment>
            {/* //* To differ the components */}
            <span>Shoes counts: </span> <Counter key="shoes" />
          </React.Fragment>
        )}
        <br />
        <button onClick={() => setChangeShirts((s) => !s)}>Switch</button>
      </div>

      {/* <React.Fragment>
        <h1>Parent Component</h1>
        <ErrorBoundary fallback={<h1>Error in child</h1>}>
          <Child />
        </ErrorBoundary>
      </React.Fragment> */}

      <div onClickCapture={() => console.log("outer div")} style={{ position: "absolute", marginTop: "200px" }}>
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
    <div
      className="alert"
      // onClick={onClose}
      onClickCapture={() => {
        onClose();
        console.log("inner div");
      }}
    >
      {children}
    </div>,
    document.querySelector("#alert-holder") as HTMLDivElement
  );
};

export default App;

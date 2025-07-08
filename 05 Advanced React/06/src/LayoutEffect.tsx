import React from "react";

const LayoutEffect = (): JSX.Element => {
  const [show, setShow] = React.useState<boolean>(false);
  const [top, setTop] = React.useState<number>(0);

  const buttonRef = React.useRef<HTMLButtonElement>(null);

  //* No move from 0 to bottom + 30!
  React.useLayoutEffect(() => {
    if (buttonRef.current === null || !show) {
      return setTop(0);
    }
    const { bottom } = buttonRef.current.getBoundingClientRect();
    console.log("bottom:", bottom);
    setTop(bottom + 30);
  }, [show]);

  const now = performance.now();
  while (now > performance.now() - 100) {
    //Do something
    console.log("test");
  }

  return (
    <React.Fragment>
      <button ref={buttonRef} onClick={() => setShow((s) => !s)}>
        Show
      </button>
      {show ? (
        <div
          className="tooltip-div"
          style={{
            top: `${top}px`,
          }}
        >
          Some text ...
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default LayoutEffect;

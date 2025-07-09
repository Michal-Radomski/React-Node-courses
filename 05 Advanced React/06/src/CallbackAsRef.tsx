import React from "react";

const CallbackAsRef = (): JSX.Element => {
  const [show, setShow] = React.useState<boolean>(false);

  const realInputRef = React.useRef<HTMLInputElement>(null);

  const inputRef: (input: HTMLInputElement) => void = React.useCallback((input: HTMLInputElement) => {
    // console.log("input:", input);
    (realInputRef.current as HTMLInputElement) = input;
    if (input === null) {
      return;
    }
    input.focus();
  }, []);

  return (
    <React.Fragment>
      <button onClick={() => setShow((s) => !s)}>Switch</button>
      {show ? <input type="text" ref={inputRef} /> : null}
    </React.Fragment>
  );
};

export default CallbackAsRef;

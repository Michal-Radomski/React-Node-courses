import React from "react";

export const UncontrolledForm = (): JSX.Element => {
  //* Better: React.useRef!
  const nameInputRef: React.RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();
  const ageInputRef: React.RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();
  // console.log("nameInputRef:", nameInputRef);

  const SubmitForm = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log(nameInputRef?.current?.value);
    console.log(ageInputRef?.current?.value);
  };

  return (
    <React.Fragment>
      <form onSubmit={SubmitForm}>
        <input name="name" type="text" placeholder="Name" ref={nameInputRef} />
        <input name="age" type="number" placeholder="Age" ref={ageInputRef} />
        <input type="submit" value="Submit" />
      </form>
    </React.Fragment>
  );
};

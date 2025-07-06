import React from "react";

export const UncontrolledForm = (): JSX.Element => {
  const nameInputRef = React.createRef<HTMLInputElement>();
  const ageInputRef = React.createRef<HTMLInputElement>();

  const SubmitForm = (e: React.FormEvent<HTMLFormElement>): void => {
    console.log(nameInputRef?.current?.value);
    console.log(ageInputRef?.current?.value);

    e.preventDefault();
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

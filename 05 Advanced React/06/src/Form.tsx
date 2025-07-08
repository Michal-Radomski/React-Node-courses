//* useId
import React from "react";

const Input = (): JSX.Element => {
  const [email, setEmail] = React.useState<string>("");

  const id: string = React.useId();
  console.log({ id });

  return (
    <React.Fragment>
      <div>
        <label htmlFor={`${id}-email`}>Email</label>
        <input id={`${id}-email`} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor={`${id}-name`}>Name</label>
        <input id={`${id}-name`} />
      </div>
    </React.Fragment>
  );
};

const Form = (): JSX.Element => {
  return (
    <React.Fragment>
      <Input />
      <p>
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its
        layout.
      </p>
      <Form />
    </React.Fragment>
  );
};

export default Form;

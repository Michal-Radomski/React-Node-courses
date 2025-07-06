import React from "react";

export const ControlledForm = (): JSX.Element => {
  const [error, setError] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [age, setAge] = React.useState<number>(0);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log({ name, age, error });
  };

  React.useEffect(() => {
    if (name.length < 1) {
      setError("The name can not be empty");
    } else {
      setError("");
    }
  }, [name]);

  return (
    <React.Fragment>
      <form onSubmit={onSubmit}>
        {error ? <p>{error}</p> : null}
        <input name="name" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input name="age" type="number" placeholder="Age" value={age} onChange={(e) => setAge(Number(e.target.value))} />
        <button>Submit</button>
      </form>
    </React.Fragment>
  );
};

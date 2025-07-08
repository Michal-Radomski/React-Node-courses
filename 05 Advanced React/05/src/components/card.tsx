import React from "react";

//* Compound Components Example
interface TestContext {
  test: string;
}

const Context = React.createContext({} as TestContext);

const Body = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <React.Fragment>
      <div style={{ padding: ".5rem" }}>{children}</div>
    </React.Fragment>
  );
};

const Header = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const { test } = React.useContext(Context);

  return (
    <React.Fragment>
      <div
        style={{
          borderBottom: "1px solid black",
          padding: ".5rem",
          marginBottom: ".5rem",
        }}
      >
        {children}
        {test}
      </div>
    </React.Fragment>
  );
};
const Footer = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <React.Fragment>
      <div
        style={{
          borderTop: "1px solid black",
          padding: ".5rem",
          marginTop: ".5rem",
        }}
      >
        {children}
      </div>
    </React.Fragment>
  );
};

const Card = ({ test, children }: { test: string; children: React.ReactNode }): JSX.Element => {
  return (
    <Context.Provider value={{ test }}>
      <div style={{ border: "1px solid black" }}>{children}</div>
    </Context.Provider>
  );
};

Card.Header = Header;
Card.Body = Body;
Card.Footer = Footer;

export default Card;

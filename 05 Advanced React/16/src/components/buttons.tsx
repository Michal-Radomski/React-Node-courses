import React from "react";

const buttonProps = {
  submit: {
    className: "submit-btn",
    type: "submit",
    // notAllowedProperty: "anything", //* Error
  },
  reset: {
    className: "reset-btn",
    type: "reset",
    // notAllowedProperty: "anything", //* Error
  },
  skip: {
    className: "skip-btn",
    type: "button",
    // notAllowedProperty: "anything", //* Error
  },
} satisfies Record<string, React.ComponentProps<"button">>;

type ButtonProps = {
  variant: keyof typeof buttonProps;
};

const Button3 = (props: ButtonProps): JSX.Element => {
  return (
    <React.Fragment>
      <button {...buttonProps[props.variant]}>Click me!</button>
    </React.Fragment>
  );
};

export default Button3;

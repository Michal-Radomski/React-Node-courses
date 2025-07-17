import React from "react";

const classNames = {
  primary: "primary-blue-500 color-white",
  secondary: "primary-black-200 color-white",
  tertiary: "primary-yellow-500 color-black",
  danger: "",
};

type ButtonProps = {
  // variant: "primary" | "secondary" | "tertiary";
  variant: keyof typeof classNames;
};

export const Button2 = (props: ButtonProps): JSX.Element => {
  return (
    <React.Fragment>
      <button className={classNames[props.variant]}>Click me!</button>
    </React.Fragment>
  );
};

export default Button2;

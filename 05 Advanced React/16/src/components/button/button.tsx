import React from "react";

type ButtonProps = React.ComponentPropsWithoutRef<"button">;

export const Button = ({ children, onClick, type }: ButtonProps): JSX.Element => {
  return (
    <React.Fragment>
      <button onClick={onClick} type={type}>
        {children}
      </button>
    </React.Fragment>
  );
};

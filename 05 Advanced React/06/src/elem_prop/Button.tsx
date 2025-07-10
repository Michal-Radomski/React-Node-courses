import React from "react";

import styles from "./button.module.css";

type ButtonProps = {
  As?: React.ElementType;
  size?: "s" | "m" | "l" | "xl";
  className?: string;
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<React.ElementType>;

const Button = ({ As = "button", size = "m", className = "", ...otherProps }: ButtonProps): JSX.Element => {
  return (
    <React.Fragment>
      <As {...otherProps} className={`${styles.button} ${styles[size]} ${className}`} />
    </React.Fragment>
  );
};

const style = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "1rem",
  alignItems: "center",
};

function ButtonWrapper(): JSX.Element {
  return (
    <React.Fragment>
      <div style={style}>
        <Button size="s">Small</Button>
        <Button size="m">Medium</Button>
        <Button size="l">Large</Button>
        <Button size="xl">xLarge</Button>
        <Button As="a" size="l" href="/">
          Link
        </Button>
      </div>
    </React.Fragment>
  );
}

export default ButtonWrapper;

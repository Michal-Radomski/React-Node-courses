import React from "react";

interface Props {
  size?: "large" | "small";
  color?: string;
  text: string;
}

const Button = ({ size, color, text, ...props }: Props): JSX.Element => {
  return (
    <React.Fragment>
      <button
        style={{
          fontSize: size === "large" ? "25px" : "16px",
          backgroundColor: color,
        }}
        {...props}
      >
        {text}
      </button>
    </React.Fragment>
  );
};

export const SmallButton = (props: Props): JSX.Element => {
  return <Button {...props} size={"small"} />;
};

export const SmallRedButton = (props: Props): JSX.Element => {
  return <SmallButton {...props} color={"crimson"} />;
};

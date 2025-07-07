import React from "react";

interface Props {
  size?: "large" | "small";
  color?: string;
  text?: string;
}

const partial = (Component: ({ size, color, text, ...props }: Props) => JSX.Element, partialProps: Props) => {
  return (props: JSX.IntrinsicAttributes & Props): JSX.Element => {
    // console.log("props:", props);
    return <Component {...partialProps} {...props} />;
  };
};

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

export const SmallButton2 = partial(Button, { size: "small", text: "text1" });

export const LargeRedButton2 = partial(Button, {
  size: "large",
  color: "blue",
  text: "text2",
});

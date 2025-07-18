import React from "react";

const spaces = {
  s: "0.5rem",
  m: "1rem",
  l: "2rem",
};

type Space = keyof typeof spaces;

type SpaceType = Space | (string & {});

const Label = (props: { space: SpaceType }): JSX.Element => {
  return (
    <React.Fragment>
      <div
        style={{
          marginTop: props.space in spaces ? spaces[props.space as Space] : props.space,
        }}
      >
        {props.space}
      </div>
    </React.Fragment>
  );
};

export default Label;

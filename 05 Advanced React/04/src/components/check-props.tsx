import React from "react";

export const checkProps = (Component: ({ user }: { user: User }) => JSX.Element) => {
  return (props: { user: User }): JSX.Element => {
    console.log("props:", props);

    return (
      <React.Fragment>
        <Component {...props} />
      </React.Fragment>
    );
  };
};

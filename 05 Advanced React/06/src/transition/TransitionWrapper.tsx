/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";

import Cover from "./cover";
import Reviews from "./reviews";
import Writer from "./writer";
import { StyledButton } from "./styled-elements";

const Button = ({ onClick, ...props }: { onClick: () => void }): JSX.Element => {
  // console.log("onClick:", onClick);

  //* startTransition is a function that you wrap around non-urgent state updates - doesn't freeze the app
  const [isPending, startTransition] = React.useTransition();
  // console.log("isPending:", isPending);

  return (
    <React.Fragment>
      {isPending ? (
        <div>Loading...</div>
      ) : (
        <StyledButton
          onClick={() => {
            startTransition(() => {
              onClick();
            });
          }}
          {...props}
        />
      )}
    </React.Fragment>
  );
};

const TransitionWrapper = (): JSX.Element => {
  const [section, setSection] = React.useState<string>("Cover");

  const sectionHandler = (sec: string) => {
    setSection(sec);
  };

  return (
    <React.Fragment>
      {/* @ts-expect-error */}
      <Button onClick={() => sectionHandler("Cover")}>Cover</Button>
      {/* @ts-expect-error */}
      <Button onClick={() => sectionHandler("Reviews")}>Book Reviews</Button>
      {/* @ts-expect-error */}
      <Button onClick={() => sectionHandler("Writer")}>Book's Writer</Button>

      {section === "Cover" ? <Cover /> : section === "Reviews" ? <Reviews /> : <Writer />}
    </React.Fragment>
  );
};

export default TransitionWrapper;

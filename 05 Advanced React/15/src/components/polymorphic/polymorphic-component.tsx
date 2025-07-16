import React from "react";

import Button from "./button";

const PolymorphicComponent = (): JSX.Element => {
  return (
    <React.Fragment>
      <div>
        <Button type="button">This is a button</Button>
        <Button as="a" href="https://google.com">
          This is a link
        </Button>
      </div>
    </React.Fragment>
  );
};
export default PolymorphicComponent;

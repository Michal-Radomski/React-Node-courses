import React from "react";

import Buttons from "./buttons";
import Display from "./display";
import { CartProvider } from "./cart-context";

const ContextWrapper = (): JSX.Element => {
  return (
    <React.Fragment>
      <CartProvider>
        <Display />
        <Buttons />
      </CartProvider>
    </React.Fragment>
  );
};

export default ContextWrapper;

import React from "react";

import { Layers } from "./LayersPattern";

const Form = (): JSX.Element => {
  return (
    <React.Fragment>
      <Layers $gutter="xl">
        <InputGroup htmlFor="firstName" label="First Name">
          <input type="text" id="firstName" />
        </InputGroup>
        <InputGroup htmlFor="lastName" label="Last Name">
          <input type="text" id="lastName" />
        </InputGroup>
        <InputGroup htmlFor="email" label="Email">
          <input type="text" id="email" />
        </InputGroup>
        <InputGroup htmlFor="address" label="Street Address">
          <input type="text" id="address" />
        </InputGroup>
        <InputGroup htmlFor="city" label="City">
          <input type="text" id="city" />
        </InputGroup>
        <InputGroup htmlFor="country" label="Country">
          <input type="text" id="country" />
        </InputGroup>
        <InputGroup htmlFor="phone" label="Phone Number">
          <input type="text" id="phone" />
        </InputGroup>
      </Layers>
    </React.Fragment>
  );
};

export const InputGroup = (props: { htmlFor: string; label: string; children: React.ReactNode }): JSX.Element => {
  return (
    <React.Fragment>
      <Layers $gutter="m">
        <label htmlFor={props.htmlFor}>{props.label}</label>
        {props.children}
      </Layers>
    </React.Fragment>
  );
};

export default Form;

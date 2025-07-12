import React from "react";
import styled from "styled-components";

//* Is it ok?
interface AdditionalProps {
  $size?: string;
  $margin?: string;
  $padding?: string;
}

interface ComputedAttrs extends AdditionalProps {
  $type: string;
}

// Define a styled input with attrs typed for props and computed attributes
const Input = styled.input.attrs<AdditionalProps, ComputedAttrs>((props) => ({
  $type: "text", // static attribute
  $margin: props.$size || "1em", // dynamic attribute based on props
  $padding: props.$size || "1em",
}))`
  color: palevioletred;
  font-size: 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;

  /* Use the computed attrs in CSS */
  margin: ${(props) => props.$margin};
  padding: ${(props) => props.$padding};
`;

const PasswordInput = styled.input.attrs({
  type: "password",
})``;

const AttrsExample = (): JSX.Element => {
  return (
    <React.Fragment>
      <Input placeholder="Default size" />
      <Input placeholder="Large size" $size="2em" />
      <PasswordInput placeholder="password" />
    </React.Fragment>
  );
};

export default AttrsExample;

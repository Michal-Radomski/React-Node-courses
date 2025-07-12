import React from "react";
import styled from "styled-components";

//* Is it ok? - Perplexity
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

//* Grok
// Define a type for the component's props
interface InputProps {
  $testId?: string; // Optional prop for dynamic data-test attribute
}

// Create a styled input with attrs
const StyledInput = styled.input.attrs<InputProps>(({ $testId }) => ({
  type: "text", // Static attribute
  placeholder: "Enter your name", // Static attribute
  "data-test": $testId || "input-default", // Dynamic attribute based on prop
}))`
  padding: 8px;
  border: 2px solid #007bff;
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #0056b3;
  }
`;

const AttrsExample = (): JSX.Element => {
  return (
    <React.Fragment>
      <Input placeholder="Default size" />
      <Input placeholder="Large size" $size="2em" />
      <PasswordInput placeholder="password" />
      <StyledInput $testId="name-input" />
      {/* Will use default data-test="input-default" */}
      <StyledInput />
    </React.Fragment>
  );
};

export default AttrsExample;

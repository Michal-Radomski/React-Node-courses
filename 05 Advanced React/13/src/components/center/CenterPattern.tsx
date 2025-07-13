import React from "react";
import { styled } from "styled-components";

import { Extras } from "./Components";
import { Layers } from "../LayersPattern";

export const Center = styled.div<{
  $maxWidth?: string;
  $centerChildren?: boolean;
  $centerText: boolean;
  $gutter?: string;
}>`
  box-sizing: content-box;
  margin-inline-start: auto;
  margin-inline-end: auto;

  max-inline-size: ${({ $maxWidth }) => $maxWidth};

  ${(props) => props.$centerText && "text-align: center;"}
  ${(props) =>
    props.$centerChildren &&
    `
  display: flex;
  flex-direction: column;
  align-items: center;
  `}
`;

const CenterPattern = (): JSX.Element => {
  return (
    <React.Fragment>
      <Center as={Layers} $gutter="xl" $centerChildren={true} $centerText={true} $maxWidth="60ch">
        <h2>I am title!</h2>
        <p>
          "This is a long long text , nibh lorem convenire quo et. Usu ea libris omittantur. Dicta theophrastus ad mei. Dicat
          appetere at vis, I am the end of text."
        </p>
        <Extras />
      </Center>
    </React.Fragment>
  );
};

export default CenterPattern;

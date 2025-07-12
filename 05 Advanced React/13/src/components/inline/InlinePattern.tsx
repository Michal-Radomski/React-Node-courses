import React from "react";
import styled, { css } from "styled-components";

import { InlineBundle } from "../InlineBundlePattern";
import { Button, Logo, MenuWrapper } from "./Components";

const responsive = css<{ $switchAt?: string }>`
  --switchAt: ${({ $switchAt }) => (typeof $switchAt === "string" ? $switchAt : `${$switchAt}px`)};

  flex-wrap: wrap;

  & > * {
    min-width: fit-content;
    flex-basis: calc((var(--switchAt) - (100% - var(--gutter))) * 999);
  }
`;

const stretchMap = {
  all: `> *  { flex: 1 }`,
  start: `> :first-child { flex: 1 }`,
  end: `> :last-child { flex: 1 }`,
};

export const Inline = styled(InlineBundle)<{ $stretch?: number; $switchAt?: string }>`
  flex-wrap: nowrap;
  ${({ $stretch }) => {
    if (typeof $stretch === "number") return `> :nth-child(${$stretch + 1}) { flex: 1 }`;

    return $stretch ? stretchMap?.[$stretch] : "";
  }}

  ${({ $switchAt }) => ($switchAt ? responsive : undefined)}
`;

const InlinePattern = (): JSX.Element => {
  return (
    <React.Fragment>
      <MenuWrapper>
        <Inline $stretch={1} $align="center" $switchAt="40rem">
          <div>
            <Logo />
          </div>
          <InlineBundle $gutter="m" $justify="center" $align="center">
            <span>Books</span>
            <span>Authors</span>
            <span>Deals</span>
            <span>About Us</span>
          </InlineBundle>
          <Inline $gutter="m" $align="center" $justify="end">
            <span>Login</span>
            <Button>Register</Button>
          </Inline>
        </Inline>
      </MenuWrapper>
    </React.Fragment>
  );
};

export default InlinePattern;

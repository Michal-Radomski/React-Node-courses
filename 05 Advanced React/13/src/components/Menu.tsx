import React from "react";
import styled from "styled-components";

import { spacingSchema } from "../common/spaces";
import { Split } from "./SplitPattern";

const Pad = styled.div<{ $padding: string }>`
  padding: ${(props) => {
    return ([] as string[])
      .concat(props.$padding)
      .map((padKey) => spacingSchema[padKey as keyof typeof spacingSchema])
      .join(" ");
  }};
`;

const Logo = styled.div`
  border-radius: 50%;
  background: linear-gradient(135deg, #ff2828, #d043ff);
`;

const MenuWrapper = styled(Pad)`
  border: 2px solid #f06292;
  border-radius: 0.5rem;
`;

const Menu = styled(Split)<{ $switchAt: string }>`
  > ${Logo} {
    inline-size: 3rem;
    max-inline-size: 3rem;
    block-size: 3rem;
  }
`;

const MenuBasis = (props: { children: React.ReactNode }): JSX.Element => (
  <React.Fragment>
    <MenuWrapper $padding="s">
      <Menu $gutter="l" $switchAt="35rem" $fraction="auto-start">
        <Logo />
        {props.children}
      </Menu>
    </MenuWrapper>
  </React.Fragment>
);

export default MenuBasis;

import React from "react";
import { styled } from "styled-components";

import { spacingSchema } from "../common/spaces";
import MenuBasis from "./Menu";

const justifyAlignMap = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
};

export const InlineBundle = styled.div<{ $gutter?: string; $justify?: string; $align?: string }>`
  --gutter: ${(props) => spacingSchema[props.$gutter as keyof typeof spacingSchema] ?? spacingSchema.l};
  display: flex;
  flex-wrap: wrap;
  gap: var(--gutter);

  justify-content: ${(props) => justifyAlignMap[props.$justify as keyof typeof justifyAlignMap] ?? justifyAlignMap.start};

  align-items: ${(props) => justifyAlignMap[props.$align as keyof typeof justifyAlignMap] ?? justifyAlignMap.start};
`;

const InlineBundlePattern = (): JSX.Element => {
  return (
    <React.Fragment>
      <MenuBasis>
        <InlineBundle $gutter="l" $justify="end" $align="center">
          <span>Product</span>
          <span>Features</span>
          <span>Marketplace</span>
          <span>Company</span>
          <span>Log in</span>
        </InlineBundle>
      </MenuBasis>
    </React.Fragment>
  );
};

export default InlineBundlePattern;

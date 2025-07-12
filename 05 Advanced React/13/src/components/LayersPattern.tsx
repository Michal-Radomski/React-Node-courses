import React from "react";
import { styled } from "styled-components";

import { spacingSchema } from "../common/spaces";

export const Layers = styled.div<{ $gutter?: string }>`
  display: grid;
  gap: ${(props) => spacingSchema[props?.$gutter as keyof typeof spacingSchema] ?? spacingSchema.l};
`;

const LayersPattern = (): JSX.Element => {
  return (
    <React.Fragment>
      <Layers $gutter="s">
        <Layers $gutter="s">
          <h2>Subscribe To Our Newsletter</h2>
          <p>Subscribe to our newsletter to keep up to date on all our amazing products.</p>
        </Layers>

        <Layers>
          <Layers $gutter="s">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" />
          </Layers>

          <Layers $gutter="s">
            <label htmlFor="email">Email</label>
            <input type="text" id="email" />
          </Layers>

          <button>Subscribe</button>
        </Layers>
      </Layers>
    </React.Fragment>
  );
};

export default LayersPattern;

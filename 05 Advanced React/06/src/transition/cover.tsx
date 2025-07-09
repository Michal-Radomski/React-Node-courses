import React from "react";
import { CoverContainer, Emoji } from "./styled-elements";

const Cover = (): JSX.Element => {
  return (
    <React.Fragment>
      <CoverContainer>
        <Emoji role="img" aria-label="Book Cover Emoji">
          📚
        </Emoji>
      </CoverContainer>
    </React.Fragment>
  );
};

export default Cover;

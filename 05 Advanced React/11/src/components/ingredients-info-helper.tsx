import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  width: 1.25rem;
  height: 1.25rem;
  border: 0;
  background-color: white;
  font-size: 20px;
  cursor: pointer;
`;

const IngredientsInfoHelper = (): JSX.Element => {
  console.log("IngredientsInfoHelper rendered");
  return (
    <React.Fragment>
      <StyledButton>📙</StyledButton>
    </React.Fragment>
  );
};

export default IngredientsInfoHelper;

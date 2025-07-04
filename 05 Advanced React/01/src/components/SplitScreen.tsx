import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

const Panel = styled.div<{ $flex: number }>`
  flex: ${(props) => props.$flex};
`;

export const SplitScreen = ({
  children,
  leftWidth = 1,
  rightWidth = 1,
}: {
  children: React.ReactNode[];
  leftWidth: number;
  rightWidth: number;
}): JSX.Element => {
  // Convert children to an array safely
  const childrenArray = React.Children.toArray(children);

  // Get left and right children or fallback to null
  const left = childrenArray[0] || null;
  const right = childrenArray[1] || null;

  return (
    <React.Fragment>
      <Container>
        <Panel $flex={leftWidth}>{left}</Panel>
        <Panel $flex={rightWidth}>{right}</Panel>
      </Container>
    </React.Fragment>
  );
};

export default SplitScreen;

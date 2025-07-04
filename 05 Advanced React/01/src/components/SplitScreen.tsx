import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

const Panel = styled.div<{ $flex: number }>`
  flex: ${(p) => p.$flex};
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
  const [left, right] = children;
  return (
    <Container>
      <Panel $flex={leftWidth}>{left}</Panel>
      <Panel $flex={rightWidth}>{right}</Panel>
    </Container>
  );
};

export default SplitScreen;

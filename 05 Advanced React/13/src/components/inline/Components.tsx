import styled from "styled-components";

import { spacingSchema } from "../../common/spaces";

const Pad = styled.div<{ $padding?: string | string[] }>`
  padding: ${(props) => {
    return ([] as string[])
      .concat(props?.$padding as string)
      .map((padKey) => spacingSchema[padKey as keyof typeof spacingSchema])
      .join(" ");
  }};
`;

interface LogoProps {
  $size?: string;
}

export const Logo = styled.div.attrs<LogoProps>(() => ({ $size: "3rem" }))`
  border-radius: 50%;
  background-color: #5e0000;
  inline-size: ${({ $size }) => $size};
  block-size: ${({ $size }) => $size};
`;

export const MenuWrapper = styled(Pad).attrs(() => ({ $padding: "m" }))`
  border: 1px solid black;
`;

export const Button = styled(Pad).attrs(() => {
  return {
    as: "button",
    $padding: ["m", "l"],
  };
})`
  background: #340025;
  color: white;
  border: none;
  border-radius: 0.25rem;
`;

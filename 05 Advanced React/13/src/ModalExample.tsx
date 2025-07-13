import React from "react";
import { styled } from "styled-components";

import registerImg from "./images/register.svg";
import closeImg from "./images/close.svg";
import { Layers } from "./components/LayersPattern";
import { Pad } from "./components/pad/PadPattern";
import { Center } from "./components/center/CenterPattern";
import { Inline } from "./components/inline/InlinePattern";
import { Cover } from "./components/cover/CoverPattern";

const ContentArea = styled(Layers).attrs(() => ({
  as: Pad,
  $padding: "l",
  $gutter: "s",
}))`
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);
  background-color: #ffffff;
`;

interface ImageProps {
  $maxWidth: string;
  $src: string;
  $alt: string;
}

const StyledImage = styled(Center).attrs<ImageProps>(() => ({
  as: "img",
}))`
  max-width: ${(props) => props.$maxWidth};
`;

interface TextProps {
  $fontSize: string;
}

const Text = styled(Center).attrs<TextProps>(() => ({
  as: "span",
}))`
  font-size: ${(props) => props.$fontSize};
`;

const Button = styled(Center).attrs(() => ({
  as: "button",
}))`
  border-radius: 5px;
  cursor: pointer;
  background-color: #03045e;
  color: white;
  border: 3px solid transparent;
  font-size: 18px;
`;

const NewModal = (): JSX.Element => {
  return (
    <React.Fragment>
      <Cover as={Center} $maxWidth="50rem">
        <ContentArea>
          <Inline $justify="end">
            <img src={closeImg} />
          </Inline>
          <StyledImage $maxWidth="30rem" $src={registerImg} $alt="" />
          <Layers $gutter="l">
            <Layers $gutter="s">
              <Text $fontSize="2rem">Register</Text>
              <Text $fontSize="1.2rem">Register and Unlock All The Features</Text>
            </Layers>
            <Button>
              <Pad $padding={["m", "xl"]}>Register</Pad>
            </Button>
          </Layers>
        </ContentArea>
      </Cover>

      <div>
        <img src={closeImg} />
        <img src={registerImg} />
        <span style={{ fontSize: "2rem" }}>Register</span>
        <button>Register</button>
      </div>
    </React.Fragment>
  );
};

export default NewModal;

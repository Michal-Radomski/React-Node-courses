//* Fix this!
import { text, select } from "@storybook/addon-knobs";

import "../lib/Utilities.css";
import spacing from "../spacing";
import Color from "../atoms/Color/Color";

export default {
  title: "Atoms/Color",
};

export const Common = () => <Color hexCode={text("HexCode", "pink")} />;

export const CustomDimensions = (): JSX.Element => (
  <Color
    hexCode={text("HexCode", "pink")}
    width={select("Width", Object.values(spacing), "xxl")}
    height={select("Height", Object.values(spacing), "xxl")}
  />
);

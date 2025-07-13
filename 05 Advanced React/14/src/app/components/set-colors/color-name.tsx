import React from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { colorNameList } from "color-name-list"; // Importing the color-name-list library

type ColorNameProps = {
  hexColor: string;
};

const ColorName = ({ hexColor }: ColorNameProps): JSX.Element => {
  // Searching for the color name that matches the given hexColor
  const color = colorNameList.find((color: { hex: string }) => {
    return color.hex === hexColor.toLowerCase();
  });

  // If color is not found, return null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!color) return null as any;

  // If color is found, display the color name with the color hex value
  return (
    <React.Fragment>
      <p className="info">
        Color Name: <span style={{ color: color.hex }}>{color.name}</span>
      </p>
    </React.Fragment>
  );
};

export default ColorName;

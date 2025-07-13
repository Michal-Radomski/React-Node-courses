import React from "react"; // Importing MouseEventHandler from React

import Button from "../common/button"; // Importing the Button component
import ColorChangeSwatch from "../common/color-change-swatch"; // Importing the ColorChangeSwatch component
import { ColorActions } from "../../reducer/color-reducer";

// Inline CSS styles for the container element
const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  justifyContent: "space-between",
  width: "50%",
};

type SavedColorProps = {
  name: string;
  hexColor: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onRemove?: () => void;
  dispatch: React.Dispatch<ColorActions>;
};

const SavedColor = ({ name, hexColor, onRemove, dispatch }: SavedColorProps): JSX.Element => {
  return (
    <React.Fragment>
      <article style={containerStyle}>
        {/* Button component to delete the saved color */}
        <Button variant="destructive" size="small" onClick={onRemove}>
          Delete
        </Button>
        {/* ColorChangeSwatch component to display the saved color */}
        <ColorChangeSwatch
          hexColor={hexColor}
          colorName={name}
          onClick={() => {
            dispatch({ type: "update-hex", payload: { hexColor } });
          }}
        />
      </article>
    </React.Fragment>
  );
};

export default SavedColor;

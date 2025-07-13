import React from "react"; // Importing PropsWithChildren and useState from React

import Button from "../common/button"; // Importing the Button component
import LabeledInput from "../common/labeled-input"; // Importing the LabeledInput component

// Inline CSS styles for the container element
const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
};

type AddSavedColorProps = {
  onSave: (color: string) => void;
};

const AddSavedColor = ({ onSave }: React.PropsWithChildren<AddSavedColorProps>): JSX.Element => {
  const [savedColorName, setSavedColorName] = React.useState<string>("");

  return (
    <React.Fragment>
      <form
        style={containerStyle}
        onSubmit={(e) => {
          e.preventDefault();
          onSave(savedColorName);
        }}
      >
        {/* LabeledInput component for inputting saved color name */}
        <LabeledInput label="Give it a name" value={savedColorName} onChange={(e) => setSavedColorName(e.target.value)} />
        {/* Button component to save the color */}
        <Button variant="primary" style={{ width: "50%" }}>
          Save
        </Button>
      </form>
    </React.Fragment>
  );
};

export default AddSavedColor;

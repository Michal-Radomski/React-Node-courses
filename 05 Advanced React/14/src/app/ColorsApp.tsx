import React from "react";

import "./App.scss";
import ColorSelect from "./components/color-selector";
import SetColors from "./components/set-colors";
import ColorGroups from "./components/color-group";
import SavedColors from "./components/saved-colors";
import { colorReducer, initState } from "./reducer/color-reducer";

function ColorsApp(): JSX.Element {
  const [{ hexColor }, dispatch] = React.useReducer(colorReducer, initState);

  return (
    <React.Fragment>
      <div className="grid">
        <ColorSelect
          hexColor={hexColor}
          onChange={(e) => dispatch({ type: "update-hex", payload: { hexColor: e.target.value } })}
        />
        <SetColors dispatch={dispatch} hexColor={hexColor} />
        <ColorGroups hexColor={hexColor} />
        <SavedColors hexColor={hexColor} dispatch={dispatch} />
      </div>
    </React.Fragment>
  );
}

export default ColorsApp;

import React from "react";

import { useMousePosition } from "./useMousePosition";

const TrackMouse = (): JSX.Element => {
  const position: {
    x: number;
    y: number;
  } = useMousePosition();

  return (
    <React.Fragment>
      <div>
        Last mouse position - x: {position.x}, y: {position.y}
      </div>
    </React.Fragment>
  );
};

export default TrackMouse;

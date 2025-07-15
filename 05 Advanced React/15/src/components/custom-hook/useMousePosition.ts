import React from "react";

import { getPosition } from "../get-pos";

export const useMousePosition = (): {
  x: number;
  y: number;
  onMouseMove: React.MouseEventHandler<Element>;
} => {
  const initialState = { x: 0, y: 0 };

  const [{ x, y }, setPosition] = React.useState<{ x: number; y: number }>(initialState);

  const updatePosition = React.useCallback<React.MouseEventHandler>(
    (event) => {
      const { x, y } = getPosition(event);
      setPosition({ x, y });
    },
    [setPosition]
  );

  return { x, y, onMouseMove: updatePosition };
};

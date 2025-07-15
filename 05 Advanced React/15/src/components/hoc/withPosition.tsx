import React from "react";

import { getPosition } from "../get-pos";
import type { DisplayMousePositionProps } from "./displayMousePosition";

const initialState = { x: 0, y: 0 };

const withMouseMove =
  <T extends object>(Component: React.ComponentType<DisplayMousePositionProps>) =>
  (props: Omit<T, keyof DisplayMousePositionProps>) => {
    const [{ x, y }, setPosition] = React.useState<{ x: number; y: number }>(initialState);

    const updatePosition = React.useCallback<React.MouseEventHandler>(
      (event) => {
        const { x, y } = getPosition(event);
        setPosition({ x, y });
      },
      [setPosition]
    );

    return <Component {...(props as T)} x={x} y={y} onMouseMove={updatePosition} />;
  };

export default withMouseMove;

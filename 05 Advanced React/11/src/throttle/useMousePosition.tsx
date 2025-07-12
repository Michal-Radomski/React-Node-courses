import React from "react";

import { throttle } from "./throttle";

export const useMousePosition = (options?: { throttleTime: number }) => {
  const throttleTime = options?.throttleTime || 500;

  const [position, setPosition] = React.useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  React.useEffect(() => {
    const onMouseMove = throttle((e: React.MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      setPosition({
        x,
        y,
      });
    }, throttleTime);

    window.addEventListener("mousemove", onMouseMove);

    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [throttleTime]);

  return position;
};

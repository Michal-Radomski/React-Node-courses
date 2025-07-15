import React from "react";

type RenderMousePositionProps = {
  children: (props: { x: number; y: number }) => React.ReactNode;
};

export const RenderMousePosition = ({ children }: RenderMousePositionProps): JSX.Element => {
  const [position, setPosition] = React.useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const updatePosition: React.MouseEventHandler = (event) => {
    setPosition({ x: event.clientX, y: event.clientY });
  };

  return (
    <React.Fragment>
      <div className="relative-container" onMouseMove={updatePosition}>
        {children({ x: position.x, y: position.y })}
      </div>
    </React.Fragment>
  );
};

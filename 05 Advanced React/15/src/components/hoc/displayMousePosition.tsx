import React from "react";

export type DisplayMousePositionProps = {
  x: number;
  y: number;
  onMouseMove: React.MouseEventHandler;
};

export const DisplayMousePosition = ({ x, y, onMouseMove }: DisplayMousePositionProps): JSX.Element => {
  return (
    <React.Fragment>
      <div className="relative-container" onMouseMove={onMouseMove}>
        <section className="absolute-section">
          <p>
            <span className="bold-span">X</span>: {x}
          </p>
          <p>
            <span className="bold-span">Y</span>: {y}
          </p>
        </section>
      </div>
    </React.Fragment>
  );
};

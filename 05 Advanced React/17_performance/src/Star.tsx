import React from "react";
import type { ComponentSize } from "@rehooks/component-size";

interface Props {
  Star: StarI;
  onDragStart: (dragOffset: { x: number; y: number }) => void;
  onDragEnd: () => void;
  onDoubleClick: () => void;
  boardSize?: ComponentSize;
}

const StarComponent = function StarComponent(props: Props): JSX.Element {
  const { Star, onDragStart, onDragEnd, onDoubleClick } = props;

  return (
    <React.Fragment>
      <div
        className="Star"
        onMouseDown={(ev) => {
          const clickOffset = {
            x: ev.clientX - parseFloat(ev.currentTarget.style.left),
            y: ev.clientY - parseFloat(ev.currentTarget.style.top),
          };
          onDragStart(clickOffset);
        }}
        onMouseUp={onDragEnd}
        onDoubleClick={onDoubleClick}
        style={{
          left: Star.position?.left,
          top: Star.position?.top,
        }}
        key={Star.id}
      >
        ⭐{Star.age}
      </div>
    </React.Fragment>
  );
};

const comparison = (prevProps: { Star: StarI }, nextProps: { Star: StarI }): boolean => {
  return (
    prevProps.Star.id === nextProps.Star.id &&
    prevProps.Star.position?.left === nextProps.Star.position?.left &&
    prevProps.Star.position?.top === nextProps.Star.position?.top
  );
};

export default React.memo(StarComponent, comparison);

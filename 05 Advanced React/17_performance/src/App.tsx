import React, { useRef, useState, useEffect, useCallback, lazy, Suspense } from "react";

import useComponentSize from "@rehooks/component-size";
import StarData from "./data.json";
import { v4 as uuidv4 } from "uuid";
import StarComponent from "./Star";
import { NewBtn } from "./NewBtn";
import { Info } from "./info";

const NewStarModal = lazy(() => import("./components/modal/NewStarModal"));

const ModalLoader = () => <div className="modal-loader">Loading...</div>;

function positionStars(Stars, width, height) {
  Object.values(Stars).forEach(
    (Star) =>
      (Star.position = {
        left: Star.offset.x + width * 0.5,
        top: Star.offset.y + height * 0.5,
      })
  );
}

function parseData() {
  const Stars = {};

  StarData.forEach((task) => {
    Stars[task.id] = task;
  });

  return Stars;
}

function addStar(Stars, age) {
  const id = uuidv4();

  return {
    ...Stars,
    [id]: {
      id,
      age,
      offset: {
        x: 0,
        y: 0,
      },
    },
  };
}

import "./App.scss";

const App = (): JSX.Element => {
  const [Stars, setStars] = useState({});
  const [dragStarInfo, setDragStarInfo] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const boardRef = useRef(null);
  const boardSize = useComponentSize(boardRef);
  const { height, width } = boardSize;

  //use useCallback hook to memoize a function
  const showDialog = useCallback(() => setIsAddOpen(true), []);

  useEffect(() => {
    if (height && width) {
      const parsedStars = parseData();
      positionStars(parsedStars, width, height);
      setStars({ ...parsedStars });
    }
  }, [height, width]);

  function handleDelete(Star) {
    const tempStars = { ...Stars };
    delete tempStars[Star.id];
    setStars(tempStars);
  }

  const StarEls = Object.values(Stars).map((Star) => (
    <StarComponent
      Star={Star}
      boardSize={boardSize}
      key={Star.id}
      onDragStart={(dragOffset) => setDragStarInfo({ Star, dragOffset })}
      onDragEnd={() => setDragStarInfo(null)}
      onDoubleClick={() => handleDelete(Star)}
    />
  ));

  return (
    <React.Fragment>
      <div
        className="App"
        ref={boardRef}
        onMouseMove={(ev) => {
          if (!dragStarInfo) {
            return;
          }

          const { Star, dragOffset } = dragStarInfo;

          let newStar = {};
          newStar.id = Star.id;
          newStar.age = Star.age;
          newStar.offset = Star.offset;
          newStar.position = {
            top: ev.pageY - dragOffset.y,
            left: ev.pageX - dragOffset.x,
          };

          Stars[newStar.id] = newStar;

          setStars({ ...Stars });
        }}
      >
        {StarEls}
        <Info Stars={Stars} />
        {/* change the onClick prop to a memoized prop */}
        <NewBtn onClick={showDialog} />
        {isAddOpen && (
          <Suspense fallback={<ModalLoader />}>
            <NewStarModal
              isOpen={isAddOpen}
              onClose={() => setIsAddOpen(false)}
              onAdd={(StarText) => {
                addStar(Stars, StarText);
                positionStars(Stars, width, height);
                setStars(Stars);
              }}
            />
          </Suspense>
        )}
      </div>
    </React.Fragment>
  );
};

export default App;

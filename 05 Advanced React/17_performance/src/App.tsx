import React from "react";
import useComponentSize, { type ComponentSize } from "@rehooks/component-size";
import { v4 as uuidv4 } from "uuid";

import StarData from "./data.json";
import StarComponent from "./Star";
import { NewBtn } from "./NewBtn";
import { Info } from "./info";
import "./App.scss";

const NewStarModal = React.lazy(() => import("./components/modal/NewStarModal"));

const ModalLoader = (): JSX.Element => <div className="modal-loader">Loading...</div>;

function positionStars(Stars: { [key: string]: StarI }, width: number, height: number): void {
  Object.values(Stars).forEach(
    (Star) =>
      (Star.position = {
        left: Star.offset.x + width * 0.5,
        top: Star.offset.y + height * 0.5,
      })
  );
}

function parseData(): { [key: string]: StarI } {
  const Stars = {} as { [key: string]: StarI };

  StarData.forEach((task) => {
    Stars[task.id] = task;
  });

  return Stars;
}

function addStar(Stars: { [key: string]: StarI }, age: string) {
  const id: string = uuidv4();

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

const App = (): JSX.Element => {
  const [Stars, setStars] = React.useState<{ [key: string]: StarI }>({});
  const [dragStarInfo, setDragStarInfo] = React.useState<{ Star: StarI; dragOffset: { x: number; y: number } } | null>(null);
  const [isAddOpen, setIsAddOpen] = React.useState<boolean>(false);

  const boardRef = React.useRef<HTMLDivElement>(null);
  const boardSize: ComponentSize = useComponentSize(boardRef);
  const { height, width } = boardSize;

  //use useCallback hook to memoize a function
  const showDialog: () => void = React.useCallback(() => setIsAddOpen(true), []);

  React.useEffect(() => {
    if (height && width) {
      const parsedStars: { [key: string]: StarI } = parseData();
      positionStars(parsedStars, width, height);
      setStars({ ...parsedStars });
    }
  }, [height, width]);

  function handleDelete(Star: StarI): void {
    const tempStars = { ...Stars };
    delete tempStars[Star.id];
    setStars(tempStars);
  }

  const StarEls: JSX.Element[] = Object.values(Stars).map((Star: StarI) => (
    <StarComponent
      Star={Star as StarI}
      boardSize={boardSize}
      key={Star.id}
      onDragStart={(dragOffset: { x: number; y: number }) => setDragStarInfo({ Star, dragOffset })}
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

          const newStar = {} as StarI;
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

        {/* //* Change the onClick prop to a memoized prop */}
        <NewBtn onClick={showDialog} />
        {isAddOpen ? (
          <React.Suspense fallback={<ModalLoader />}>
            <NewStarModal
              isOpen={isAddOpen}
              onClose={() => setIsAddOpen(false)}
              onAdd={(StarText: string) => {
                addStar(Stars, StarText);
                positionStars(Stars, width, height);
                setStars(Stars);
              }}
            />
          </React.Suspense>
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default App;

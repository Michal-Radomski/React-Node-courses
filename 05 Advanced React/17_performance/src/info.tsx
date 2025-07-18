import React from "react";

import { randomExpensiveOperation } from "./utils/expensive-operation";

export const Info = React.memo(
  function Info(props: { Stars: { [key: string]: StarI } }): JSX.Element {
    const [expanded, setExpanded] = React.useState<boolean>(false);

    const Stars: StarI[] = Object.values(props.Stars);

    const distances = React.useMemo(() => {
      const distancesCalc = { max: 0, min: 1000 };

      Stars.forEach((currentStar: StarI) => {
        randomExpensiveOperation();

        Stars.forEach((compareStar) => {
          if (compareStar === currentStar) {
            return;
          }

          distancesCalc.max = Math.max(distancesCalc.max, Math.max(Number(currentStar.age), Number(compareStar.age)));
          distancesCalc.min = Math.min(distancesCalc.min, Math.min(Number(currentStar.age), Number(compareStar.age)));
        });
      });
      return distancesCalc;
    }, [Stars]);

    const expandHandler = (): void => setExpanded(!expanded);

    return (
      <React.Fragment>
        <div className={expanded ? "bar" : "board"}>
          <div>You have {Object.keys(props.Stars).length} stars!</div>
          <div>Age of the oldest star: {distances.max}</div>
          <div>Age of the youngest star: {distances.min}</div>
          <span className="expand" onClick={expandHandler}>
            ◤ ◥
          </span>
        </div>
      </React.Fragment>
    );
  },

  (prevProps, nextProps) => {
    return Object.keys(prevProps.Stars).length === Object.keys(nextProps.Stars).length;
  }
);

import React from "react";

import { ReviewsContainer } from "./styled-elements";

const Reviews = (): JSX.Element => {
  return (
    <React.Fragment>
      <ReviewsContainer>
        <ul>
          {Array(300)
            .fill("")
            .map((_: number, i: number) => (
              <Review key={i} index={i} />
            ))}
        </ul>
      </ReviewsContainer>
    </React.Fragment>
  );
};

const Review = ({ index }: { index: number }): JSX.Element => {
  const init = performance.now();

  while (init > performance.now() - 3) {
    // Fake slow down.
  }

  return (
    <React.Fragment>
      <li>Review #{index}</li>
    </React.Fragment>
  );
};

export default Reviews;

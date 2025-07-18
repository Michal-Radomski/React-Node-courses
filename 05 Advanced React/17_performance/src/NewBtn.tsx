import React from "react";

// Use React.memo() to only render if the ref. of props change (equivalent of React.PureComponent)
export const NewBtn = React.memo(function NewBtn({ onClick }: { onClick: () => void }): JSX.Element {
  return (
    <React.Fragment>
      <button className="new-star" onClick={onClick}>
        ⭐
      </button>
    </React.Fragment>
  );
});

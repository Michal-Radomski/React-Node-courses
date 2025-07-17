import React from "react";

interface RowsProps {
  // renderRow: (index: number) => React.ReactNode;
  renderRow: React.FC<number>;
}

const Rows = (props: RowsProps): JSX.Element => {
  return (
    <React.Fragment>
      <div>{[0, 1, 2].map(props.renderRow)}</div>
    </React.Fragment>
  );
};

export default Rows;

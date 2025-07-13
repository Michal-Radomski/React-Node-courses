import React from "react";

import "./style.scss";

const Loader = (): JSX.Element => {
  return (
    <React.Fragment>
      <div className="loader">
        <p>Loading…</p>
      </div>
    </React.Fragment>
  );
};

export default Loader;

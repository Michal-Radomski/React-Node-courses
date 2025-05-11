import React from "react";

import RequireAuth from "./RequireAuth";

class Feature extends React.Component {
  render() {
    return <div>This is the feature!</div>;
  }
}

export default RequireAuth(Feature);

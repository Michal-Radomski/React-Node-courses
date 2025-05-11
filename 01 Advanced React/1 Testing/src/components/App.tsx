import React from "react";

import "../App.scss";
import CommentBox from "components/CommentBox";
import CommentList from "components/CommentList";

function App(): JSX.Element {
  return (
    <React.Fragment>
      {/* //* First test */}
      {/* <div>Hi there!</div> */}
      <div>
        <CommentBox />
        <CommentList />
      </div>
    </React.Fragment>
  );
}

export default App;

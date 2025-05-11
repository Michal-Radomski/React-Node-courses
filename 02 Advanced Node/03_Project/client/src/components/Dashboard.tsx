import React from "react";
import { Link } from "react-router-dom";

import BlogList from "./blogs/BlogList";

const Dashboard = (): JSX.Element => {
  return (
    <React.Fragment>
      <div>
        <BlogList />
        <div className="fixed-action-btn">
          <Link to="/blogs/new" className="btn-floating btn-large red">
            <i className="material-icons">add</i>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;

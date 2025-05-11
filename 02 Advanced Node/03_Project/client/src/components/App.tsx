import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import "materialize-css/dist/css/materialize.min.css";

import * as actions from "../actions";
import "../App.scss";
import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import BlogNew from "./blogs/BlogNew";
import BlogShow from "./blogs/BlogShow";

class App extends React.Component<{ fetchUser: () => void }, {}> {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <Router>
          <div>
            <Header />
            <Switch>
              <Route path="/blogs/new" component={BlogNew} />
              <Route exact path="/blogs/:_id" component={BlogShow} />
              <Route path="/blogs" component={Dashboard} />
              <Route path="/" component={Landing} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default connect(null, actions)(App);

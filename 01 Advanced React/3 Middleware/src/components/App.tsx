import React from "react";
import { Link, Route } from "react-router-dom";
import { connect } from "react-redux";

import "../App.scss";
import CommentBox from "components/CommentBox";
import CommentList from "components/CommentList";
import * as actions from "actions";

class App extends React.Component<{ auth: boolean; changeAuth: (arg0: boolean) => void }, {}> {
  renderButton(): JSX.Element {
    if (this.props.auth) {
      return <button onClick={() => this.props.changeAuth(false)}>Sign Out</button>;
    } else {
      return <button onClick={() => this.props.changeAuth(true)}>Sign In</button>;
    }
  }

  renderHeader(): JSX.Element {
    return (
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/post">Post a Comment</Link>
        </li>
        <li>{this.renderButton()}</li>
      </ul>
    );
  }

  render() {
    return (
      <React.Fragment>
        <div>
          {this.renderHeader()}
          <Route path="/post" component={CommentBox} />
          <Route path="/" exact={true} component={CommentList} />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, actions)(App);

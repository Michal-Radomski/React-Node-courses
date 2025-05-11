import React from "react";
import { History } from "history";
import { connect } from "react-redux";

interface Props {
  auth: boolean;
  history: History;
}

const RequireAuth = (ChildComponent: React.ComponentType) => {
  // console.log("ChildComponent:", ChildComponent, typeof ChildComponent);

  class ComposedComponent extends React.Component<Props | any, {}> {
    //* Component just got rendered
    componentDidMount() {
      // console.log(this.props.history);
      this.shouldNavigateAway();
    }

    //* Component just got updated (got new props)
    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    shouldNavigateAway() {
      if (!this.props.auth) {
        // console.log("I need to leave");
        this.props.history.push("/");
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }
  const mapStateToProps = (state: RootState) => {
    return { auth: state.auth };
  };

  return connect(mapStateToProps, null)(ComposedComponent);
};

export default RequireAuth;

import React from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import { History } from "history";

import * as actions from "../../actions/index";

interface Props {
  history: History;
  errorMessage: string;
  handleSubmit: Function;
  signin: (arg0: { email: string; password: string }, arg1: () => void) => void;
}

class SignIn extends React.Component<Props, RootState> {
  onSubmit = (formProps: { email: string; password: string }) => {
    // console.log("formProps:", formProps);
    this.props.signin(formProps, () => {
      this.props.history.push("/feature");
    });
  };

  render() {
    const { handleSubmit } = this.props;
    // console.log(this, this.props, this.props.handleSubmit);
    // console.log({handleSubmit});
    return (
      <React.Fragment>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <fieldset>
            <label>Email</label>
            <Field name="email" type="text" component="input" autoComplete="none" />
          </fieldset>
          <fieldset>
            <label>Password</label>
            <Field name="password" type="password" component="input" autoComplete="none" />
          </fieldset>
          <div style={{ color: "red" }}>{this.props.errorMessage}</div>
          <button>Sign In!</button>
        </form>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state: RootState) {
  return { errorMessage: state.auth.errorMessage };
}

export default compose(connect(mapStateToProps, actions), reduxForm({ form: "signin" }))(SignIn);

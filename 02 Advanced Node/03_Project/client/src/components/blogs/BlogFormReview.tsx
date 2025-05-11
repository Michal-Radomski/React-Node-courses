// BlogFormReview shows users their form inputs for review
import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import formFields from "./formFields";
import * as actions from "../../actions";

class BlogFormReview extends React.Component<
  { formValues: { name: string; label: string }; onCancel: any; history: any; submitBlog: any },
  {}
> {
  renderFields() {
    const { formValues } = this.props;

    return _.map(formFields, ({ name, label }) => {
      return (
        <div key={name}>
          <label>{label}</label>
          <div>{formValues[name as keyof typeof formValues]}</div>
        </div>
      );
    });
  }

  state = { file: null };

  renderButtons() {
    const { onCancel } = this.props;

    return (
      <div>
        <button className="yellow darken-3 white-text btn-flat" onClick={onCancel}>
          Back
        </button>
        <button className="green btn-flat right white-text">
          Save Blog
          <i className="material-icons right">email</i>
        </button>
      </div>
    );
  }

  onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { submitBlog, history, formValues } = this.props;
    submitBlog(formValues, this.state.file, history);
  }

  onFileChange(event: React.FormEvent<HTMLInputElement>) {
    // console.log("(event.target as HTMLInputElement).files!:", (event.target as HTMLInputElement).files!);
    this.setState({ file: (event.target as HTMLInputElement).files![0] });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <h5>Please confirm your entries</h5>
        {this.renderFields()}

        <h5>Add An Image</h5>
        <input onChange={this.onFileChange.bind(this)} type="file" accept="image/jpg" multiple={false} />

        <br />
        <br />
        {this.renderButtons()}
      </form>
    );
  }
}

function mapStateToProps(state: RootState) {
  return { formValues: state.form.blogForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(BlogFormReview as any) as any);

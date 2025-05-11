// BlogForm shows a form for a user to add input
import React from "react";
import _ from "lodash";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";

import BlogField from "./BlogField";
import formFields from "./formFields";

class BlogForm extends React.Component<
  { onBlogSubmit: any; handleSubmit: (arg0: any) => React.FormEventHandler<HTMLFormElement> },
  {}
> {
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      return <Field key={name} component={BlogField} type="text" label={label} name={name} />;
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onBlogSubmit)}>
          {this.renderFields()}
          <Link to="/blogs" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values: { label: string; name: string }) {
  const errors = {} as any;

  _.each(formFields, ({ name }) => {
    if (!values[name as keyof typeof values]) {
      errors[name] = "You must provide a value";
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: "blogForm",
  destroyOnUnmount: false,
})(BlogForm as any);

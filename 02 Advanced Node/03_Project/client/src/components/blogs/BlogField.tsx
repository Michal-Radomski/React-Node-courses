import React from "react";

const BlogField = ({
  input,
  label,
  meta: { error, touched },
}: {
  input: { name: string };
  label: string;
  meta: { error: string; touched: string };
}): JSX.Element => {
  return (
    <React.Fragment>
      <div className={input.name}>
        <label>{label}</label>
        <input {...input} style={{ marginBottom: "5px" }} />
        <div className="red-text" style={{ marginBottom: "20px" }}>
          {touched && error}
        </div>
      </div>
    </React.Fragment>
  );
};

export default BlogField;

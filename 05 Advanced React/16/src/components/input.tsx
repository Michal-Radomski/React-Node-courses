import React from "react";

type InputProps = (
  | {
      value: string;
      onChange: React.ChangeEventHandler;
    }
  | {
      value?: undefined;
      onChange?: undefined;
    }
) & {
  label: string;
};

const Input = ({ label, ...props }: InputProps): JSX.Element => {
  return (
    <React.Fragment>
      <div>
        <label>
          {label}
          <input {...props} />
        </label>
      </div>
    </React.Fragment>
  );
};

export default Input;

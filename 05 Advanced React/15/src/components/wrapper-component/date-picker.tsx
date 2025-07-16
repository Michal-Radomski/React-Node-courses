/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePicker = (props: { value: string; onChange: (date: Date) => void; label: string }): JSX.Element => {
  console.log(props);

  const { label, ...otherProps } = props;

  return (
    <React.Fragment>
      <div>
        {label ? <label>{label}</label> : null}
        <div>
          <ReactDatePicker {...(otherProps as any)} />
        </div>
      </div>
    </React.Fragment>
  );
};
export default DatePicker;

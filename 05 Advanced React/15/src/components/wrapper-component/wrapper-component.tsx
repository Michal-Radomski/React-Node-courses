import React from "react";

import DatePicker from "./date-picker";

const WrapperComponent = (): JSX.Element => {
  const [date, setDate] = React.useState<Date>();

  return (
    <React.Fragment>
      <DatePicker
        label="Select the Payment Date"
        value={date?.toString() as string}
        onChange={(date: Date) => date && setDate(date)}
      />
    </React.Fragment>
  );
};
export default WrapperComponent;

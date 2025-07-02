import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { vitest } from "vitest";

import Select from "../molecules/Select";

const options = [
  {
    label: "Strict Black",
    value: "strict-black",
  },
  {
    label: "Heavenly Green",
    value: "heavenly-green",
  },
  {
    label: "Sweet Pink",
    value: "pink",
  },
];

test("renders all options passed to it", (): void => {
  const { getAllByRole, getByTestId } = render(<Select options={options} />);

  fireEvent.click(getByTestId("DseSelectButton"));

  expect(getAllByRole("menuitemradio")).toHaveLength(options.length);
});

test("renders options using custom renderOption method if passed as prop", (): void => {
  const { getAllByTestId, getByTestId } = render(
    <Select
      options={options}
      renderOption={({ option, getOptionRecommendedProps }) => {
        return (
          <li data-testid="CustomRenderOption" {...getOptionRecommendedProps()}>
            {option.label}
          </li>
        );
      }}
    />
  );

  fireEvent.click(getByTestId("DseSelectButton"));

  expect(getAllByTestId("CustomRenderOption")).toHaveLength(options.length);
});

test("calls the onOptionSelected prop with the selected option and its index if passed", (): void => {
  const onOptionSelected = vitest.fn();
  const { getAllByRole, getByTestId } = render(<Select options={options} onOptionSelected={onOptionSelected} />);

  fireEvent.click(getByTestId("DseSelectButton"));

  fireEvent.click(getAllByRole("menuitemradio")[0]);

  expect(onOptionSelected).toHaveBeenCalledWith(options[0], 0);
});

test("the button label changes to the selected option label", (): void => {
  const { getAllByRole, getByTestId } = render(<Select options={options} />);

  fireEvent.click(getByTestId("DseSelectButton"));

  fireEvent.click(getAllByRole("menuitemradio")[0]);

  expect(getByTestId("DseSelectButton")).toHaveTextContent(options[0].label);
});

test("snapshot of the selected option state", (): void => {
  const { getAllByRole, getByTestId, asFragment } = render(<Select options={options} />);

  fireEvent.click(getByTestId("DseSelectButton"));

  fireEvent.click(getAllByRole("menuitemradio")[0]);

  expect(asFragment()).toMatchSnapshot();
});

test("snapshot of the base state", (): void => {
  const { asFragment } = render(<Select options={options} />);

  expect(asFragment()).toMatchSnapshot();
});

test("snapshot of the options menu open state", (): void => {
  const { getByTestId, asFragment } = render(<Select options={options} />);

  fireEvent.click(getByTestId("DseSelectButton"));

  expect(asFragment()).toMatchSnapshot();
});

test("can customize select label", (): void => {
  const { getByText } = render(<Select options={options} label="THIS IS A CUSTOM LABEL" />);

  expect(getByText(/THIS IS A CUSTOM LABEL/)).toBeInTheDocument();
});

//* Fix this!
import "../lib/Select.css";
import Select from "../molecules/Select";

const options = [
  {
    label: "Strict Black",
    value: "black",
  },
  {
    label: "Heavenly Green",
    value: "green",
  },
  {
    label: "Sweet Pink",
    value: "pink",
  },
];

export default {
  title: "Molecules/Select",
};

export const Common = () => <Select options={options} />;

export const RenderOption = () => (
  <Select
    options={options}
    renderOption={({ getOptionRecommendedProps, option, isSelected }) => (
      <span {...getOptionRecommendedProps()}>
        {option.label} {isSelected ? "SELECTED !" : ""}
      </span>
    )}
  />
);

export const CustomLabel = () => <Select label="Select a color" options={options} />;

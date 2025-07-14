import { ChangeEventHandler } from "react";

type TightProps<T> = T | OptionalUndefined<T>;

type OptionalUndefined<T> = Partial<Record<keyof T, undefined>>;

type InputProps = TightProps<{
  value: string;
  onChange: ChangeEventHandler;
}> & {
  label: string;
};

const Input = ({ label, ...props }: InputProps): JSX.Element => {
  return (
    <div>
      <label>
        {label}
        <input {...props} />
      </label>
    </div>
  );
};

export default Input;

type AlertProps =
  | {
      variant: "no-code";
    }
  | {
      variant: "with-code";
      code: string;
    };

const Alert = (props: AlertProps): JSX.Element => {
  if (props.variant === "no-code") {
    return <div>No code </div>;
  } else {
    const { code } = props;
    return <div>Alert Code: {code}</div>;
  }
};

export default Alert;

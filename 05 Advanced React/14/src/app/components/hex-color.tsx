import "./style.scss";

type HexColorProps = {
  hexColor: string;
};

const HexColor = ({ hexColor }: HexColorProps): JSX.Element => {
  return <section className="semibold info">{hexColor}</section>;
};

export default HexColor;

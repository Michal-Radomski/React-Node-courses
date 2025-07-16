import React from "react";

import "./style.scss";

type CardProps = { color?: "crimson" | "blue" | "brown" };

const Card = ({ children, color = "blue" }: React.PropsWithChildren<CardProps>): JSX.Element => {
  return (
    <React.Fragment>
      <section className="m-4 card-container" style={{ color }}>
        {children}
      </section>
    </React.Fragment>
  );
};

export default Card;

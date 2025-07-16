import React from "react";

import "./style.scss";

type ClassInfoProps = { name: string; course?: string };

const ClassInfo = ({ name, course = "Advanced Typescript in React" }: ClassInfoProps): JSX.Element => {
  return (
    <React.Fragment>
      <section className="custom-info">
        <header className="custom-info-header">
          <h2 className="custom-info-title">CodeLicks Academy</h2>
          <p className="custom-info-subtitle">{course}</p>
        </header>
        <div className="custom-info-body">
          <h2 className="custom-info-subtitle">Instructor</h2>
          <p className="custom-info-name">{name}</p>
        </div>
        <footer className="custom-info-footer"></footer>
      </section>
    </React.Fragment>
  );
};

export default ClassInfo;

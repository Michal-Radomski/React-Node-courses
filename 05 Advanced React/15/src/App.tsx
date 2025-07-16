import React from "react";

import "./App.scss";
// import withMouseMove from "./components/hoc/withPosition";
// import { DisplayMousePosition } from "./components/hoc/displayMousePosition";
// import { RenderMousePosition } from "./components/render-props/RenderMouse";
import { useMousePosition } from "./components/custom-hook/useMousePosition";
import RenderPropsComponent from "./RenderPropsComponent";
import { Button } from "./components/button";
import TextPan from "./components/TextPan";
import DisplayBooks from "./components/render-props2/display-books";
import WrapperComponent from "./components/wrapper-component/wrapper-component";
import PolymorphicComponent from "./components/polymorphic/polymorphic-component";
// import MousePosition from "./components/position";

// const DisplayMousePos = ({ x, y }: { x: number; y: number }): JSX.Element => (
//   <React.Fragment>
//     <section className="absolute-section">
//       <p>
//         <span className="bold-span">X</span>: {x}
//       </p>
//       <p>
//         <span className="bold-span">Y</span>: {y}
//       </p>
//     </section>
//   </React.Fragment>
// );

const App = (): JSX.Element => {
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const dummyText: string =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit diam ac odio iaculis, ut volutpat odio ullamcorper. Nulla bibendum malesuada elit, nec gravida urna tincidunt eu. Nulla id tincidunt ligula. Curabitur eget odio ut nisi ullamcorper cursus eu at tortor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nullam a fringilla nulla. Vivamus et convallis libero. Cras id augue eu velit mattis fringilla vel nec nunc. Sed fringilla ex sit amet quam consequat, in laoreet dui interdum. Sed eget ex eu dolor condimentum interdum. Duis sit amet tincidunt turpis. Sed sed risus sed arcu tristique iaculis vel et metus. Suspendisse potenti. Aliquam non metus a mi cursus lacinia.";

  // const Wrapper = withMouseMove(DisplayMousePosition);
  const { x, y, onMouseMove } = useMousePosition();

  return (
    <React.Fragment>
      <PolymorphicComponent />
      <br />
      <WrapperComponent />
      <br />
      <DisplayBooks />
      <br />

      <div className="container">
        <TextPan short expanded={expanded}>
          {dummyText}
        </TextPan>
        <section style={{ marginTop: "1em" }}>
          <button className={expanded ? "secondary" : "primary"} onClick={() => setExpanded(!expanded)}>
            {expanded ? "Shorten" : "Expand"}
          </button>
        </section>
      </div>

      <div className="container">
        <Button primary>Primary Button</Button>
        <Button secondary>Secondary Button</Button>
      </div>

      <RenderPropsComponent />

      <div className="container">
        {/* <MousePosition /> */}
        {/* <Wrapper /> */}

        {/* <RenderMousePosition>{({ x, y }) => <DisplayMousePos x={x} y={y} />}</RenderMousePosition> */}

        <div className="relative-container" onMouseMove={onMouseMove}>
          <section className="absolute-section">
            <p>
              <span className="bold-span">X</span>: {x}
            </p>
            <p>
              <span className="bold-span">Y</span>: {y}
            </p>
          </section>
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;

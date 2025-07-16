import React from "react";

import "./App.scss";
// import withMouseMove from "./components/hoc/withPosition";
// import { DisplayMousePosition } from "./components/hoc/displayMousePosition";
// import { RenderMousePosition } from "./components/render-props/RenderMouse";
import { useMousePosition } from "./components/custom-hook/useMousePosition";
import RenderPropsComponent from "./RenderPropsComponent";
import { Button } from "./components/button";
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
  // const Wrapper = withMouseMove(DisplayMousePosition);
  const { x, y, onMouseMove } = useMousePosition();

  return (
    <React.Fragment>
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

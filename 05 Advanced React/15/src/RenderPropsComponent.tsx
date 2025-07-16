import React from "react";

type RenderProps = {
  renderKelvin: (props: { value: number }) => JSX.Element;
  renderFahrenheit: (props: { value: number }) => JSX.Element;
};

const TemperatureInput: React.FC<RenderProps> = ({ renderKelvin, renderFahrenheit }): JSX.Element => {
  const [celsius, setCelsius] = React.useState<string>("");

  const celsiusNum: number = parseFloat(celsius);
  const valid: boolean = !isNaN(celsiusNum);

  return (
    <React.Fragment>
      <input type="text" value={celsius} onChange={(e) => setCelsius(e.target.value)} placeholder="Enter °C" />
      {valid ? (
        <>
          {renderKelvin({ value: celsiusNum + 273.15 })}
          {renderFahrenheit({ value: (celsiusNum * 9) / 5 + 32 })}
        </>
      ) : (
        <div>Enter a valid number</div>
      )}
    </React.Fragment>
  );
};

const RenderPropsComponent: React.FC = (): JSX.Element => {
  return (
    <React.Fragment>
      <div>
        <h1>Temperature Converter</h1>
        <TemperatureInput
          renderKelvin={({ value }: { value: number }) => <div>{value.toFixed(2)} K</div>}
          renderFahrenheit={({ value }: { value: number }) => <div>{value.toFixed(2)} °F</div>}
        />
      </div>
    </React.Fragment>
  );
};

export default RenderPropsComponent;

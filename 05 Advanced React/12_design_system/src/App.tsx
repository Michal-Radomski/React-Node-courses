import React from "react";
import { ThemeProvider } from "styled-components";

import { PrimaryButton, SecondaryButton } from "./components/Buttons";
import { GlobalStyles, darkTheme, primaryTheme } from "./style";
import { RegisterModal } from "./components/RegisterModal";

import "./App.scss";

const App = (): JSX.Element => {
  const [useDarkTheme, setDarkTheme] = React.useState<boolean>(false);
  return (
    <React.Fragment>
      <button
        style={{
          margin: "0 18px 26px",
          padding: "10px",
          background: "none",
          cursor: "pointer",
          border: "3px solid #FFFF",
        }}
        onClick={() => setDarkTheme(false)}
      >
        Light
      </button>
      <button
        style={{
          margin: "0 18px 26px",
          padding: "10px",
          background: "none",
          cursor: "pointer",
          border: "3px solid #FFFF",
        }}
        onClick={() => setDarkTheme(true)}
      >
        Dark
      </button>
      <ThemeProvider theme={useDarkTheme ? darkTheme : primaryTheme}>
        <div
          style={{
            background: useDarkTheme ? primaryTheme.primaryColor : darkTheme.primaryColor,
            position: "absolute",
            left: "0",
            width: "100vw",
            height: "90vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <PrimaryButton>Click me!</PrimaryButton>
          <SecondaryButton>Click me too!</SecondaryButton>
          <GlobalStyles />
        </div>
        <RegisterModal />
      </ThemeProvider>
    </React.Fragment>
  );
};

export default App;

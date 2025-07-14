//* V1
// import { createContext, PropsWithChildren, Dispatch, useReducer } from "react";

// import { ColorActions, colorReducer, initState } from "../reducer/color-reducer";

// type ColorContextState = {
//   hexColor: string;
//   dispatch: Dispatch<ColorActions>;
// };

// // eslint-disable-next-line react-refresh/only-export-components
// export const ColorContext = createContext<ColorContextState>({
//   hexColor: "#DABA55",
// } as ColorContextState);

// export const ColorProvider = ({ children }: PropsWithChildren) => {
//   const [{ hexColor }, dispatch] = useReducer(colorReducer, initState);

//   return <ColorContext.Provider value={{ hexColor, dispatch }}>{children}</ColorContext.Provider>;
// };

//* V2
import { PropsWithChildren, Dispatch, useReducer } from "react";

import { ColorActions, colorReducer, initState } from "../reducer/color-reducer";
import { createContext } from "./create-context";

type ColorContextState = {
  hexColor: string;
  dispatch: Dispatch<ColorActions>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const [useContext, ContextProvider] = createContext<ColorContextState>();

// const useHexColor = () => {
//   const { hexColor } = useContext();
//   return hexColor;
// };

// const useDispatch = () => {
//   const { dispatch } = useContext();
//   return dispatch;
// };

export const ColorProvider = ({ children }: PropsWithChildren) => {
  const [{ hexColor }, dispatch] = useReducer(colorReducer, initState);
  return <ContextProvider value={{ hexColor, dispatch }}>{children}</ContextProvider>;
};

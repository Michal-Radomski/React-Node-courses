import { createContext, PropsWithChildren, Dispatch, useReducer } from "react";

import { ColorActions, colorReducer, initState } from "../reducer/color-reducer";

type ColorContextState = {
  hexColor: string;
  dispatch: Dispatch<ColorActions>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const ColorContext = createContext<ColorContextState>({
  hexColor: "#DABA55",
} as ColorContextState);

export const ColorProvider = ({ children }: PropsWithChildren) => {
  const [{ hexColor }, dispatch] = useReducer(colorReducer, initState);

  return <ColorContext.Provider value={{ hexColor, dispatch }}>{children}</ColorContext.Provider>;
};

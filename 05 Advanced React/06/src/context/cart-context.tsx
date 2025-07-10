import React from "react";

type State = {
  count: number;
};

type Action = {
  type: "INCREMENT" | "DECREMENT";
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    default:
      throw new Error("Provide a valid action.");
  }
}

type StateContext = { count: number };
type DispatchContext = React.Dispatch<Action>;

const StateContext = React.createContext<StateContext | null>(null);
const DispatchContext = React.createContext<DispatchContext | null>(null);

type CartProviderProps = {
  children: React.ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps): JSX.Element => {
  const [state, dispatch] = React.useReducer(reducer, { count: 0 });

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useStateContext(): StateContext {
  const value = React.useContext(StateContext);

  if (value === null) {
    throw new Error("Must be wrapped inside Context.Provider");
  }

  return value;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDispatchContext(): DispatchContext {
  const value = React.useContext(DispatchContext);

  if (value === null) {
    throw new Error("Must be wrapped inside Context.Provider");
  }

  return value;
}

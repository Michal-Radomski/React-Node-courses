import React from "react";

import "../use_state/style.scss";

type InitialState = {
  items: number;
  inputItems: string | number;
};

const initialState: InitialState = {
  items: 0,
  inputItems: 0,
};

type Action = {
  type: "increase" | "decrease" | "reset" | "updateItemsFromInput";
};

type ActionWithPayload = {
  type: "updateInputItems";
  payload: number;
};

const cartReducer = (state = initialState, action: Action | ActionWithPayload) => {
  const { items, inputItems } = state;

  switch (action.type) {
    case "increase": {
      const newItemsInc = items + 1;
      return { items: newItemsInc, inputItems: newItemsInc };
    }

    case "decrease": {
      const newItemsDec = items - 1;
      return { items: newItemsDec, inputItems: newItemsDec };
    }

    case "reset":
      return { items: 0, inputItems: 0 };

    case "updateInputItems":
      return { items, inputItems: action.payload };

    case "updateItemsFromInput":
      return { items: Number(inputItems), inputItems };

    default:
      return state;
  }
};

const ShoppingCard2 = (): JSX.Element => {
  const [{ items, inputItems }, dispatch] = React.useReducer(cartReducer, initialState);

  return (
    <React.Fragment>
      <section className="counter-wrapper flex flex-col items-center w-2/3 gap-8 p-8 bg-white border-4 shadow-lg border-primary-500">
        <h1 className="counter-title">Shopping Cart Items</h1>
        <p className="counter-value text-6xl">{items}</p>
        <div className="counter-buttons flex gap-2">
          <button className="decrement-button" onClick={() => dispatch({ type: "decrease" })}>
            Decrease
          </button>
          <button className="reset-button" onClick={() => dispatch({ type: "reset" })}>
            Reset
          </button>
          <button className="increment-button" onClick={() => dispatch({ type: "increase" })}>
            Increase
          </button>
        </div>
        <div className="counter-form">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              dispatch({ type: "updateItemsFromInput" });
            }}
          >
            <input
              type="number"
              value={inputItems}
              onChange={(e) =>
                dispatch({
                  type: "updateInputItems",
                  payload: e.target.valueAsNumber,
                })
              }
              className="counter-input"
            />
            <button type="submit" className="update-button">
              Update cart
            </button>
          </form>
        </div>
      </section>
    </React.Fragment>
  );
};

export default ShoppingCard2;

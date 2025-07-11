import React from "react";
import { useImmerReducer } from "use-immer";
import styled from "styled-components";

import ShoppingListHeader from "./shopping-list-header";
import ShoppingListRow from "./shopping-list-row";

const StyledContainer = styled.div`
  padding-top: 2rem;
  max-width: 4xl;
  margin: 0 auto;
  text-align: left;
`;

const StyledWrapper = styled.div`
  max-width: xs;
`;

const StyledAddItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 0.5rem;
  max-width: xs;
`;

const StyledLabel = styled.label`
  margin-bottom: 0.5rem;
`;

const StyledInput = styled.input`
  width: 100%;
`;

const StyledButton = styled.button`
  align-self: flex-end;
  padding: 0.5rem 1rem;
  background-color: #86c784;
  color: #1a472a;
`;

// Generate an id for new shopping list items
const getUuid = () => "_" + Math.random().toString(36).substr(2, 9);
// console.log("getUuid():", getUuid());

// Initial state for the shopping list reducer
const shoppingItems = {
  newShoppingItemName: "",
  items: [
    {
      id: "1",
      name: "Sea Salt",
    },
    {
      id: "2",
      name: "Apples",
    },
    {
      id: "3",
      name: "Chicken breasts",
    },
  ],
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reducer = (state: { newShoppingItemName: string; items: Item[] }, action: any) => {
  switch (action.type) {
    case "UPDATE_NEW_SHOPPING_ITEM_NAME":
      state.newShoppingItemName = action.payload;
      break;
    case "ADD_ITEM":
      state.newShoppingItemName = "";
      state.items.push(action.payload);
      break;
    case "UPDATE_ITEM":
      state.items.splice(action.payload.index, 1, action.payload.item);
      break;
    case "DELETE_ITEM":
      state.items.splice(action.payload.index, 1);
      break;
  }
  return state;
};

const ShoppingList = (): JSX.Element => {
  const [shoppingList, dispatch] = useImmerReducer(reducer, shoppingItems); //* Similar to React.useReducer

  const addItem = (): void => {
    if (!shoppingList.newShoppingItemName) return;
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: getUuid(),
        name: shoppingList.newShoppingItemName,
      },
    });
  };

  const deleteItem = (item: Item): void => {
    dispatch({
      type: "DELETE_ITEM",
      payload: item,
    });
  };

  const updateItem = (payload: { index: number }): void => {
    dispatch({
      type: "UPDATE_ITEM",
      payload,
    });
  };

  const onChangeShoppingListItemName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch({
      type: "UPDATE_NEW_SHOPPING_ITEM_NAME",
      payload: e.target.value,
    });
  };

  return (
    <React.Fragment>
      <StyledContainer>
        <StyledWrapper>
          <ShoppingListHeader shoppingList={shoppingList.items} />
          <div style={{ marginBottom: "1.5rem" }}>
            {shoppingList.items.map((item, index) => (
              <ShoppingListRow key={item.id} item={item} index={index} updateItem={updateItem} deleteItem={deleteItem} />
            ))}
          </div>
          <StyledAddItemContainer>
            <StyledLabel htmlFor="shoppingItemField">Add item</StyledLabel>
            <StyledInput
              type="text"
              id="shoppingItemField"
              value={shoppingList.newShoppingItemName}
              onChange={onChangeShoppingListItemName}
            />
            <StyledButton onClick={addItem}>Add</StyledButton>
          </StyledAddItemContainer>
        </StyledWrapper>
      </StyledContainer>
    </React.Fragment>
  );
};

export default ShoppingList;

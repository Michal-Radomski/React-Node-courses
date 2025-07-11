import React from "react";
import { nanoid } from "nanoid";
import styled from "styled-components";

import IngredientsList from "./ingredients-list";
import IngredientsInfoHelper from "./ingredients-info-helper";
import AddIngredient from "./add-ingredient";

const StyledContainer = styled.div`
  margin-top: 2rem;
  max-width: 20rem;
  margin-left: auto;
  margin-right: auto;

  > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  > div > h2 {
  }
`;

const StyledHeading2 = styled.h2`
  margin-bottom: 1rem;
  font-weight: 600;
`;

const StyledSpaceY4 = styled.div`
  margin-top: 1rem;

  > * + * {
    margin-top: 1rem;
  }
`;

const initialIngredients = [
  {
    id: nanoid(),
    name: "500g Chicken Breasts",
  },
  {
    id: nanoid(),
    name: "300 ml milk",
  },
  {
    id: nanoid(),
    name: "1 tbsp salt",
  },
] as Ingredient[];

const Ingredients = (): JSX.Element => {
  console.log("Ingredient rendered");

  const [ingredient, setIngredient] = React.useState<string>("");
  const [ingredients, setIngredients] = React.useState<Ingredient[]>(initialIngredients);

  const addIngredient = (ingredient: string): void => {
    setIngredients((ingredients: Ingredient[]) => [
      ...ingredients,
      {
        name: ingredient,
        id: nanoid(),
      } as Ingredient,
    ]);
  };

  const deleteIngredient = React.useCallback((id: string): void => {
    setIngredients((ingredients) => ingredients.filter((ing) => ing.id !== id));
  }, []);

  const createIngredientsHeaderText = (): JSX.Element => {
    console.log("createIngredientsHeaderText called");
    return <StyledHeading2>Ingredients ({ingredients.length})</StyledHeading2>;
  };

  return (
    <React.Fragment>
      <StyledContainer>
        <div>
          {createIngredientsHeaderText()}
          <IngredientsInfoHelper />
        </div>

        <StyledSpaceY4>
          <IngredientsList ingredients={ingredients} deleteIngredient={deleteIngredient} />

          <AddIngredient addIngredient={addIngredient} ingredient={ingredient} setIngredient={setIngredient} />
        </StyledSpaceY4>
      </StyledContainer>
    </React.Fragment>
  );
};

export default Ingredients;

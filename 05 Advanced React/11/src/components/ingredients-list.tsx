import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  text-align: left;
`;

const StyledList = styled.ul`
  border-color: #d1d5db; /* Replace with your desired color */
  border-width: 0;
  border-style: solid;
  border-top-width: 1px; /* Add this line for the first item */
`;

const StyledListItem = styled.li`
  padding-top: 0.75rem; /* Adjust as needed */
  padding-bottom: 0.75rem; /* Adjust as needed */
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledButton = styled.button`
  cursor: pointer;
`;

const IngredientsList = (props: { ingredients: Ingredient[]; deleteIngredient: (id: string) => void }): JSX.Element => {
  console.log("IngredientsList rendered");

  const { ingredients, deleteIngredient } = props;

  return (
    <React.Fragment>
      <StyledContainer>
        <StyledList>
          {(ingredients as Ingredient[]).map((ingredient: Ingredient) => (
            <StyledListItem key={ingredient.id}>
              <span>{ingredient.name}</span>
              <StyledButton onClick={() => deleteIngredient(ingredient.id)}>X</StyledButton>
            </StyledListItem>
          ))}
        </StyledList>
      </StyledContainer>
    </React.Fragment>
  );
};

// export default React.memo(IngredientsList, (prevProps, nextProps) => {
//   return prevProps.ingredients === nextProps.ingredients;
// });

export default React.memo(IngredientsList);

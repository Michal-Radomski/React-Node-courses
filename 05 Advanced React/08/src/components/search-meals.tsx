import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

import { didAbort } from "../api/api";
import { searchMeals } from "../api/mealAPI";

const useFetchMeals = () => {
  const [meals, setMeals] = React.useState<ObjectI[]>([] as ObjectI[]);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  const abortRef = React.useRef<{ abort: Function }>({} as { abort: Function });

  const handleQuoteError = (error: CustomError): void => {
    if (didAbort(error)) {
      toast.error("Request aborted!");
    } else {
      toast.error("Oh no, error!");
    }
  };

  const fetchMeals = async (query: string) => {
    try {
      // Abort the previous request if there was one
      abortRef.current.abort?.();

      // Search for new meals
      const newMeals = (await searchMeals(query, {
        // Assign the canceler method to the abortRef
        // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
        abort: (abort: Function) => (abortRef.current.abort = abort),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any)) as ObjectI[];

      setMeals(newMeals ?? []);
    } catch (error) {
      console.error(error);
      handleQuoteError(error as CustomError);
    }
  };

  return {
    meals,
    fetchMeals,
  };
};

const Container = styled.div`
  padding-top: 8px;
  max-width: 2xl;
  margin: auto;
`;

const Form = styled.form`
  margin-bottom: 8px;
`;

const Fieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 4px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 2xl;
  margin-bottom: 4px;
`;

const MealContainer = styled.div`
  max-height: 60;
  overflow-y: auto;
`;

const MealItem = styled.div<{ $odd: boolean }>`
  padding: 1px;
  background-color: ${(props) => (props.$odd ? "#ccc" : "transparent")};
`;

const SearchMeal = (): JSX.Element => {
  const [query, setQuery] = React.useState<string>("");
  const { meals, fetchMeals } = useFetchMeals();

  React.useEffect(() => {
    fetchMeals(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <React.Fragment>
      <Container>
        <ToastContainer />
        <Form>
          <Fieldset>
            <Label htmlFor="meal">Find your lovely meal</Label>
            <Input
              type="text"
              autoComplete="off"
              value={query}
              onChange={({ target }) => setQuery(target.value)}
              id="meal"
            />
          </Fieldset>
        </Form>
        <div>
          <Title>Meals</Title>
          <MealContainer>
            {meals.map((meal: ObjectI, index: number) => (
              <MealItem $odd={index % 2 !== 0} key={meal.idMeal as string}>
                <p>{meal.strMeal as string}</p>
              </MealItem>
            ))}
          </MealContainer>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default SearchMeal;

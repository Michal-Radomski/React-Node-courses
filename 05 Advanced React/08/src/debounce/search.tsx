import React from "react";

import { searchMeals } from "../api/mealAPI";
import { debounce } from "./debounce";

const Search = (): JSX.Element => {
  const [query, setQuery] = React.useState<string>("");
  const [meals, setMeals] = React.useState<ObjectI[]>([]);

  const initSearchApiRequest = React.useMemo(() => {
    return debounce(async (q: string) => {
      // console.log("q:", q);
      setMeals(await searchMeals(q));
    }, 500);
  }, []);

  const onChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setQuery(q);
    initSearchApiRequest(q);
  };

  return (
    <React.Fragment>
      <div>
        <form>
          <label>Search meals</label>
          <input type="text" value={query} onChange={onChangeQuery} />
        </form>
        <ul>
          {meals?.map((meal) => {
            return <li key={meal.idMeal as string}>{meal.strMeal as string}</li>;
          })}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default Search;

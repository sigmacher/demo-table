import { getRandomTitle, getRandomCategory, getRandomUnit } from "./randomizer";

const ingredients = [...Array(10000)].reduce((acc) => {
  const newIngredient = {
    title: getRandomTitle(),
    category: getRandomCategory(),
    units: getRandomUnit(),
  };
  return [...acc, newIngredient];
}, []);

export type TIngredient = {
  title: string;
  category: string;
  units: string;
};

interface IGetIngredients {
  page: number;
  limit: number;
}
export const getIngredients = ({
  page,
  limit,
}: IGetIngredients): Promise<TIngredient[]> => {
  return new Promise((res) => {
    setTimeout(
      () => res(ingredients.slice(page * limit, page * limit + limit)),
      1000
    );
  });
};

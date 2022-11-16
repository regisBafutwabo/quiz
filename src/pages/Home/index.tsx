import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";

import { CategoryCard } from "../../components/CategoryCard";
import { CategoryType } from "../../typings/trivia";

export const Home = () => {
  const loadedData = useLoaderData() as { categories: CategoryType[] };

  return (
    <>
      <Helmet>
        <title>귀즈 - Home</title>
      </Helmet>
      <h1>Home</h1>
      <ul>
        {loadedData?.categories &&
          loadedData.categories?.map((category) => (
            <div key={category.id}>
              <CategoryCard name={category.name} categoryId={category.id} />
            </div>
          ))}
      </ul>
    </>
  );
};

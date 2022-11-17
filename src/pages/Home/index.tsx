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
      <p className="text-pink- text-4xl font-bold text-pink-400">{`Let's Play`}</p>
      <div className="mt-4 flex-col justify-around px-4">
        {loadedData?.categories &&
          loadedData.categories?.map((category) => (
            <CategoryCard
              name={category.name}
              categoryId={category.id}
              key={category.id}
            />
          ))}
      </div>
    </>
  );
};

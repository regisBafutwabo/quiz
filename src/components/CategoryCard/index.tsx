import { ChangeEvent, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  CategoryCardProps,
  DIFFICULTY_LEVEL,
  QUESTION_TYPE,
} from "./CategoryCard.types";

export const CategoryCard = ({ categoryId, name }: CategoryCardProps) => {
  const navigate = useNavigate();

  const [questionsType, setQuestionsType] = useState<string>("any");
  const [difficultyType, setDifficultyType] = useState<string>("any");

  const goToQuiz = () => {
    navigate(
      `/quiz/${categoryId}?difficulty=${difficultyType}&type=${questionsType}`
    );
  };

  const handleDifficultyChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setDifficultyType(event.target.value.toLowerCase());
  };

  const handleQuestionsTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setQuestionsType(event.target.value);
  };

  return (
    <div className="space-between my-4 flex flex-wrap items-center justify-between rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 p-6 shadow-lg ">
      <div className="max-sm:mb-2 max-sm:w-full sm:w-1/4">
        <span className="text-xl font-semibold text-white  max-sm:font-bold">
          {name}
        </span>
      </div>
      <div className="items-center max-sm:w-full sm:w-1/4">
        <div>
          <label className="mb-2 block text-base font-semibold text-white">
            Difficulty
          </label>
          <select
            className="block w-full rounded-lg  bg-gray-50 p-2.5 text-sm text-gray-900 focus-visible:outline-none max-sm:p-3"
            defaultValue={difficultyType}
            onChange={handleDifficultyChange}
          >
            {DIFFICULTY_LEVEL.map((level) => (
              <option key={level.key} value={level.value}>
                {level.value}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-base font-semibold text-white">
            Type
          </label>
          <select
            className="block w-full rounded-lg bg-gray-50  p-2.5 text-sm text-gray-900 focus-visible:outline-none max-sm:p-3 "
            defaultValue={questionsType}
            onChange={handleQuestionsTypeChange}
          >
            {QUESTION_TYPE.map((type) => (
              <option key={type.key} value={type.key}>
                {type.value}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex items-center justify-center max-sm:mt-4 max-sm:w-full sm:w-1/4">
        <button
          onClick={goToQuiz}
          className="rounded-md bg-white px-1 py-2 font-bold text-pink-400  hover:bg-pink-400 hover:text-white max-sm:w-full max-sm:py-3 sm:px-8 sm:py-3"
        >
          퀴즈 풀기
        </button>
      </div>
    </div>
  );
};

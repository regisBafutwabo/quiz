import { ChangeEvent, useState } from "react";

import { useNavigate } from "react-router-dom";

import { QuizService } from "../../../services/Quiz/Quiz.service";
import { useTokenStore } from "../../../store";
import { MainButton, Select } from "../../atoms";
import { CategoryCardProps } from "./CategoryCard.types";

const DIFFICULTY_LEVEL = [
  { key: "any", value: "Any" },
  { key: "easy", value: "Easy" },
  { key: "medium", value: "Medium" },
  { key: "hard", value: "Hard" },
];

export const CategoryCard = ({ categoryId, name }: CategoryCardProps) => {
  const navigate = useNavigate();

  const { setToken } = useTokenStore();

  const [difficultyType, setDifficultyType] = useState<string>("any");

  const goToQuiz = async () => {
    const newToken = await QuizService.generateToken();
    setToken(newToken);

    navigate(`/quiz/${categoryId}?difficulty=${difficultyType}`);
  };

  const handleDifficultyChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setDifficultyType(event.target.value.toLowerCase());
  };

  return (
    <div className="space-between my-4 flex flex-wrap items-center justify-between rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 p-6 shadow-lg ">
      <div className="max-sm:mb-2 max-sm:w-full sm:w-1/4">
        <span className="text-xl font-semibold text-white  max-sm:font-bold">
          {name}
        </span>
      </div>
      <div className="items-center space-y-3 max-sm:w-full sm:w-1/4">
        <Select
          options={DIFFICULTY_LEVEL}
          defaultValue={difficultyType}
          onChange={handleDifficultyChange}
          label="Difficulty"
        />
      </div>
      <div className="flex items-center justify-center max-sm:mt-8 max-sm:w-full sm:w-1/4">
        <MainButton label="퀴즈 풀기" onClick={goToQuiz} />
      </div>
    </div>
  );
};

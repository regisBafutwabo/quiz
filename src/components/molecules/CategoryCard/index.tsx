import { ChangeEvent, useState } from "react";

import { useNavigate } from "react-router-dom";

import { QuizService } from "../../../services/Quiz/Quiz.service";
import { useStore } from "../../../store";
import { Select, StartButton } from "../../atoms";
import {
  CategoryCardProps,
  DIFFICULTY_LEVEL,
  QUESTION_TYPE,
} from "./CategoryCard.types";

export const CategoryCard = ({ categoryId, name }: CategoryCardProps) => {
  const navigate = useNavigate();

  const { setToken, token } = useStore();

  const [questionsType, setQuestionsType] = useState<string>("any");
  const [difficultyType, setDifficultyType] = useState<string>("any");

  const goToQuiz = async () => {
    const newToken = await QuizService.generateToken();
    setToken(newToken);
    console.log("token", token);

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
      <div className="items-center space-y-3 max-sm:w-full sm:w-1/4">
        <Select
          options={DIFFICULTY_LEVEL}
          defaultValue={difficultyType}
          onChange={handleDifficultyChange}
          label="Difficulty"
        />
        <Select
          options={QUESTION_TYPE}
          defaultValue={questionsType}
          onChange={handleQuestionsTypeChange}
          label="Type"
        />
      </div>
      <div className="flex items-center justify-center max-sm:mt-8 max-sm:w-full sm:w-1/4">
        <StartButton label="퀴즈 풀기" onClick={goToQuiz} />
      </div>
    </div>
  );
};

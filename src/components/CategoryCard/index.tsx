import { ChangeEvent, useState } from "react";

import { useNavigate } from "react-router-dom";

import { CategoryCardProps, DIFFICULTY_LEVEL, QUESTION_TYPE } from "./CategoryCard.types";

export const CategoryCard = ({ categoryId, name }: CategoryCardProps) => {
  const navigate = useNavigate();

  const [questionsType, setQuestionsType] = useState<string>("any");
  const [difficultyType, setDifficultyType] = useState<string>("any");

  const goToQuiz = () => {
    navigate(`/quiz/${categoryId}?difficulty=${difficultyType}&type=${questionsType}`);
  };

  const handleDifficultyChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setDifficultyType(event.target.value);
  };
  const handleQuestionsTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setQuestionsType(event.target.value);
  };
  return (
    <>
      <h3>{name}</h3>
      <div style={{ paddingLeft: 16 }}>
        <div>
          <h5>Difficulty</h5>
          <div>
            <select defaultValue={difficultyType} onChange={handleDifficultyChange}>
              {DIFFICULTY_LEVEL.map((level: string) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <h5>Type</h5>
          <div>
            <select defaultValue={questionsType} onChange={handleQuestionsTypeChange}>
              {QUESTION_TYPE.map((type) => (
                <option key={type.key} value={type.key}>
                  {type.value}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div style={{ paddingTop: 16 }}>
          <button onClick={goToQuiz}>Start Quiz</button>
        </div>
      </div>
    </>
  );
};

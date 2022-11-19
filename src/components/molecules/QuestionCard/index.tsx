import { decodingText } from "../../../utils/decoding";
import { shuffle } from "../../../utils/shuffle";
import { AnswerButton } from "../../atoms/AnswerButton";
import { QuestionCardProps } from "./QuestionCard.types";

export const QuestionCard = ({
  question,
  total,
  current,
  onSolve,
}: QuestionCardProps) => {
  const answers = [...question.incorrect_answers, question.correct_answer];
  const shuffledAnswers = shuffle(answers);

  return (
    <div className="mb-4 rounded-xl bg-gradient-to-b from-cyan-500 to-blue-500 p-6 text-white shadow-lg">
      <div>
        <span className="font-semi-bold">{`Question ${current} of ${total}`}</span>
      </div>
      <div>
        <span className="text-2xl font-bold">
          {decodingText(question.question)}
        </span>
      </div>
      <div className="mt-10 flex-wrap items-center justify-center max-sm:w-full max-sm:flex-col sm:flex">
        {shuffledAnswers.map((answer) => (
          <AnswerButton answer={answer} key={answer} onClick={onSolve} />
        ))}
      </div>
    </div>
  );
};

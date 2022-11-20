import { useMemo, useState } from "react";

import { decodeText } from "../../../utils/decoding";
import { shuffle } from "../../../utils/shuffle";
import { AnswerButton } from "../../atoms/AnswerButton";
import { QuestionCardProps } from "./QuestionCard.types";

export const QuestionCard = ({
  question,
  total,
  current,
  onSolve,
}: QuestionCardProps) => {
  const [status, setStatus] = useState<"SOLVED" | "UNSOLVED">("UNSOLVED");

  const answers = useMemo(
    () => [...question.incorrect_answers, question.correct_answer],
    [question]
  );
  const shuffledAnswers = useMemo(() => shuffle(answers), [answers]);

  const onClick = (answer: string) => {
    onSolve(answer);
    setStatus("SOLVED");
  };

  return (
    <div
      className="mb-4 rounded-xl bg-gradient-to-b from-cyan-500 to-blue-500 p-6 text-white shadow-lg"
      data-testid="question-card">
      <div>
        <span
          className="font-semi-bold"
          data-testid="current-question">{`Question ${current} of ${total}`}</span>
      </div>
      <div>
        <span className="text-2xl font-bold">
          {decodeText(question.question)}
        </span>
      </div>
      <div className="mt-10 flex-wrap items-center justify-center max-sm:w-full max-sm:flex-col sm:flex">
        {shuffledAnswers.map((answer) => (
          <AnswerButton
            answer={answer}
            correctAnswer={
              status === "SOLVED" && answer === question.correct_answer
            }
            status={status}
            key={answer}
            onClick={() => onClick(answer)}
          />
        ))}
      </div>
    </div>
  );
};

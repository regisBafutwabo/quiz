import { MouseEvent, useState } from "react";

import { useNavigate } from "react-router-dom";

import SadFace from "../../../assets/images/sadFace.svg";
import FirebaseService from "../../../services/Firebase/Firebase.service";
import { useTimerStore, useTokenStore } from "../../../store";
import { AnswerType } from "../../../typings/trivia";
import { decodeText } from "../../../utils/decoding";
import { CalculateTimeUsed } from "../../../utils/time";
import { MainButton } from "../../atoms";
import { Skeleton } from "../../atoms/Skeleton";
import { QuestionCard } from "../../molecules";
import { TriviaProps } from "./Trivia.types";

export const Trivia = (props: TriviaProps) => {
  const { questions, loading, setLoading, getQuiz, setErrorMessage } = props;
  const navigate = useNavigate();
  const { token } = useTokenStore();
  const { time } = useTimerStore();

  const [answers, setAnswers] = useState<AnswerType>({
    correctAnswer: 0,
    incorrectAnswer: 0,
  });
  const [showNextButton, setShowNextButton] = useState<boolean>(false);
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const [currentAnswer, setCurrentAnswer] = useState<string>("");

  const solveQuestion = (answer: string) => {
    const decodedAnswer = decodeText(answer);
    const decodedCorrectAnswer = decodeText(questions[0].correct_answer);

    setCurrentAnswer(decodedAnswer);

    if (decodedCorrectAnswer === decodedAnswer) {
      setAnswers({
        ...answers,
        correctAnswer: answers.correctAnswer + 1,
      });
    } else {
      setAnswers({
        ...answers,
        incorrectAnswer: answers.incorrectAnswer + 1,
      });
    }

    setShowNextButton(true);
  };

  const goToNextQuestion = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowNextButton(false);
    setLoading(true);

    try {
      if (questionNumber === 10) {
        const timeUsed = CalculateTimeUsed(time);

        await FirebaseService.setAnswers({
          userToken: token,
          timeUsed: timeUsed,
          answers,
        });

        setLoading(false);
        navigate("/result", { replace: true });
      } else {
        await getQuiz();
        setQuestionNumber((previous) => previous + 1);
        setLoading(false);
      }
    } catch (error) {
      setErrorMessage((error as Error).message);
      setLoading(false);
    }
  };

  return (
    <div className="mt-8">
      {loading && <Skeleton />}
      {questions[0] &&
        !loading &&
        questions.map((question) => (
          <QuestionCard
            onSolve={solveQuestion}
            key={question.question}
            question={question}
            total={10}
            current={questionNumber}
          />
        ))}

      {showNextButton && (
        <div className="flex content-end items-center justify-end space-x-2 max-sm:flex-col max-sm:space-y-2">
          {decodeText(questions[0]?.correct_answer) !== currentAnswer && (
            <div className="flex items-center">
              <span className="font-semibold text-gray-500">Wrong Answer</span>
              <img src={SadFace} className="h-10 w-10" />
            </div>
          )}
          <MainButton
            label="Next"
            isBlue
            id="next-question-button"
            onClick={goToNextQuestion}
          />
        </div>
      )}
    </div>
  );
};

import { useCallback, useEffect, useState } from "react";

import { Helmet } from "react-helmet-async";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { MainButton } from "../../components/atoms";
import { Skeleton } from "../../components/atoms/Skeleton";
import { QuestionCard } from "../../components/molecules";
import firebaseService from "../../services/Firebase";
import { QuizService } from "../../services/Quiz/Quiz.service";
import { useTimerStore, useTokenStore } from "../../store";
import { QuestionType } from "../../typings/trivia";
import { decodeText } from "../../utils/decoding";
import { CalculateTimeUsed } from "../../utils/time";

export const Quiz = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { token } = useTokenStore();
  const { time, setTime } = useTimerStore();

  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [answers, setAnswers] = useState<any[]>([]);
  const [showNextButton, setShowNextButton] = useState<boolean>(false);

  const getQuiz = useCallback(async () => {
    const difficulty = searchParams.get("difficulty");

    if (id) {
      try {
        const data = await QuizService.getQuiz({
          categoryId: id,
          difficulty: difficulty !== "any" ? difficulty : null,
          token: token,
        });
        setQuestions(data);
      } catch (error) {
        setErrorMessage((error as Error).message);
      }
    }
  }, [searchParams, id]);

  const solveQuestion = (answer: string) => {
    const decodedAnswer = decodeText(answer);
    const decodedQuestion = decodeText(questions[0].question);
    const decodedCorrectAnswer = decodeText(questions[0].correct_answer);

    try {
      setAnswers([
        ...answers,
        {
          question: decodedQuestion,
          userToken: token,
          correct_answer: decodedCorrectAnswer,
          answer: decodedAnswer,
        },
      ]);
      setShowNextButton(true);
    } catch (error) {
      console.log("ERROR in setANswers: ", error);
    }
  };

  const goToNextQuestion = async () => {
    setShowNextButton(false);
    setLoading(true);
    if (questionNumber === 10) {
      const timeUsed = CalculateTimeUsed(time);
      await firebaseService.setAnswers({
        userToken: token,
        timeUsed: timeUsed,
        answers: [...answers],
      });

      setLoading(false);
      navigate("/result", { replace: true });
    } else {
      await getQuiz();

      setQuestionNumber(questionNumber + 1);
      setLoading(false);
    }
  };

  useEffect(() => {
    getQuiz();
    setTime(new Date().toString());
  }, []);

  return (
    <>
      <Helmet>
        <title>
          귀즈 - {decodeText(questions[0]?.category || "Loading...")}
        </title>
      </Helmet>
      <div>
        <span className=" text-2xl font-bold text-pink-400">
          Category: {decodeText(questions[0]?.category)}
        </span>
      </div>

      <div className="mt-8">
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
        {loading && <Skeleton />}
        {showNextButton && (
          <div className="flex justify-end">
            <MainButton label="다움" onClick={goToNextQuestion} />
          </div>
        )}
      </div>
    </>
  );
};

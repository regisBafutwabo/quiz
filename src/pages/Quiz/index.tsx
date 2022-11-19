import { useCallback, useEffect, useState } from "react";

import { Helmet } from "react-helmet-async";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { Skeleton } from "../../components/atoms/Skeleton";
import { QuestionCard } from "../../components/molecules";
import { QuizService } from "../../services/Quiz/Quiz.service";
import { useStore } from "../../store";
import { QuestionType } from "../../typings/trivia";
import { decodingText } from "../../utils/decoding";

export const Quiz = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { token } = useStore();

  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const getQuiz = useCallback(async () => {
    const difficulty = searchParams.get("difficulty");
    const type = searchParams.get("type");

    if (id) {
      try {
        const data = await QuizService.getQuiz({
          categoryId: id,
          difficulty: difficulty !== "any" ? difficulty : null,
          type: type !== "any" ? type : null,
          token: token,
        });
        setQuestions(data);
      } catch (error) {
        setErrorMessage((error as Error).message);
      }
    }
  }, [searchParams, id]);

  const solveQuestion = async () => {
    if (questionNumber === 10) {
      navigate("/result", { replace: true });
    } else {
      setLoading(true);

      await getQuiz();
      setQuestionNumber(questionNumber + 1);

      setLoading(false);
    }
  };

  useEffect(() => {
    getQuiz();
  }, []);

  return (
    <>
      <Helmet>
        <title>
          귀즈 - {decodingText(questions[0]?.category || "Loading...")}
        </title>
      </Helmet>
      <div>
        <span className=" text-2xl font-bold text-pink-400">
          Category: {decodingText(questions[0]?.category)}
        </span>
      </div>
      <div className="mt-8">
        {questions.length &&
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
      </div>
    </>
  );
};

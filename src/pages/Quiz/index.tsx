import { useCallback, useEffect, useState } from "react";

import { Helmet } from "react-helmet-async";
import { useLoaderData, useParams, useSearchParams } from "react-router-dom";

import { Trivia } from "../../components/organisms/Trivia";
import { QuizService } from "../../services/Quiz/Quiz.service";
import { useTimerStore, useTokenStore } from "../../store";
import { QuestionType } from "../../typings/trivia";
import { decodeText } from "../../utils/decoding";

export const Quiz = () => {
  const loadedData = useLoaderData() as QuestionType[];

  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const { token } = useTokenStore();
  const { setTime } = useTimerStore();

  const [questions, setQuestions] = useState<QuestionType[]>(loadedData);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const getQuiz = useCallback(async () => {
    const difficulty = searchParams.get("difficulty");
    try {
      const data = await QuizService.getQuiz({
        categoryId: id as string,
        difficulty: difficulty !== "any" ? difficulty : null,
        token: token,
      });

      setQuestions(data);
      setLoading(false);
    } catch (error) {
      setErrorMessage(error as string);
      setLoading(false);
    }
  }, [searchParams, id]);

  useEffect(() => {
    setTime(new Date().toString());
  }, []);

  return (
    <>
      <Helmet>
        <title>
          귀즈 - {decodeText(questions[0]?.category || "Loading...")}
        </title>
      </Helmet>

      {errorMessage && (
        <div className="my-4">
          <span className="text-xl text-red-500">{errorMessage}</span>
        </div>
      )}

      {questions && (
        <Trivia
          loading={loading}
          setLoading={setLoading}
          setErrorMessage={setErrorMessage}
          questions={questions}
          getQuiz={getQuiz}
        />
      )}
    </>
  );
};

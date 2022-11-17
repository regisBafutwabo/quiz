import { useCallback, useEffect, useState } from "react";

import { Helmet } from "react-helmet-async";
import { useParams, useSearchParams } from "react-router-dom";

import { QuizService } from "../../services/Quiz/Quiz.service";
import { QuestionType } from "../../typings/trivia";

export const Quiz = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const getQuiz = useCallback(async () => {
    const difficulty = searchParams.get("difficulty");
    const type = searchParams.get("type");

    if (id) {
      try {
        const data = await QuizService.getQuiz({
          categoryId: id,
          difficulty: difficulty !== "any" ? difficulty : null,
          type: type !== "any" ? type : null,
        });
        setQuestions(data);
      } catch (error) {
        setErrorMessage((error as Error).message);
      }
    }
  }, [searchParams, id]);

  useEffect(() => {
    getQuiz();
  }, []);

  return (
    <>
      <Helmet>
        <title>귀즈 - Quiz</title>
      </Helmet>
      <ul>
        {questions.map((question) => (
          <li key={question.question}>
            {decodeURIComponent(question.question)}
          </li>
        ))}
      </ul>
    </>
  );
};

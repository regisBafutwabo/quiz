import { useCallback, useEffect, useState } from "react";

import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

import { MainButton } from "../../components/atoms";
import firebaseService from "../../services/Firebase";
import { useTokenStore } from "../../store";

export const Result = () => {
  const { token } = useTokenStore();
  const navigate = useNavigate();

  const [incorrectAnswer, setIncorrectAnswer] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [timeUsed, setTimeUsed] = useState();

  const getResults = useCallback(async () => {
    if (token) {
      try {
        const result = await firebaseService.getAnswers(token);

        setTimeUsed(result.usedTime);
        setCorrectAnswer(result.answers.correctAnswer);
        setIncorrectAnswer(result.answers.incorrectAnswer);
      } catch (error) {
        setErrorMessage((error as Error).message);
        console.error(error);
      }
    } else {
      setErrorMessage(
        "There is no current user Token at the moment please go back to the home Screen"
      );
    }
  }, [token]);

  const onClick = () => {
    navigate("/", { replace: true });
  };

  useEffect(() => {
    getResults();
  }, []);

  return (
    <>
      <Helmet>
        <title>귀즈 - Results</title>
      </Helmet>
      {errorMessage ? (
        <div className="my-6 text-center">
          <span className="text-2xl font-bold text-red-500">
            Error: {errorMessage}
          </span>
        </div>
      ) : (
        <>
          <div className="my-6 text-center">
            <span className="text-2xl font-bold">Results Details</span>
          </div>
          <div className="mb-8">
            <span className="text-xl font-semibold">
              Time used to complish the quiz: {timeUsed}
            </span>
          </div>
          <div className="mb-8">
            <p className="text-xl font-semibold">Answers Details</p>
            <div>
              <span className="text-lg font-semibold text-green-500">
                Correct Answers: {correctAnswer}
              </span>
            </div>
            <div>
              <span className="text-lg font-semibold text-red-500">
                Incorrect Answers: {incorrectAnswer}
              </span>
            </div>
          </div>
          <div className="mb-4 text-center">
            <span className="font-mono text-2xl font-semibold">
              Grade: {correctAnswer * 10}%
            </span>
          </div>
          <div className="h-10 w-full rounded-xl bg-red-500">
            <div
              className="h-10 rounded-xl bg-green-500 p-0.5 text-center text-xs font-medium text-blue-100"
              style={{ width: `${correctAnswer * 10}%` }}></div>
          </div>
          <div className="my-8 text-center">
            <MainButton
              onClick={onClick}
              id="go-home-button"
              isBlue
              label="Go Home"
            />
          </div>
        </>
      )}
    </>
  );
};

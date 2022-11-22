import { Helmet } from "react-helmet-async";
import { useLoaderData, useNavigate } from "react-router-dom";

import { MainButton } from "../../components/atoms";
import { ResultType } from "../../typings/trivia";

export const Result = () => {
  const loadedData = useLoaderData() as ResultType;

  const navigate = useNavigate();

  const onClick = () => {
    navigate("/", { replace: true });
  };

  return (
    <>
      <Helmet>
        <title>귀즈 - Results</title>
      </Helmet>

      <>
        <div className="my-6 text-center">
          <span className="text-2xl font-bold">Results Details</span>
        </div>
        <div className="mb-8">
          <span className="text-xl font-semibold">
            Time used to complish the quiz: {loadedData.usedTime}
          </span>
        </div>
        <div className="mb-8">
          <p className="text-xl font-semibold">Answers Details</p>
          <div>
            <span className="text-lg font-semibold text-green-500">
              Correct Answers: {loadedData.answers.correctAnswer}
            </span>
          </div>
          <div>
            <span className="text-lg font-semibold text-red-500">
              Incorrect Answers: {loadedData.answers.incorrectAnswer}
            </span>
          </div>
        </div>
        <div className="mb-4 text-center">
          <span className="font-mono text-2xl font-semibold">
            Grade: {loadedData.answers.correctAnswer * 10}%
          </span>
        </div>
        <div className="h-10 w-full rounded-xl bg-red-500">
          <div
            className="h-10 rounded-xl bg-green-500 p-0.5 text-center text-xs font-medium text-blue-100"
            style={{
              width: `${loadedData.answers.correctAnswer * 10}%`,
            }}></div>
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
    </>
  );
};

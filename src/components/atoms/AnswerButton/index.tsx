import { useMemo } from "react";

import { decodeText } from "../../../utils/decoding";
import { AnswerButtonProps } from "./AnswerButton.types";

export const AnswerButton = ({
  answer,
  onClick,
  correctAnswer,
  status,
}: AnswerButtonProps) => {
  const buttonColor = useMemo(
    () =>
      status === "SOLVED" && correctAnswer
        ? "bg-green-500 text-white"
        : "bg-red-500 text-white",
    [correctAnswer, status]
  );

  return (
    <button
      onClick={onClick}
      className={` my-3 flex justify-between rounded-xl ${
        status === "UNSOLVED"
          ? "bg-white text-blue-500 hover:bg-pink-500 hover:text-white"
          : buttonColor
      } p-4 font-bold  shadow-lg  max-sm:w-full sm:m-3 sm:w-1/3`}>
      {decodeText(answer)}
    </button>
  );
};

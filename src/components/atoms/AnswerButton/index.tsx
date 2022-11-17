import { decodingText } from "../../../utils/decoding";
import { AnswerButtonProps } from "./AnswerButton.types";

export const AnswerButton = ({ answer, onClick }: AnswerButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="my-3 rounded-xl bg-white p-4 font-bold text-blue-500 shadow-lg hover:bg-pink-500 hover:text-white max-sm:w-full sm:m-3 sm:w-1/3"
    >
      {decodingText(answer)}
    </button>
  );
};

import { StartButtonProps } from "./StartButton.types";

export const StartButton = ({ label, onClick }: StartButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="rounded-md bg-white px-1 py-2 font-bold text-pink-400  hover:bg-pink-400 hover:text-white max-sm:w-full max-sm:py-3 sm:px-8 sm:py-3">
      {label}
    </button>
  );
};

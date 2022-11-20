import { MainButtonProps } from "./MainButton.types";

export const MainButton = ({ label, onClick, isBlue }: MainButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-md px-1 py-2 font-bold  max-sm:w-full max-sm:py-3 sm:px-8 sm:py-3 ${
        isBlue
          ? "bg-blue-500 text-white hover:bg-blue-600"
          : "bg-white text-pink-400  hover:bg-pink-400 hover:text-white"
      }`}>
      {label}
    </button>
  );
};
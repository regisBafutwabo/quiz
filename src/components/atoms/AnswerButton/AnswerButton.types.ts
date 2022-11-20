export type AnswerButtonProps = {
  answer: string;
  onClick: () => void;
  correctAnswer?: boolean;
  status: "SOLVED" | "UNSOLVED";
};

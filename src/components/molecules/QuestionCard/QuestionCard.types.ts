import { QuestionType } from "../../../typings/trivia";

export type QuestionCardProps = {
  question: QuestionType;
  total: number;
  current: number;
  onSolve: () => Promise<void>;
};

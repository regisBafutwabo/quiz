import { AnswerType } from "../../typings/trivia";

export type SetAnswersArgs = {
  userToken: string;
  timeUsed: string;
  answers: AnswerType;
};

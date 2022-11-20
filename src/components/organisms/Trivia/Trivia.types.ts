import { Dispatch, SetStateAction } from "react";

import { QuestionType } from "../../../typings/trivia";

export type TriviaProps = {
  questions: QuestionType[];
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  getQuiz: () => Promise<void>;
  setErrorMessage: Dispatch<SetStateAction<string | undefined>>;
};

export type SetAnswersArgs = {
  userToken: string;
  timeUsed: string;
  answers: {
    question: string;
    correct_answer: string;
    answer: string;
  }[];
};

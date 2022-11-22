export type CategoryType = {
  id: number;
  name: string;
};

export type QuestionType = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type AnswerType = {
  correctAnswer: number;
  incorrectAnswer: number;
};

export type ResultType = {
  answers: AnswerType;
  id: string;
  usedTime: string;
};

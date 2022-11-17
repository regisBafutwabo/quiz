export type CategoryCardProps = {
  categoryId: number;
  name: string;
};

export type SelectedCategoryType = {
  id: number;
  difficulty: string;
  type: string;
};

export const DIFFICULTY_LEVEL = [
  { key: "any", value: "Any" },
  { key: "easy", value: "Easy" },
  { key: "medium", value: "Medium" },
  { key: "hard", value: "Hard" },
];
export const QUESTION_TYPE = [
  { key: "any", value: "Any" },
  { key: "multiple", value: "Multiple Choice" },
  { key: "boolean", value: "True / False" },
];

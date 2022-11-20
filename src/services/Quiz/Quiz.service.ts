import {
  CATEGORIES_API_LINK,
  QUIZ_API,
  RETRIEVE_TOKEN,
} from "../../constants/api";
import { CategoryType } from "../../typings/trivia";
import { getErrorMessage } from "../../utils/errors";
import { getQuizArgs } from "./Quiz.types";

export class QuizService {
  static async getCategories() {
    try {
      const response = await fetch(CATEGORIES_API_LINK);
      const data: { trivia_categories: CategoryType[] } = await response.json();

      return { categories: data.trivia_categories };
    } catch (error) {
      console.error("ERROR in getCategories:", error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  static async getQuiz(argument: getQuizArgs) {
    const { difficulty, token, categoryId } = argument;
    if (!token) {
      throw new Error("No User Token found!");
    }

    const response = await fetch(
      `${QUIZ_API}?amount=1&category=${categoryId}${
        difficulty ? `&difficulty=${difficulty}` : ""
      }&type=multiple&token=${token}&encode=url3986`
    );

    const data = await response.json();

    if (data.response_code === 0) {
      return data.results;
    } else {
      const errorMessage = getErrorMessage(data.response_code);
      throw errorMessage;
    }
  }

  static async generateToken() {
    try {
      const response = await fetch(RETRIEVE_TOKEN);
      const data = await response.json();
      const token = data?.token;

      return token;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
}

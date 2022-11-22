import { LoaderFunctionArgs } from "react-router-dom";

import {
  CATEGORIES_API_LINK,
  QUIZ_API,
  RETRIEVE_TOKEN,
} from "../../constants/api";
import { useTokenStore } from "../../store";
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

  static async getQuizOnServer({ params, request }: LoaderFunctionArgs) {
    const url = new URL(request.url);
    let token = "";
    token = useTokenStore.getState().token;

    if (params.id) {
      if (!token) {
        token = await QuizService.generateToken();
        useTokenStore.setState({ token: token });
      }

      const difficulty = url.searchParams.get("difficulty");
      const data = await QuizService.getQuiz({
        categoryId: params.id,
        difficulty: difficulty !== "any" ? difficulty : null,
        token: token,
      });

      return data;
    } else {
      throw "Please Select a category first";
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

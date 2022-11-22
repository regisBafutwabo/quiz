import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";

import { StandardTemplate } from "../components/templates/Standard/Standard";
import { Error } from "../pages/Error";
import { ErrorBoundary } from "../pages/Error/ErrorBoundary";
import { Home } from "../pages/Home";
import { Quiz } from "../pages/Quiz";
import { Result } from "../pages/Result";
import FirebaseService from "../services/Firebase/Firebase.service";
import { QuizService } from "../services/Quiz/Quiz.service";

export const routesConfig: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
    loader: QuizService.getCategories,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/quiz/:id",
    element: <Quiz />,
    loader: QuizService.getQuizOnServer,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/result",
    element: <Result />,
    loader: FirebaseService.getAnswersOnServer,
    errorElement: <ErrorBoundary />,
  },
  { path: "*", element: <Error /> },
];

const router = createBrowserRouter(routesConfig, { basename: "/" });

function App() {
  return (
    <StandardTemplate>
      <RouterProvider router={router} />
    </StandardTemplate>
  );
}

export default App;

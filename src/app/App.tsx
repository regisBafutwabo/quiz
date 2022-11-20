import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { StandardTemplate } from "../components/templates/Standard/Standard";
import { Error } from "../pages/Error";
import { ErrorBoundary } from "../pages/Error/ErrorBoundary";
import { Home } from "../pages/Home";
import { Quiz } from "../pages/Quiz";
import { Result } from "../pages/Result";
import { QuizService } from "../services/Quiz/Quiz.service";

export const routesConfig = [
  {
    path: "/",
    element: <Home />,
    loader: QuizService.getCategories,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/quiz/:id",
    element: <Quiz />,
  },
  {
    path: "/result",
    element: <Result />,
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

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { StandardTemplate } from "../components/templates/Standard/Standard";
import { Error } from "../pages/Error";
import { Home } from "../pages/Home";
import { Quiz } from "../pages/Quiz";
import { Result } from "../pages/Result";
import { QuizService } from "../services/Quiz/Quiz.service";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: QuizService.getCategories,
  },
  {
    path: "/quiz/:id",
    element: <Quiz />,
  },
  { path: "/result", element: <Result /> },
  { path: "*", element: <Error type="404" /> },
]);

function App() {
  return (
    <StandardTemplate>
      <RouterProvider router={router} />
    </StandardTemplate>
  );
}

export default App;

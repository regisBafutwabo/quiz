import { useEffect } from "react";

import { initializeApp } from "firebase/app";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { StandardTemplate } from "../components/templates/Standard/Standard";
import { firebaseConfig } from "../constants/firebase";
import { Error } from "../pages/Error";
import { Home } from "../pages/Home";
import { Quiz } from "../pages/Quiz";
import { Result } from "../pages/Result";
import { QuizService } from "../services/Quiz/Quiz.service";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
      loader: QuizService.getCategories,
      errorElement: <Error type="404" />,
    },
    {
      path: "/quiz/:id",
      element: <Quiz />,
      errorElement: <Error type="404" />,
    },
    {
      path: "/result",
      element: <Result />,
      errorElement: <Error type="404" />,
    },
    { path: "*", element: <Error type="404" /> },
  ],
  { basename: "/" }
);

function App() {
  useEffect(() => {
    initializeApp(firebaseConfig);
  }, []);

  return (
    <StandardTemplate>
      <RouterProvider router={router} />
    </StandardTemplate>
  );
}

export default App;

import "./index.css";

import React from "react";

import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { StandardTemplate } from "./components/templates/Standard/Standard";
import { Error } from "./pages/Error";
import { Home } from "./pages/Home";
import { Quiz } from "./pages/Quiz";
import { Result } from "./pages/Result";
import reportWebVitals from "./reportWebVitals";
import { QuizService } from "./services/Quiz/Quiz.service";

const router = createBrowserRouter([
  {
    path: "/build",
    element: <Home />,
    loader: QuizService.getCategories,
    errorElement: <Error type="404" />,
  },
  {
    path: "/quiz/:id",
    element: <Quiz />,
  },
  { path: "/result", element: <Result /> },
  { path: "*", element: <Error type="404" /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <StandardTemplate>
        <RouterProvider router={router} />;
      </StandardTemplate>
    </HelmetProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

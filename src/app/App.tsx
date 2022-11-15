import { Route, Routes } from "react-router-dom";

import { StandardTemplate } from "../components/templates/Standard/Standard";
import { Error } from "../pages/Error";
import { Home } from "../pages/Home";
import { Quiz } from "../pages/Quiz";
import { Result } from "../pages/Result";

function App() {
  return (
    <StandardTemplate>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
        <Route path="*" element={<Error type="404" />} errorElement={<Error type="404" />} />
      </Routes>
    </StandardTemplate>
  );
}

export default App;

import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export const Quiz = () => {
  return (
    <>
      <Helmet>
        <title>귀즈 - Quiz</title>
      </Helmet>
      <h1>Quiz</h1>
      <p>
        <Link to={"/"}>Home</Link>
      </p>
      <p>
        <Link to={"/result"}>Results</Link>
      </p>
    </>
  );
};

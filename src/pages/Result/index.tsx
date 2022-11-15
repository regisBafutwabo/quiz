import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export const Result = () => {
  return (
    <>
      <Helmet>
        <title>귀즈 - Results</title>
      </Helmet>
      ;<h1>Result Page</h1>
      <p>
        <Link to={"/"}>Home</Link>
      </p>
      <p>
        <Link to={"/quiz"}>Quiz</Link>
      </p>
    </>
  );
};

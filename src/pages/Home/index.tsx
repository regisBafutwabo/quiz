import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <Helmet>
        <title>귀즈 - Home</title>
      </Helmet>
      <h1>Home</h1>
      <p>
        <Link to={"/quiz"}>Quiz</Link>
      </p>
      <p>
        <Link to={"/result"}>Results</Link>
      </p>
    </>
  );
};

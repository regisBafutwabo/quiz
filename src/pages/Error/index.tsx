import { useNavigate } from "react-router-dom";

import { ErrorProps } from "./Error.types";

export const Error = ({ type }: ErrorProps) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      {type === "404" && (
        <>
          <h2>Oops page not found!!</h2>
          <button onClick={goBack}>Back</button>
        </>
      )}
    </>
  );
};

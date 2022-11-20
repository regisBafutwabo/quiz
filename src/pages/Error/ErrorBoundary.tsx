import { useRouteError } from "react-router-dom";

import Image from "../../assets/images/400.svg";

export const ErrorBoundary = () => {
  const error = useRouteError();

  return (
    <div className="mt-20 flex-col items-center space-y-20 text-center">
      <div>
        <span className="text-2xl font-semibold">
          {"Oops!! We've encountered an error"}
        </span>
      </div>
      <div>
        <img className=" mx-auto h-96 w-96" src={Image} />
      </div>
      <div>
        <span className="text-xl font-bold">Error Details: </span>
        <span className="text-xl font-semibold text-red-500">
          {(error as Error).message}
        </span>
      </div>
    </div>
  );
};

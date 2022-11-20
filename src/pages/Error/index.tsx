import { useNavigate } from "react-router-dom";

import Image from "../../assets/images/404.svg";
import { MainButton } from "../../components/atoms";

export const Error = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="my-24 flex-col content-center items-center justify-center space-y-10 text-center">
      <img src={Image} className=" mx-auto h-96 w-96" />
      <MainButton isBlue id="home-button" onClick={goHome} label="Home" />
    </div>
  );
};

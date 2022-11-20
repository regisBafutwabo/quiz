import { MouseEvent } from "react";

export type MainButtonProps = {
  label: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  isBlue?: boolean;
  id: string;
};

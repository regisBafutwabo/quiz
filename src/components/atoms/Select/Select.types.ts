import { ChangeEvent } from "react";

export type SelectProps = {
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  label: string;
  defaultValue: string;
  options: { key: string; value: string }[];
};

import { ReactNode } from "react";

export const StandardTemplate = ({ children }: { children: ReactNode }) => {
  return <div style={{ padding: 16 }}>{children}</div>;
};

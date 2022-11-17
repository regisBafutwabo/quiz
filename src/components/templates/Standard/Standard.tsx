import { ReactNode } from "react";

export const StandardTemplate = ({ children }: { children: ReactNode }) => {
  return (
    <div style={{ padding: 16 }} className="mx-auto max-w-7xl">
      {children}
    </div>
  );
};

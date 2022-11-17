import create from "zustand";
import { persist } from "zustand/middleware";

interface TokenState {
  token: string;
  setToken: (token: string) => void;
}

export const useStore = create<TokenState>()(
  persist(
    (set) => ({
      token: "",
      setToken: (token) => set((state) => ({ ...state, token })),
    }),
    { name: "trivia-token" }
  )
);

import create from "zustand";

interface TimerState {
  time: string;
  setTime: (time: string) => void;
}

export const useTimerStore = create<TimerState>()((set) => ({
  time: "",
  setTime: (time) => set((state) => ({ ...state, time })),
}));

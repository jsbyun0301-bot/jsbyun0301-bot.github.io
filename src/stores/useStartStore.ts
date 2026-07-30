import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type StartState = {
  started: boolean;
  markStarted: () => void;
  reset: () => void;
};

export const useStartStore = create<StartState>()(
  persist(
    (set) => ({
      started: false,
      markStarted: () => set({ started: true }),
      reset: () => set({ started: false }),
    }),
    {
      name: 'start_store_session',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

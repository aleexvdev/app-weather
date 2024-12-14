import { create } from 'zustand';

interface GradeState {
  grade: string;
  setGrade: (grade: string) => void;
}

export const useGradeStore = create<GradeState>((set) => ({
  grade: 'C',
  setGrade: (grade: string) => set({ grade }),
}));
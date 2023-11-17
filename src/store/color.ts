import { Color } from '@/lib/types';
import { create } from 'zustand';

type ColorState = {
  currentColor: Color | null;
};

type ColorActions = {
  actions: {
    selectColor: (color: Color) => void;
  };
};

const initialState: ColorState = {
  currentColor: null,
};

const colorStore = create<ColorState & ColorActions>()((set) => ({
  ...initialState,
  actions: {
    selectColor: (color) => set({ currentColor: color }),
  },
}));

export const useCurrentColor = () => colorStore((state) => state.currentColor);
export const useColorActions = () => colorStore((state) => state.actions);

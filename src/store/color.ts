import { Color } from '@/lib/types';
import { create } from 'zustand';
import colors from '../data/vinilex-colors.json';

type ColorState = {
  currentColor: Color | null;
  colors: Color[];
  favoriteColors: Color['id'][];
};

type ColorActions = {
  actions: {
    selectColor: (color: Color) => void;
    addToFavoriteColors: (id: Color['id']) => void;
  };
};

const initialState: ColorState = {
  currentColor: null,
  colors,
  favoriteColors: [],
};

const colorStore = create<ColorState & ColorActions>()((set, get) => ({
  ...initialState,
  actions: {
    selectColor: (color) => set({ currentColor: color }),
    addToFavoriteColors: (id) =>
      set((state) => ({ favoriteColors: [...state.favoriteColors, id] })),
  },
}));

export const useCurrentColor = () => colorStore((state) => state.currentColor);
export const useColors = () => colorStore((state) => state.colors);
export const useFavoriteColors = () =>
  colorStore((state) => state.favoriteColors);
export const useColorActions = () => colorStore((state) => state.actions);

import { Color } from '@/lib/types';
import { create } from 'zustand';
import colors from '../data/vinilex-colors.json';

type ColorState = {
  currentColor: Color | null;
  colors: Color[];
  favoriteColors: Color['id'][];
  queryColors: Color[];
};

type ColorActions = {
  actions: {
    selectColor: (color: Color) => void;
    addToFavoriteColors: (id: Color['id']) => void;
    searchColors: (name: Color['name']) => void;
  };
};

const initialState: ColorState = {
  currentColor: null,
  colors,
  favoriteColors: [],
  queryColors: colors,
};

const colorStore = create<ColorState & ColorActions>()((set, get) => ({
  ...initialState,
  actions: {
    selectColor: (color) => set({ currentColor: color }),
    addToFavoriteColors: (id) =>
      set((state) => ({ favoriteColors: [...state.favoriteColors, id] })),
    searchColors: (name) =>
      set((state) => ({
        queryColors: state.colors.filter((color) =>
          color.name.toLowerCase().includes(name)
        ),
      })),
  },
}));

export const useCurrentColor = () => colorStore((state) => state.currentColor);
export const useColors = () => colorStore((state) => state.colors);
export const useFavoriteColors = () =>
  colorStore((state) => state.favoriteColors);
export const useQueryColors = () => colorStore((state) => state.queryColors);
export const useColorActions = () => colorStore((state) => state.actions);

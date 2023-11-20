import { COLORS } from '@/lib/constants';
import { Color, ColorFilterOption } from '@/lib/types';
import { create } from 'zustand';
import colors from '../data/vinilex-colors.json';

type ColorState = {
  currentColor: Color | null;
  colors: Color[];
  queryColors: Color[];
  favoriteColors: Color['id'][];
};

type ColorActions = {
  actions: {
    selectColor: (color: Color) => void;
    toggleFavoriteColors: (id: Color['id']) => void;
    searchColors: (name: Color['name'], filters?: ColorFilterOption[]) => void;
    addColor: (name: Color['name'], hexCode: Color['hexCode']) => void;
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
    toggleFavoriteColors: (id) =>
      set((state) => {
        const isIDExist = state.favoriteColors.find(
          (colorID) => colorID === id
        );

        let favoriteColors;
        if (isIDExist) {
          favoriteColors = state.favoriteColors.filter(
            (colorID) => colorID !== id
          );
        } else {
          favoriteColors = [...state.favoriteColors, id];
        }

        return {
          favoriteColors,
        };
      }),
    searchColors: (name, filters = []) =>
      set((state) => {
        let filteredQueryColors = state.colors.filter((color) =>
          color.name.toLowerCase().includes(name.toLowerCase())
        );

        if (filters.length !== 0) {
          filteredQueryColors = filteredQueryColors.filter((color) => {
            if (filters.includes('heart')) {
              return state.favoriteColors.includes(color.id);
            }
          });
        }

        return {
          queryColors: filteredQueryColors,
        };
      }),
    addColor: (name, hexCode) =>
      set((state) => ({
        colors: [
          {
            id: crypto.randomUUID(),
            name,
            hexCode: `#${hexCode.toUpperCase()}`,
            code: COLORS.CREATION,
          },
          ...state.colors,
        ],
      })),
  },
}));

export const useCurrentColor = () => colorStore((state) => state.currentColor);
export const useColors = () => colorStore((state) => state.colors);
export const useFavoriteColors = () =>
  colorStore((state) => state.favoriteColors);
export const useQueryColors = () => colorStore((state) => state.queryColors);
export const useColorActions = () => colorStore((state) => state.actions);

export interface Color {
  id: string;
  name: string;
  code: string;
  hexCode: string;
}

export type ColorFilterOption = 'heart';

export type ColorFilters = Record<ColorFilterOption, boolean>;

export type RGB = {
  r: number;
  g: number;
  b: number;
};

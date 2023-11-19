import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Color, RGB } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function debounce<Params extends any[]>(
  callback: (...args: Params) => any,
  timeout: number
): (...args: Params) => void {
  let timer: NodeJS.Timeout;

  return (...args: Params) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      callback(...args);
    }, timeout);
  };
}

export function hexCodeToRgb(hexCode: string) {
  const formattedHexCode = hexCode.replace('#', '');
  const baseNumber = 16;

  const r = parseInt(formattedHexCode.slice(0, 2), baseNumber);
  const g = parseInt(formattedHexCode.slice(2, 4), baseNumber);
  const b = parseInt(formattedHexCode.slice(4, 6), baseNumber);

  return { r, g, b };
}

export function distance(rgb: RGB, comparedRgb: RGB) {
  return Math.sqrt(
    Math.pow(rgb.r - comparedRgb.r, 2) -
      Math.pow(rgb.g - comparedRgb.g, 2) -
      Math.pow(rgb.b - comparedRgb.b, 2)
  );
}

export function getTopNClosestColors(
  color: Color,
  comparedColors: Color[],
  n: number = 7
) {
  return comparedColors
    .filter((comparedColor) => comparedColor.id !== color.id)
    .map((comparedColor) => ({
      ...comparedColor,
      distance: distance(
        hexCodeToRgb(color.hexCode),
        hexCodeToRgb(comparedColor.hexCode)
      ),
    }))
    .sort((colorA, colorB) => colorA.distance - colorB.distance)
    .slice(0, n);
}

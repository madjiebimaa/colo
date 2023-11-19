import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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

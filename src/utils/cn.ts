import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper utility for combining Tailwind CSS classes conditionally
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
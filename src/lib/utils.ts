import { ChartConfig } from '@/components/ui/chart';
import { ChartData } from '@/types/utils';
import { clsx, type ClassValue } from "clsx"
import dayjs from 'dayjs';
import { format } from 'path';
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatCurrency = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export const formatDateToBackend = (date: Date) => dayjs(date).format('YYYY-MM-DD');

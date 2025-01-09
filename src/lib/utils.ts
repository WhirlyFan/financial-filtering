import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { DataTableProps } from '@/types/aapl';
import { Table } from '@tanstack/react-table';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Column {
  id: string;
}

export const getMinMax = <TData>(table: Table<TData>, columnId: string) => {
  // react-table
  const allValues = table
    .getRowModel()
    .rows.map((row) => {
      const value = row.getValue(columnId);
      if (columnId === 'date') {
        return value &&
          (typeof value === 'string' || typeof value === 'number' || value instanceof Date)
          ? new Date(value).getFullYear()
          : null;
      }
      return typeof value === 'number' ? value : null;
    })
    .filter((value): value is number => typeof value === 'number');

  if (allValues.length === 0) {
    return { min: null, max: null };
  }

  const min = Math.min(...allValues);
  const max = Math.max(...allValues);
  return { min, max };
};

export const formatCurrency = (value: number | null) => {
  if (value === null) {
    return '-';
  }
  // In terms of billions
  if (value >= 1_000_000_000) {
    return (
      Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 3,
        minimumFractionDigits: 1,
      }).format(value / 1_000_000_000) + 'B'
    );
  } else if (value >= 1_000_000) {
    return (
      Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 3,
        minimumFractionDigits: 1,
      }).format(value / 1_000_000) + 'M'
    );
  }
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(value);
};

export function parseCurrency(value: string): number {
  const suffixMultipliers: Record<string, number> = {
    K: 1_000, // Thousands
    M: 1_000_000, // Millions
    B: 1_000_000_000, // Billions
    T: 1_000_000_000_000, // Trillions
  };

  // Remove currency symbols like '$', commas, or spaces
  const cleanedValue = value.replace(/[$,\s]/g, '');

  // Match the numeric part and an optional suffix
  const match = cleanedValue.match(/^([\d.]+)([KMBT]?)$/i);

  if (!match) {
    throw new Error(`Invalid currency format: ${value}`);
  }

  const numericPart = match[1]; // Extract the number
  const suffix = match[2]?.toUpperCase(); // Extract the suffix (if any)

  // Convert the numeric part to a number
  const baseValue = parseFloat(numericPart);

  if (isNaN(baseValue)) {
    throw new Error(`Invalid numeric value in currency: ${value}`);
  }

  // Multiply by the appropriate suffix multiplier
  return baseValue * (suffixMultipliers[suffix] || 1);
}

export function getDropDownValues<TData, TValue extends keyof TData>(
  data: DataTableProps<TData, TValue>['data'], // Extract 'data' from DataTableProps
  selector: TValue // Selector must be a key of TData
) {
  const uniqueArray = [...new Set(data.map((item) => item[selector]))];
  const noEmptyValues = uniqueArray.filter((element) => element !== null && element !== '').sort();
  const optionsArray = noEmptyValues.map((listItem) => ({
    value: String(listItem),
    label: String(listItem),
  }));
  return optionsArray;
}

export function moveColumnsDown(columnObj: Column[], columnId: string): string[] {
  const array: string[] = columnObj.map((item: Column) => item.id);
  const index = array.indexOf(columnId);
  if (index < 0 || index === array.length - 2) {
    //not found or next to actions which can't be moved
    return array;
  }

  const temp = array[index];
  array[index] = array[index + 1];
  array[index + 1] = temp;
  console.log(array);
  return array;
}

export function moveColumnsUp(columnObj: Column[], columnId: string): string[] {
  const array: string[] = columnObj.map((item: Column) => item.id);
  const index: number = array.indexOf(columnId);
  if (index < 2) {
    //not found or next to checkbox column which can't be moved
    return array;
  }

  const temp: string = array[index];
  array[index] = array[index - 1];
  array[index - 1] = temp;
  return array;
}

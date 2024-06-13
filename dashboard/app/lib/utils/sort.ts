import { SortType } from '../interfaces';

const normalizeValue = <T>(value: T): string | T => {
  if (typeof value === 'string') {
    return value.trim().toLowerCase();
  }

  return value;
};

const compareValues = <T>(
  prevValue: T,
  nextValue: T,
  sortOrder: SortType,
): number => {
  const convertPrevValue = normalizeValue(prevValue);
  const convertNextValue = normalizeValue(nextValue);

  if (sortOrder === SortType.ASC) {
    if (convertPrevValue > convertNextValue) return 1;
    if (convertPrevValue < convertNextValue) return -1;
  } else if (sortOrder === SortType.DESC) {
    if (convertPrevValue > convertNextValue) return -1;
    if (convertPrevValue < convertNextValue) return 1;
  }

  return 0;
};

export const handleSort = <T>(
  type: SortType = SortType.ASC,
  prevValue: T,
  nextValue: T,
): number => compareValues(prevValue, nextValue, type);

export const sortByKey = <T>(
  data: T[],
  key: keyof T,
  isAscending = true,
): T[] => {
  const sortedData = [...data];

  sortedData.sort((a, b) => {
    const aValue = normalizeValue(a[key]);
    const bValue = normalizeValue(b[key]);

    if (aValue > bValue) {
      return isAscending ? 1 : -1;
    }

    if (aValue < bValue) {
      return isAscending ? -1 : 1;
    }

    return 0;
  });

  return sortedData;
};

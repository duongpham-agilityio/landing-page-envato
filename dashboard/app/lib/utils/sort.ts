import { SortType } from '../interfaces';

const compareValues = (
  prevValue: string,
  nextValue: string,
  sortOrder: SortType,
): number => {
  const convertPrevValue: string = prevValue.toString().trim().toLowerCase();
  const convertNextValue: string = nextValue.toString().trim().toLowerCase();

  if (sortOrder === SortType.ASC) {
    if (convertPrevValue > convertNextValue) return 1;
    if (convertPrevValue < convertNextValue) return -1;
  } else if (sortOrder === SortType.DESC) {
    if (convertPrevValue > convertNextValue) return -1;
    if (convertPrevValue < convertNextValue) return 1;
  }

  return 0;
};

export const handleSort = (
  type: SortType = SortType.ASC,
  prevValue: string = 'prev',
  nextValue: string = 'next',
): number => compareValues(prevValue, nextValue, type);

export const sortByKey = <T>(
  data: T[],
  key: keyof T,
  isAscending = true,
): T[] => {
  const sortedData = [...data];

  sortedData.sort((a, b) => {
    if (a[key] > b[key]) {
      return isAscending ? 1 : -1;
    }

    if (a[key] < b[key]) {
      return isAscending ? -1 : 1;
    }

    return 0;
  });

  return sortedData;
};

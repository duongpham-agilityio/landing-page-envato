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
  type: SortType,
  prevValue: string,
  nextValue: string,
): number => compareValues(prevValue, nextValue, type);

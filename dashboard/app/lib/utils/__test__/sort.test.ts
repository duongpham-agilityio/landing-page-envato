import { SortType } from '@/lib/interfaces';
import { handleSort } from '../sort';

describe('handleSort function', () => {
  it('should correctly sort values in ascending order', () => {
    expect(handleSort(SortType.ASC, 'Apple', 'banana')).toBe(-1);
    expect(handleSort(SortType.ASC, 'banana', 'Apple')).toBe(1);
    expect(handleSort(SortType.ASC, 'apple', 'Apple')).toBe(0);
    expect(handleSort(SortType.ASC, 'Apple', 'apple')).toBe(0);
  });

  it('should correctly sort values in descending order', () => {
    expect(handleSort(SortType.DESC, 'Apple', 'banana')).toBe(1);
    expect(handleSort(SortType.DESC, 'banana', 'Apple')).toBe(-1);
    expect(handleSort(SortType.DESC, 'apple', 'Apple')).toBe(0);
    expect(handleSort(SortType.DESC, 'Apple', 'apple')).toBe(0);
  });

  it('should handle empty strings', () => {
    expect(handleSort(SortType.ASC, '', '')).toBe(0);
    expect(handleSort(SortType.DESC, '', '')).toBe(0);
    expect(handleSort(SortType.ASC, '', 'apple')).toBe(-1);
    expect(handleSort(SortType.DESC, 'banana', '')).toBe(-1);
  });

  it('should handle case sensitivity', () => {
    expect(handleSort(SortType.ASC, 'Apple', 'apple')).toBe(0);
    expect(handleSort(SortType.DESC, 'apple', 'Apple')).toBe(0);
    expect(handleSort(SortType.ASC, 'apple', 'Banana')).toBe(-1);
    expect(handleSort(SortType.DESC, 'Banana', 'apple')).toBe(-1);
  });
});

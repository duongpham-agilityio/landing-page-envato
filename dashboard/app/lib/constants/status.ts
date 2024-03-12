import { Status, StatusProduct } from '@/lib/interfaces';

export const STATUS_LABEL = {
  [Status.FULL_TIME]: 'primary',
  [Status.PART_TIME]: 'secondary',
  [Status.SENIOR_LEVEL]: 'tertiary',
  [Status.JUNIOR_LEVEL]: 'quaternary',
  [Status.PAID]: 'primary',
  [Status.UN_PAID]: 'secondary',
  [Status.CANCELLED]: 'tertiary',
  [Status.PENDING]: 'quaternary',
  [Status.COMPLETED]: 'primary',
  [Status.ARCHIVED]: 'quaternary',
  [Status.LOCK]: 'quaternary',
  [Status.UNLOCK]: 'primary',
  [StatusProduct.SOLD]: 'secondary',
  [StatusProduct.IN_STOCK]: 'primary',
};

export const STATUS_SUBMIT = {
  PENDING: 'pending',
  ERROR: 'error',
  SUCCESS: 'success',
};

export enum STATUS {
  ERROR = 'error',
  SUCCESS = 'success',
}

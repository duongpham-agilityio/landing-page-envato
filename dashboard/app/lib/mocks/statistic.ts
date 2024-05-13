// Libs
import { AxiosRequestHeaders, AxiosResponse } from 'axios';

// Types
import {
  IEfficiency,
  IRevenueFlow,
  ISpendingStatistics,
  TOverallBalance,
} from '@/lib/interfaces';

// Mocks
import {
  OVERALL_BALANCE_MOCK,
  REVENUE_FLOW_MOCK,
  SPENDING_STATISTICS_MOCK,
} from '.';

export const STATISTICAL = [
  {
    id: '656ee2dfebaa8bd1cdee2d0a',
    title: 'Total Earnings',
    total: 7245,
    growth: 3.5,
    weeklyIncome: [30, 40, 45, 50, 49, 60, 91],
  },
  {
    id: '656ee3a2ebaa8bd1cdee2d0b',
    title: 'Total Spending',
    total: 7245,
    growth: 3.5,
    weeklyIncome: [20, 40, 60, 80, 90, 110, 130],
  },
  {
    id: '656ee413ebaa8bd1cdee2d0c',
    title: 'Spending Goal',
    total: 7245,
    growth: 3.5,
    weeklyIncome: [30, 40, 45, 50, 49, 60, 91],
  },
];

export const EFFICIENCY: IEfficiency = {
  arrival: 5230,
  spending: 6230,
  statistical: [
    {
      title: 'Goal',
      value: 50,
    },
    {
      title: 'Spend',
      value: 30,
    },
  ],
};

export const MOCK_EFFICIENCY_SUCCESS_RES: AxiosResponse<IEfficiency> = {
  data: EFFICIENCY,
  status: 200,
  statusText: 'Ok',
  headers: {},
  config: {
    headers: {} as AxiosRequestHeaders,
  },
};

export const MOCK_OVERALL_BALANCE_RES: AxiosResponse<TOverallBalance> = {
  data: OVERALL_BALANCE_MOCK,
  status: 200,
  statusText: 'Ok',
  headers: {},
  config: {
    headers: {} as AxiosRequestHeaders,
  },
};

export const MOCK_REVENUE_RES: AxiosResponse<IRevenueFlow[]> = {
  data: REVENUE_FLOW_MOCK,
  status: 200,
  statusText: 'Ok',
  headers: {},
  config: {
    headers: {} as AxiosRequestHeaders,
  },
};

export const MOCK_STATISTIC_RES: AxiosResponse<ISpendingStatistics[]> = {
  data: SPENDING_STATISTICS_MOCK,
  status: 200,
  statusText: 'Ok',
  headers: {},
  config: {
    headers: {} as AxiosRequestHeaders,
  },
};

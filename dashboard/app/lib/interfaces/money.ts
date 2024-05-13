export type TMoney = {
  amount: number;
};

export type TAddMoney = TMoney & {
  userId: string;
};

export type TSendMoney = TAddMoney & {
  memberId: string;
};

export type TMoneyResponse = {
  message: string;
};

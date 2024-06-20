export interface IUserBase {
  id: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  avatarURL: string;
  email: string;
}

export type THiringAgent = Pick<
  IUserBase,
  'firstName' | 'lastName' | 'avatarURL'
> & {
  role: string;
  experience: string;
};

export type TEmployee = Omit<IUserBase, 'email'> & {
  lastActive: string;
  lastPlace: string;
  workTime: string;
  level: string;
  position: string;
  salary: number;
  experience: string;
  jobTitle: string;
  hiringAgent: THiringAgent;
};

export type TAddress = {
  street?: string;
  city?: string;
  state: string;
  zip?: number;
};

export type TCustomer = Pick<IUserBase, 'email'> & {
  customerId?: string | null;
  role?: string;
  firstName: string;
  lastName: string;
  avatar: string;
  address: TAddress;
};

export type TUserDetail = Omit<IUserBase, 'avatarURL'> & {
  _id?: string;
  title?: string;
  avatarURL?: string;
  password: string;
  phoneNumber: string;
  country: string;
  city: string;
  address: string;
  postalCode: string;
  facebookURL?: string;
  twitterURL?: string;
  linkedinURL?: string;
  youtubeURL?: string;
  pinCode?: string;
  role?: string;
  description?: string;
  bonusTimes?: number;
  isBlock: boolean;
  uid: string;
};

export interface TPassword {
  memberId: string;
  oldPassword: string;
  newPassword: string;
}

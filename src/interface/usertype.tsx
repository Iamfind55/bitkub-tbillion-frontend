import { IWallet } from "./ownerwallet";

export interface IUserType {
  id: number;
  accountId: number;
  name: string;
  email: string;
  password: string;
  status: string;
  address: string;
  phone: string;
  role: string;
  dob: string;
  gender: string;
  filename: string;
  createdAt: Date;
  userId: string;
  wallet: IWallet[]
}

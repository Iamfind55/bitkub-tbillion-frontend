import { IUserType } from "./usertype";

export interface IWallet {
  walletId: string;
  type: string;
  balance: string;
  exchangeRate: string;
  createdAt: string;
  updatedAt: string;
  user: IUserType | null;
}

export interface IOwnerWallet {
  walletId: string;
  type: string;
  balance: string;
  exchangeRate: string;
  createdAt: string;
  updatedAt: string;
  user: IUserType;
}

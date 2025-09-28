import { IBank } from "./banktype";
import { IWallet } from "./ownerwallet";

export interface ITransaction {
  transactionId: string;
  type: string;
  method: string;
  amount: string;
  status: string;
  createdAt: string;
  updatedAt?: any;
  wallet?: IWallet | null;
  bank: IBank;
}

import { IBank } from "./banktype";
import { IWallet } from "./ownerwallet";

export interface ITransaction {
  withdrawId: any;
  accountNumber: string;
  name: string;
  accountName: string;
  transactionId: string;
  type: string;
  method: string;
  amount: string;
  status: string;
  createdAt: Date;
  bank?: IBank;
  wallet?: IWallet;
}
export interface ITrade {
  accountNumber: any;
  name: any;
  tradeId: string;
  type: string;
  trade: string;
  percent: number;
  quantity: string;
  price: string;
  number?: any;
  startDate: string;
  endDate: string;
  status: string;
  isTransfer: boolean;
  isTrade: boolean;
  duration: { unit: string };
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

export interface Iqrcode {
  qrId?: string;
  qr: any;
  name: string;
  accountNumber: string;
  path: string;
  
}

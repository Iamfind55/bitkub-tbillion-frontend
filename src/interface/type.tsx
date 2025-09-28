
export interface IType {
  name: string;
  walletTypeId: string;
  symbol: string;
  code: string;
  rate: string;
  createdAt: Date;
}

export interface IType {
  name: string;
  walletTypeId: string;
  symbol: string;
  code: string;
  rate: string;
  createdAt: Date;
}

export interface IListcoinType {
  walletId: string;
  balance: string;
  createdAt: string;
  updatedAt?: any;
  createdBy?: any;
  type: IWalletType;
}

 

interface IWalletType {
  walletTypeId: string;
  name: string;
  symbol: string;
  code: string;
  rate: string;
  createdAt: string;
  updatedAt?: any;
}

export interface ITransactionCoin {
  coinId: string;
  name: string;
  amount: string;
  type: string;
  image: string;
  status: string;
  createdAt: string;
  updatedAt?: any;
}

export interface IDataQR {
  qrId: string;
  name: string;
  accountNumber: string;
  qr: string;
  path: string;
  status: string;
  createdAt: string;
  updatedAt?: any;
  createdBy: string;
}
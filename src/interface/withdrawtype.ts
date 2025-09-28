export interface IFormWithdraw {
  name: string;
  accountName: string;
  accountNumber: string;
  amount: string;
}

export interface IWithdraw {
  withdrawId: string;
  name: string;
  accountName: string;
  accountNumber: string;
  amount: string;
  status: string;
  createdAt: string;
}
 
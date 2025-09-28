import { IUserType } from "./usertype";

export interface IBank {
    bankId: string;
    name: string;
    accountName: string;
    accountNumber: string;
    createdAt: string;
    updatedAt?: any;
    user:IUserType;
  }
export interface IFormCreateBank { 
    name: string;
    accountName: string;
    accountNumber: string; 
  }
export interface IFormUpdateBank {  
    name: string;
    accountName: string;
    accountNumber: string; 
  }
  
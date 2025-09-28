import { IUserType } from "./usertype";

export interface IRoleType{
     id: string;
     name: string;
     user:IUserType
}
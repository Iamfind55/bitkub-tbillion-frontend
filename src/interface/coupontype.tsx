import { ECoupon } from "@/enum/enum";

export interface ICoupon  {
  couponId: string;
  percent: number;
  startDate: string;
  endDate: string;
  status: ECoupon;
  createdAt: Date;
  updatedAt: Date;
}

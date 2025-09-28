"use client";
import { LinkApi } from "@/enum/linkapi";
import useApi from "@/services/api";
import Button from "@/utils/Button";
import Textfield from "@/utils/Textfield";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";
type IFormcoupon = {
  percent: number;
  startDate: string;
  endDate: string;
  status: string;
};
export default function FormCreateCoupon() {
  const router = useRouter();
  const api = useApi();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    api({
      url: LinkApi.coupons,
      method: "post",
      params: formdata,
    }).then((res: any) => {
      if (res.status == 200) {
        console.log(res);
        Swal.fire("Create Success full!", "", "success");
        router.push("/backend/coupon");
      } else {
        Swal.fire("Create Fail!", res.message, "error");
      }
    });
  };

  const [formdata, setFormdata] = useState<IFormcoupon>({
    percent: 0,
    startDate: "",
    endDate: "",
    status: "OPENING",
  });

  const handleonkeyup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };

  const handleCancel = () => {
    setFormdata({
      percent: 0,
      startDate: "",
      endDate: "",
      status: "OPENING",
    });
  };

  return (
    <>
      <h3 className="text-2xl font-bold py-3">Create Coupon</h3>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-12  gap-5">
          <div className="lg:col-span-6 md:col-span-12 col-span-12">
            <Textfield
              type="number"
              name="percent"
              value={formdata.percent}
              placeholder="Enter Percent"
              title="Percent(%)"
              id="percent"
              onChange={handleonkeyup}
              required
            />
          </div>

          <div className="lg:col-span-6 md:col-span-6 col-span-12"></div>
          <div className="lg:col-span-6 md:col-span-6 col-span-12">
            <Textfield
              type="date"
              name="startDate"
              value={formdata.startDate}
              placeholder="Enter Start Date"
              title="Start Date"
              id="startDate"
              onChange={handleonkeyup}
              required
            />
          </div>
          <div className="lg:col-span-6 md:col-span-6 col-span-12">
            <Textfield
              type="date"
              name="endDate"
              onChange={handleonkeyup}
              value={formdata.endDate}
              placeholder="Enter End Date"
              title="End Date"
              id="endDate"
              required
            />
          </div>
          <div className="col-span-12 flex gap-5">
            <Button
              type="reset"
              title="Reset"
              className="bg-danger rounded text-white"
              onClick={handleCancel}
            />
            <Button
              type="submit"
              title="Save"
              className="bg-primary rounded text-white"
            />
          </div>
        </div>
      </form>
    </>
  );
}

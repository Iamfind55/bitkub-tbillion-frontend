"use client";
import { LinkApi } from "@/enum/linkapi";
import useApi from "@/services/api";
import Button from "@/utils/Button";
import Loader from "@/utils/Loader";
import Select from "@/utils/Select";
import Textfield from "@/utils/Textfield";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
type IFormcoupon = {
  couponId: string;
  percent: number;
  startDate: string;
  endDate: string;
  status: string;
};

export default function FormUpdateCoupon() {
  const router = useRouter();
  const { id } = useParams();
  const firstId = Array.isArray(id) ? id[0] : id;
  const decodedParams = firstId
    ? JSON.parse(decodeURIComponent(firstId))
    : null;
  const api = useApi();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    api({
      url: `${LinkApi.coupons}/${decodedParams?.couponId}`,
      method: "put",
      params: formdata,
    }).then((res: any) => {
      if (res.status == 200) {
        Swal.fire("Update Success full!", "", "success");
        router.push("/backend/coupon");
      } else {
        Swal.fire("Update Fail!", res.message, "error");
      }
    });
  };
  const defaultValues = {
    percent: decodedParams?.percent,
    startDate: decodedParams?.startDate,
    endDate: decodedParams?.endDate,
    status: decodedParams?.status,
  };
  const initialValues = {
    percent: 0,
    startDate: "",
    endDate: "",
    status: "OPENING",
  };
  const [formdata, setFormdata] = useState(
    { ...defaultValues } || initialValues
  );

  const handleonkeyup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };
  const optionStatus: any = [
    { label: "OPENING", value: "OPENING" },
    { label: "CLOSED", value: "CLOSED" },
  ]
  return (
    <>
      <h3 className="text-2xl font-bold py-3">Update Coupon |</h3>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-12  gap-5">
          <div className="mt-1 lg:col-span-6 md:col-span-12 col-span-12">
            <Textfield
              type="number"
              name="percent"
              value={formdata?.percent}
              placeholder="Enter Percent"
              title="Percent(%)"
              id="percent"
              onChange={handleonkeyup}
              required
            />
          </div>

          <div className="lg:col-span-6 md:col-span-6 col-span-12">
            <label className="text-sm font-medium">Status</label>
            <Select
              className="rounded-md w-full border border-warning focus:border-warning focus:bg-white focus:ring-1 focus:ring-warning text-base outline-none text-dark py-3 px-2 leading-8 transition-colors duration-200 ease-in-out"
              name="status"
              value={formdata?.status}
              option={optionStatus}
              onChange={handleonkeyup}
            />
          </div>
          <div className="lg:col-span-6 md:col-span-6 col-span-12">
            <Textfield
              type="date"
              name="startDate"
              value={formdata?.startDate}
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
              value={formdata?.endDate}
              placeholder="Enter End Date"
              title="End Date"
              id="endDate"
              required
            />
          </div>
          <div className="col-span-12 flex gap-5">
            <Button
              type="reset"
              title="Cancel"
              className="bg-danger rounded text-white"
              onClick={() => router.push("/backend/coupon")}
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

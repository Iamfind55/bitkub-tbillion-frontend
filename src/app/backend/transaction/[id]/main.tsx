"use client";
import { LinkApi } from "@/enum/linkapi";
import { FormatDate } from "@/helper/format";
import { setIsOpen, setRefresh } from "@/redux/slice/dialogSlice";
import { useAppSelector } from "@/redux/store";
import useApi from "@/services/api";
import useFilter from "@/services/filternavbarservice";
import { useGetWithdraw } from "@/services/transactionservice";
import Dialog from "@/utils/Dialog";
import TextfieldDefault from "@/utils/TextFiledDefault";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

function MainWithDrawDetail() {
  const { id } = useParams();
  const api = useApi();
  const router = useRouter();
  const filter = useFilter();
  const withdrawHook = useGetWithdraw({ filter: filter.state });
  const { refreshData } = withdrawHook;
  const data = JSON.parse(decodeURIComponent(Array.isArray(id) ? id[0] : id));
  const dispatch = useDispatch();

  const handleApprove = async (value: string) => {
    try {
      const result = await api({
        url: `${LinkApi.withdraw}/${data.withdrawId}`,
        method: "put",
        params: { status: value },
      });
      if (result.status == 200) {
        toast.success(`${value} success`);
        setTimeout(() => {
          router.back();
        }, 500);
        dispatch(setRefresh(true));
        refreshData();
      }
    } catch (error) {
      console.log(`${error}`);
    }
  };

  return (
    <div className="py-8 px-5">
      <div>
        <h5 className="mt-5 font-bold mb-3 text-medium">Bill details</h5>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
          <p>Total</p>
          <p>Date</p>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
          <p className="font-bold text-base">{data.amount} USDT</p>
          <p className="font-bold text-base">{FormatDate(data.createdAt)}</p>
        </div>
        <h5 className="font-bold py-3">Payee information</h5>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
          <p>Payee name</p>
          <p>Payee email</p>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
          <p className="font-bold text-sm">{data.wallet.user.name}</p>
          <p className="font-bold text-sm">{data.wallet.user.email}</p>
        </div>
        <h5 className="font-bold py-3">Transaction information</h5>
        <table>
          <thead>
            <tr>
              <td className="w-60">Account Name</td>
              <td className="w-40">Account Number</td>
              <td className="w-36">Status</td>
              <td className="w-40">Date</td>
              <td className="w-40">Amount</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="text-start">{data.accountName}</th>
              <th className="text-start">{data.accountNumber}</th>
              <th className="text-start">{data.status}</th>
              <th className="text-start">{FormatDate(data.createAt)}</th>
              <th className="text-start">{data.amount} USDT</th>
            </tr>
          </tbody>
        </table>

        <div className="flex mt-5 sm:mt-12 justify-start">
          <button
            className="bg-success rounded px-4 py-2 hover:bg-green-400"
            onClick={() => handleApprove("completed")}
          >
            Approve
          </button>
          <button
            className="bg-danger rounded ml-3 px-4 hover:bg-red-400"
            onClick={() => handleApprove("rejected")}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainWithDrawDetail;

"use client";
import { limitOptions } from "@/enum/option";
import { FormatDatetime, FormatNumber } from "@/helper/format";
import useApi from "@/services/api";
import { useGetWithdraws } from "@/services/transactionservice";
import Button from "@/utils/Button";
import Pagination from "@/utils/Pagination";
import Select from "@/utils/Select";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useFilter from "../user/hooks/useFilter";
import { useState } from "react";
import Link from "next/link";

export default function TableWithdraw() {
  const api = useApi();
  const filter = useFilter();
  const withdrawHook = useGetWithdraws({ filter: filter.state });
  const { data, loading, total, error, refreshData } = withdrawHook;
  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>();

  const handleApprove = (id: string) => {
    Swal.fire({
      title: "Are you sure approve withdraw?",
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete!",
      cancelButtonText: "Cancel",
      icon: "warning",
    }).then((result) => {
      if (result.isConfirmed) {
        api({
          url: `/withdraws/${id}`,
          method: "put",
          params: { status: "completed" },
        }).then((res) => {
          if (res?.status == 200) {
            refreshData();
            toast.success("Confirm Approve Success!");
          } else {
            console.log(res);
          }
        });
      }
    });
  };
  const handlePageClick = (event: any) => {
    const selected = event.selected;
    filter.dispatch({
      type: filter.ACTION_TYPE.PAGINATION,
      payload: selected + 1 || 0,
    });
  };
  const handleReject = (id: string) => {
    Swal.fire({
      title: "Are you sure for reject?",
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete!",
      cancelButtonText: "Cancel",
      icon: "warning",
    }).then((result) => {
      if (result.isConfirmed) {
        api({
          url: `/withdraws/${id}`,
          method: "put",
          params: { status: "rejected" },
        }).then((res: any) => {
          if (res?.status == 200) {
            toast.success("Confirm reject Success!");
          } else {
            console.log(res);
          }
        });
      }
    });
  };

  return (
    <div>
      <div className="w-full overflow-x-auto">
        <div className="flex justify-between mt-2">
          <Select
            option={limitOptions}
            value={filter.state.pageSize || ""}
            onChange={(e: any) =>
              filter.dispatch({
                type: filter.ACTION_TYPE.PAGE_ROW,
                payload: e.target.value || null,
              })
            }
            className="px-2 lg:py-2 z-auto text-base text-gray-900 border border-gray-300 rounded-lg focus:border-gray-200 bg-gray-50 min-w-[70px]"
          />
          <div className="flex mb-2 mr-2 px-2">
            <ReactDatePicker
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                filter.dispatch({
                  type: filter.ACTION_TYPE.START_DATE,
                  payload: date,
                });
              }}
              dateFormat="yyyy-MM-dd"
              placeholderText="yyyy-mm-dd"
              className="border border-gray-400 mr-2 sm:mr-0 rounded-lg px-4 py-2 w-full"
              wrapperClassName="custom-datepicker-wrapper"
              popperClassName="custom-popper"
            />
            <ReactDatePicker
              selected={endDate}
              onChange={(date) => {
                setEndDate(date);
                filter.dispatch({
                  type: filter.ACTION_TYPE.END_DATE,
                  payload: date,
                });
              }}
              dateFormat="yyyy-MM-dd"
              placeholderText="yyyy-mm-dd"
              className="border border-gray-400 ml-2 rounded-md px-4 py-2 w-full"
              wrapperClassName="custom-datepicker-wrapper"
              popperClassName="custom-popper"
            />
          </div>
        </div>
        <table className="table mt-2">
          <thead>
            <tr>
              <th className="w-[70px]">#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Account name</th>
              <th>Account number</th>
              <th>Amount</th>

              <th className="w-[50px]">Status</th>
              <th className="w-[200px]">Date</th>
              <th className="w-[220px]">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <td className="text-center">
                    {index +
                      1 +
                      Number(
                        filter.state.pageSize * (filter.state.currentPage - 1)
                      )}
                  </td>
                  <td className="text-center">{item?.wallet?.user?.name}</td>
                  <td className="text-center">{item?.wallet?.user?.email}</td>
                  <td className="text-left">{item?.accountName}</td>
                    <td className="text-left">{item?.accountNumber}</td>
                  <td className="text-center">
                    {FormatNumber(Number(item?.amount))} USDT
                  </td>

                  <td className={`text-center`}>
                    <span
                      className={`${
                        item.status === "rejected"
                          ? "badge-danger"
                          : item.status === "completed"
                          ? "badge-success"
                          : item.status === "pending"
                          ? "badge-warning"
                          : "badge-info"
                      }`}
                    >
                      {item?.status}
                    </span>
                  </td>
                  <td className="text-center">
                    {FormatDatetime(item?.createdAt)}
                  </td>
                  <td className="flex justify-center items-center gap-2">
                    <Button
                      onClick={() => handleApprove(item?.transactionId)}
                      title="Approve"
                      className={`bg-success rounded text-white h-[30px] 
                    ${item?.status == "pending" ? "block" : "hidden"}`}
                    />
                    <Button
                      onClick={() => handleReject(item?.transactionId)}
                      title="Reject"
                      className={`bg-danger rounded text-white h-[30px] ${
                        item?.status == "pending" ? "block" : "hidden"
                      }`}
                    />
                    <Button
                      title="checkend"
                      className={`bg-info opacity-70 rounded pointer-events-none text-white h-[30px] ${
                        item?.status != "pending" ? "block" : "hidden"
                      }`}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="text-center">
                  No Data ...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {total > filter.state.pageSize && (
        <div className="py-2 mb-2">
          <Pagination
            handlePageClick={handlePageClick}
            pageCount={total}
            filter={filter}
          />
        </div>
      )}
    </div>
  );
}

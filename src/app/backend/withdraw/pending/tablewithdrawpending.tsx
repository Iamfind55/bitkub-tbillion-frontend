"use client";
import { LinkApi } from "@/enum/linkapi";
import { limitOptions } from "@/enum/option";
import { FormatDate, FormatNumber } from "@/helper/format";
import { setIsOpen, setRefresh } from "@/redux/slice/dialogSlice";
import { useAppSelector } from "@/redux/store";
import useApi from "@/services/api";
import { useGetWithdraw } from "@/services/transactionservice";
import Button from "@/utils/Button";
import Dialog from "@/utils/Dialog";
import Pagination from "@/utils/Pagination";
import Select from "@/utils/Select";
import TextfieldDefault from "@/utils/TextFiledDefault";
import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import Swal from "sweetalert2";
import useFilter from "../../user/hooks/useFilter";

export default function Tablewithdrawpending() {
  const dispatch = useDispatch();
  const api = useApi();
  const filter = useFilter();
  const withdrawHook = useGetWithdraw({ filter: filter.state });
  const { data, loading, total, error, refreshData } = withdrawHook;
  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>();
  const dialog = useAppSelector((state) => state.dialog);
  const [dataEvents, setDataEvents] = useState<any | null>(null);

  const handlePageClick = (event: any) => {
    const selected = event.selected;
    filter.dispatch({
      type: filter.ACTION_TYPE.PAGINATION,
      payload: selected + 1 || 0,
    });
  };

  const handleClose = () => {
    dispatch(setIsOpen({ isOpen: false, status: null }));
  };

  useEffect(() => {
    const socket = io(`${process.env.NEXT_PUBLIC_API_SOCKET}`);
    socket.on("withdraw", () => {
      refreshData();
    });
    return () => {
      socket.disconnect();
    };
  }, [refreshData]);

  const handleApprove = async (id: string) => {
    const result = await api({
      url: `/withdraws/${id}`,
      method: "put",
      params: { status: "completed" },
    });
    if (result.status == 200) {
      toast.success("approval");
      refreshData();
      dispatch(setRefresh(true));
    }
  };
  const handlePending = async (id: string) => {
    await api({
      url: `/withdraws/${id}`,
      method: "put",
      params: { status: "pending" },
    });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    handleClose();
    try {
      const result = await api({
        url: `${LinkApi.withdraw}/edit/${dataEvents?.withdrawId}`,
        method: "put",
        params: dataEvents,
      });
      if (result.status === 200) {
        await handlePending(dataEvents?.withdrawId);
        toast.success("Edit success");
        refreshData();
      }
    } catch (error) {
      console.log(error);
    }
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
            refreshData();
            dispatch(setRefresh(true));
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
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Banck name</th>
              <th>Account name</th>
              <th>Account number</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th className="w-[150px]">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="text-left">{index + 1}</td>
                    <td className="text-left">{item?.wallet?.user?.name}</td>
                    <td className="text-left">{item?.name}</td>
                    <td className="text-left">{item?.accountName}</td>
                    <td className="text-left">{item?.accountNumber}</td>
                    <td className="text-left">
                      {FormatNumber(Number(item?.amount))} USDT
                    </td>
                    <td className={`text-left`}>
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
                        {item.status}
                      </span>
                    </td>
                    <td className="text-center">
                      {FormatDate(item?.createdAt)}
                    </td>
                    <td className="flex justify-center items-center gap-2">
                      <Button
                        className="bg-info text-gray-100 rounded h-[30px] "
                        title="Edit"
                        onClick={() => {
                          const newItem = {
                            withdrawId: item.withdrawId,
                            username: item?.wallet?.user?.name,
                            name: (item?.name as string) ?? "",
                            accountName: (item?.accountName as string) ?? "",
                            accountNumber:
                              (item?.accountNumber as string) ?? "",
                          };

                          setDataEvents(newItem);
                          dispatch(
                            setIsOpen({ isOpen: true, status: "approve" })
                          );
                        }}
                      />
                      <Button
                        title="Approve"
                        className={`bg-success rounded text-white h-[30px] 
                    ${item?.status == "pending" ? "block" : "hidden"}`}
                        onClick={() => handleApprove(item?.withdrawId)}
                      />
                      <Button
                        onClick={() => handleReject(item?.withdrawId)}
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
                );
              })
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

      <Dialog
        titleClose="Cancel"
        titleSave="Save"
        isOpen={dialog.isOpen}
        onClose={handleClose}
        className="bg-white overflow-auto mt-10 text-info p-6  rounded z-50 w-[80%] md:w-1/4 max-h-[85vh]"
      >
        <form onSubmit={handleSubmit}>
          <h6 className="text-2xl font-bold mb-5">Approval withdraw</h6>
          <div className="mb-2">
            <TextfieldDefault
              title="Username"
              type="text"
              required
              value={dataEvents?.username}
              onChange={(e) =>
                setDataEvents({ ...dataEvents, username: e.target.value })
              }
            />
          </div>
          <div className="mb-2">
            <TextfieldDefault
              title="Bank Name"
              type="text"
              required
              value={dataEvents?.name}
              onChange={(e) =>
                setDataEvents({ ...dataEvents, name: e.target.value })
              }
            />
          </div>

          <div className="mb-2">
            <TextfieldDefault
              title="Bank Account"
              type="text"
              required
              placeholder="Bank name"
              onChange={(e) =>
                setDataEvents({ ...dataEvents, accountName: e.target.value })
              }
              value={dataEvents?.accountName}
            />
          </div>
          <div className="mb-2">
            <TextfieldDefault
              title="Bank  Account Number"
              type="text"
              required
              placeholder="12346789"
              value={dataEvents?.accountNumber}
              onChange={(e) =>
                setDataEvents({ ...dataEvents, accountNumber: e.target.value })
              }
            />
          </div>

          <div className="flex gap-2 mt-5">
            <button
              className="px-3 py-1 rounded-md border border-gray-400 transition-all duration-200 text-md"
              onClick={handleClose}
            >
              Close
            </button>
            <button
              type="submit"
              className="hover:text-gray-6s00 px-3 py-1 bg-yellow-500  rounded-md transition-all duration-200 text-md"
            >
              Edit
            </button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}

"use client";
import { DepositColumns } from "@/column/column";
import { FormatDate } from "@/helper/format";
import { setIsOpen } from "@/redux/slice/dialogSlice";
import useApi from "@/services/api";
import { useGetDeposits } from "@/services/depositservice";

import { LinkApi } from "@/enum/linkapi";
import { limitOptions } from "@/enum/option";
import { useAppSelector } from "@/redux/store";
import ButtonIcon from "@/utils/ButtonIcon";
import Dialog from "@/utils/Dialog";
import { EditIcon } from "@/utils/Icons";
import Pagination from "@/utils/Pagination";
import Select from "@/utils/Select";
import TextfieldDefault from "@/utils/TextFiledDefault";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import useFilter from "../user/hooks/useFilter";
import { GrView } from "react-icons/gr";
interface DataType {
  image?: any;
  username?: string;
  coinId?: string;
  name?: string;
  amount?: string;
  email?: string;
}
function DepositMain() {
  const dispatch = useDispatch();
  const api = useApi();
  const filter = useFilter();
  const [status, setStatus] = useState("");
  const userHook = useGetDeposits({ filter: filter.state });
  const { data, total, loading, error, refreshData } = userHook;
  const [dataEvents, setDataEvents] = useState<{
    action: string;
    data: DataType;
  }>({ action: "", data: {} });
  const dialog = useAppSelector((state) => state.dialog);
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    handleClose();
    try {
      const result = await api({
        url: `${LinkApi.coin}/approve/${dataEvents?.data.coinId}`,
        method: "put",
        params: { status: status },
      });

      if (result.status === 200) {
        toast.success("approval success");
        refreshData();
      } else if (result.status == 400) {
        toast.warning(result.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <h6 className="px-1 py-1 text-gray-800 font-bold">Manage coins</h6>
        <div className="mb-3 md:flex sm:block justify-between mt-2">
          <div className="flex mb-2 sm:mb-0">
            <Select
              option={limitOptions}
              value={filter.state.pageSize || ""}
              onChange={(e: any) =>
                filter.dispatch({
                  type: filter.ACTION_TYPE.PAGE_ROW,
                  payload: e.target.value || "",
                })
              }
              className="mr-2 px-5 py-2 w-32 text-base text-gray-900 border border-gray-300 rounded-lg focus:border-blue-500 bg-gray-50  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>
        <div className="overflow-auto mt-2">
          {data?.length > 0 && (
            <table className="table overflow-x-auto text-sm">
              <thead>
                <tr>
                  {DepositColumns?.map((column, index: number) => (
                    <th key={index + 1}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((item: any, index: number) => {
                  let status;
                  if (item.status === "completed") {
                    status = "badge-success";
                  } else if (item.status === "rejected") {
                    status = "badge-danger";
                  } else {
                    status = "badge-info";
                  }
                  return (
                    <tr key={index}>
                      <td>
                        {index +
                          1 +
                          Number(
                            filter.state.pageSize *
                              (filter.state.currentPage - 1)
                          )}
                      </td>
                      <td>{item.user?.name}</td>
                      <td>{item.user.email}</td>
                      <td>{item.name}</td>
                      <td>{item.amount}</td>
                      <td>{item.type}</td>
                      <td>
                        <div title="pending">
                          <span
                            className={`${status} text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded`}
                          >
                            {item.status}
                          </span>
                        </div>
                      </td>
                      <td>{FormatDate(item.createdAt)}</td>
                      <td className="text-right">
                        <div className="flex justify-end">
                          <ButtonIcon
                            icon={<GrView size={18} />}
                            onClick={() => {
                              const newItem = {
                                coinId: item.coinId,
                                username: item.user.name,
                                email: item?.user?.email,
                                name: item.name,
                                amount: item.amount,
                                image: item.image,
                              };
                              setDataEvents({ action: "edit", data: newItem });
                              dispatch(
                                setIsOpen({ isOpen: true, status: "editCoin" })
                              );
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
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

      {dialog?.status == "editCoin" && (
        <Dialog
          titleClose="Cancel"
          titleSave="Save"
          isOpen={dialog.isOpen}
          onClose={handleClose}
          className="bg-white overflow-auto mt-10 text-info p-6  rounded z-50 w-[80%] md:w-1/4 max-h-[85vh]"
        >
          <form onSubmit={handleSubmit}>
            <h6 className="text-2xl font-bold mb-5">Approval coin</h6>
            <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-2 mb-5">
              <TextfieldDefault
                title="Name"
                type="text"
                required
                disabled
                value={dataEvents?.data?.username}
              />

              <TextfieldDefault
                disabled
                title="Email"
                type="text"
                required
                value={dataEvents?.data?.email}
              />
            </div>
            <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-2 mb-5">
              <TextfieldDefault
                title="Type"
                type="text"
                disabled
                required
                value={dataEvents?.data?.name}
              />
              <TextfieldDefault
                title="Amount"
                type="text"
                disabled
                required
                value={dataEvents?.data.amount || ""}
              />
            </div>
            <div className="mt-5">
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}/images/${dataEvents.data?.image}`}
                alt="profile"
                className="w-40 h-40 rounded-sm"
              />
            </div>
            <div className="flex gap-2 mt-5">
              <button
                type="submit"
                className="hover:text-gray-6 px-3 py-1 bg-success text-gray-200 rounded-md transition-all duration-200 text-md"
                onClick={() => setStatus("completed")}
              >
                approval
              </button>
              <button
                type="submit"
                className="hover:text-gray-6 px-3 py-1 bg-danger text-gray-200  rounded-md transition-all duration-200 text-md"
                onClick={() => setStatus("rejected")}
              >
                Reject
              </button>
            </div>
          </form>
        </Dialog>
      )}
    </div>
  );
}
export default DepositMain;

"use client";
import { WithDrawColumns } from "@/column/column";
import { LinkApi } from "@/enum/linkapi";
import { limitOptions } from "@/enum/option";
import { FormatDate } from "@/helper/format";
import { setRefresh } from "@/redux/slice/dialogSlice";
import useApi from "@/services/api";
import { useGetWithdraw } from "@/services/transactionservice";
import Button from "@/utils/Button";
import Loader from "@/utils/Loader";
import Pagination from "@/utils/Pagination";
import SearchInput from "@/utils/SearchInput";
import Select from "@/utils/Select";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import useFilter from "../user/hooks/useFilter";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

function ManiWithdraw() {
  const api = useApi();
  const filter = useFilter();
  const withdrawHook = useGetWithdraw({ filter: filter.state });
  const { data, loading, total, error, refreshData } = withdrawHook;
  const dispatch = useDispatch();

  const handlePageClick = (event: any) => {
    const selected = event.selected;
    filter.dispatch({
      type: filter.ACTION_TYPE.PAGINATION,
      payload: selected + 1 || 0,
    });
  };
  const handleEnter = (e: any) => {
    if (e.key === "Enter") {
      filter.dispatch({
        type: filter.ACTION_TYPE.SEARCH,
        payload: e.target.value ?? "",
      });
    } else if (e.target.value?.length < 2) {
      filter.dispatch({
        type: filter.ACTION_TYPE.SEARCH,
        payload: "",
      });
    }
  };
  const handleEventApprove = async (value: string, id: string) => {
    const result = await api({
      url: `${LinkApi.withdrawApprove}/${id}`,
      method: "put",
      params: { status: value },
    });
    if (result.status == 200) {
      toast.success(`Approve ${value} success`);
      dispatch(setRefresh(true));
    }
    refreshData();
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

  return (
    <div>
      <div className="flex mb-3 justify-between sm:mb-0">
        <Select
          option={limitOptions}
          value={filter.state.pageSize || ""}
          onChange={(e: any) =>
            filter.dispatch({
              type: filter.ACTION_TYPE.PAGE_ROW,
              payload: e.target.value || null,
            })
          }
          className="w-16"
        />
        <SearchInput onKeyDown={handleEnter} />
      </div>
      <div className="overflow-x-auto">
        {loading && <Loader />}
        {!loading && !error && data && (
          <table className="table text-sm mt-2">
            <thead>
              <tr>
                {WithDrawColumns.map((column) => {
                  return <th key={column}>{column}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((row: any, index) => {
                  let status;
                  if (row.status === "completed") {
                    status = "badge-success";
                  } else {
                    status = "badge-warning";
                  }
                  return (
                    <tr key={index}>
                      {index +
                        1 +
                        Number(
                          filter.state.pageSize * (filter.state.currentPage - 1)
                        )}
                      <td>{row?.wallet?.user.name}</td>
                      <td>{row.amount}</td>
                      <td>{row.type}</td>
                      <td>{row.method}</td>
                      <td>
                        <div title="pending">
                          <span
                            className={`${status} text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300`}
                          >
                            {row.status}
                          </span>
                        </div>
                      </td>
                      <td>{FormatDate(row.createdAt)}</td>
                      <td className="flex justify-center">
                        <Button
                          title="Approve"
                          className="badge-success"
                          onClick={() =>
                            handleEventApprove("completed", row.transactionId)
                          }
                        />
                        <Button
                          title="Reject"
                          className="badge-danger ml-2"
                          onClick={() =>
                            handleEventApprove("rejected", row.transactionId)
                          }
                        />
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
  );
}

export default ManiWithdraw;

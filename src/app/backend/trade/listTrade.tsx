"use client";
import { TradeListColumn } from "@/column/column";
import { limitOptions } from "@/enum/option";
import { FormatDate } from "@/helper/format";
import useApi from "@/services/api";
import { useGetTrade } from "@/services/tradeservice";
import Loader from "@/utils/Loader";
import Pagination from "@/utils/Pagination";
import Select from "@/utils/Select";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useFilter from "../user/hooks/useFilter";

function ListTrade() {
  const api = useApi();
  const filter = useFilter();

  const tradeHook = useGetTrade({ filter: filter.state });
  const { data, loading, total, error } = tradeHook;
  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>();

  const handlePageClick = (event: any) => {
    const selected = event.selected;
    filter.dispatch({
      type: filter.ACTION_TYPE.PAGINATION,
      payload: selected + 1 || 0,
    });
  };
  return (
    <div>
      <div className="mb-3 md:flex sm:block justify-between mt-2">
        <div className="flex mb-2 sm:mb-0">
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
        </div>
        <div className="block sm:flex">
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
      </div>
      <div className="overflow-x-auto">
        {loading && <Loader />}
        {!loading && !error && data && (
          <table className="table text-sm">
            <thead>
              <tr>
                {TradeListColumn.map((column) => {
                  return <th key={column}>{column}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((row: any, index) => {
                  let status;
                  if (row.status === "win") {
                    status = "badge-success";
                  } else {
                    status = "badge-warning";
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
                      <td>{row?.wallet?.user.name}</td>
                      <td>${row.quantity}</td>
                      <td>{row.type}</td>
                      <td>{row.trade}</td>
                      <td>{row.duration?.unit}</td>
                      <td>
                        <div title="pending">
                          <span className={`${status} capitalize`}>
                            {row.status}
                          </span>
                        </div>
                      </td>
                      <td>{FormatDate(row.createdAt)}</td>
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

export default ListTrade;

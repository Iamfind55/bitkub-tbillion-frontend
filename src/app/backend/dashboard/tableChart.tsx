"use client";
import { FormatDate } from "@/helper/format";
import { useGetCurrentDateTransaction } from "@/services/transactionservice";
import Pagination from "@/utils/Pagination";
import useFilter from "../user/hooks/useFilter";

function TableChart() {
  const filter = useFilter();
  const transactionHook = useGetCurrentDateTransaction({
    filter: filter.state,
  });
  const { data, loading, total, error } = transactionHook;
  const columns = ["Username", "Category", "Price", "Date", "Status"];
  const handlePageClick = (event: any) => {
    const selected = event.selected;
    filter.dispatch({
      type: filter.ACTION_TYPE.PAGINATION,
      payload: selected + 1 || 0,
    });
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {data?.length > 0 && (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th key={column} scope="col" className="px-6 py-3">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 &&
              data.map((row: any, index) => {
                let statusBg;
                if (row.status === "pending") {
                  statusBg = "bg-warning";
                } else if (row.status === "completed") {
                  statusBg = "bg-success";
                } else {
                  statusBg = "bg-danger";
                }
            
                return (
                  <tr
                    key={index}
                    className="odd:bg-white even:bg-gray-50  border-b"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {row?.wallet?.user?.name}
                    </th>
                    <td className="px-6 py-4">{row.type}</td>
                    <td className="px-6 py-1">{row.amount}</td>
                    <td className="px-6 py-4">{FormatDate(row.createdAt)}</td>
                    <td className="px-6 py-4 text-gray-100">
                      <div
                        className={`${statusBg} text-center rounded-md px-2`}
                      >
                        {row.status}
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
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

export default TableChart;

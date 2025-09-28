"use client";
import { LinkApi } from "@/enum/linkapi";
import { useGetCoupon } from "@/services/couponservice";
import useHandleDelete from "@/services/deleteservice";
import Button from "@/utils/Button";
import ErrorPage from "@/utils/ErrorPage";
import Loader from "@/utils/Loader";
import Pagination from "@/utils/Pagination";
import Select from "@/utils/Select";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import useFilter from "../user/hooks/useFilter";

export default function TableCoupon() {
  const router = useRouter();
  const filter = useFilter();
  const couponHook = useGetCoupon({ filter: filter.state });
  const { handleDelete } = useHandleDelete();
  const { data, total, loading, error } = couponHook;

  const options: any = [
    { label: 10, value: 10 },
    { label: 20, value: 20 },
    { label: 50, value: 5 },
    { label: 100, value: 100 },
  ];
  const handlePageClick = (event: any) => {
    const selected = event.selected;
    filter.dispatch({
      type: filter.ACTION_TYPE.PAGINATION,
      payload: selected + 1 || 0,
    });
  };
  const handleUserDelete = async (couponId: string) => {
    try {
      const url = `${LinkApi.coupons}/${couponId}`;
      const deleteResult = await handleDelete(url);
      if (deleteResult.status === 200) {
        couponHook.refreshData();
        Swal.fire("Delete Successful!", "", "success");
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (error) {
    return <ErrorPage />;
  }
  return (
    <div>
      {loading && <Loader />}
      {!loading && !error && data && (
        <div>
          <div className="mb-3 flex justify-between mt-2">
            <Select
              name="pageSize"
              option={options}
              value={filter.state.pageSize || ""}
              onChange={(e: any) =>
                filter.dispatch({
                  type: filter.ACTION_TYPE.PAGE_ROW,
                  payload: e.target.value || null,
                })
              }
              className="px-2 lg:py-2 z-auto text-base text-gray-900 border border-gray-300 rounded-lg focus:border-gray-200 bg-gray-50 min-w-[70px]"
            />
            <Button
              title="Add new"
              className="bg-info text-white rounded-lg px-1 ml-2 py-2"
              onClick={() => router.push("/backend/coupon/create")}
            />
          </div>
          <div className="w-full overflow-x-auto mb-[60px]">
            <table className="table text-sm">
              <thead>
                <tr>
                  <th className="w-[60px] text-center">#</th>
                  <th>Percent</th>
                  <th>Date Start</th>
                  <th>Date End</th>
                  <th>Status</th>
                  <th className="w-[200px]">Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.length > 0 &&
                  data?.map((item, index) => {
                    let status;
                    if (item?.status === "opening") {
                      status = "badge-success";
                    } else {
                      status = "badge-danger";
                    }

                    return (
                      <tr key={index}>
                        <td className="text-center">{index + 1}</td>
                        <td>{item?.percent}</td>
                        <td>{item?.startDate}</td>
                        <td>{item?.endDate}</td>
                        <td>
                          <span title="pending" className={`${status}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="flex gap-2">
                          <button
                            className="btn btn-danger"
                            onClick={() => handleUserDelete(item.couponId)}
                          >
                            Delete
                          </button>
                          <Link
                            href={`/backend/coupon/edit/${encodeURIComponent(
                              JSON.stringify(item)
                            )}`}
                            className="btn btn-primary"
                          >
                            Edit
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            {data?.length > filter?.state.pageSize && (
              <div className="py-2 mb-2">
                <Pagination
                  handlePageClick={handlePageClick}
                  pageCount={total}
                  filter={filter}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

"use client";
import { limitOptions } from "@/enum/option";
import { FormatDatetime, FormatNumber } from "@/helper/format";
import Iconattachmoney from "@/icon/iconattachmoney";
import { ITransaction } from "@/interface/interfaceType";
import { useTranslation } from "@/lib/i18n";
import useApi from "@/services/api";
import Select from "@/utils/Select";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

export default function TableTransaction() {
  const {t}=useTranslation()
  const [mytransaction, setMytransaction] = useState<ITransaction[]>([]);
  const [pagination, setPagination] = useState<{
    pageSize: number;
    page: number;
    total: number;
    sortBy: string;
    order: string;
  }>({
    pageSize: 10,
    page: 1,
    total: 0,
    sortBy: "createdAt",
    order: "DESC",
  });
  const api = useApi();
  useEffect(() => {
    api({ url: "transactions/owner", method: "get", params: pagination }).then(
      (res) => {
        setMytransaction(res.data);
        setPagination({ ...pagination, total: res.total });
      }
    );
  }, [setMytransaction, pagination?.page, pagination?.pageSize]);

  const getStatus = (status: string) => {
    return (
      <span
        className={`
            ${
              status === "pending"
                ? "badge-warning"
                : status === "completed"
                ? "badge-success"
                : status === "rejected"
                ? "badge-danger"
                : status === "canceled"
                ? "badge-primary"
                : "badge-danger"
            }`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="w-full overflow-x-auto md:mt-5 mt-3 pb-5">
      <div className="w-[80px]">
        <Select
          value={pagination?.pageSize.toString()}
          option={limitOptions}
          name="limit"
          onChange={(e: any) => {
            setPagination({
              ...pagination,
              pageSize: Number(e.target.value),
              page: 1,
            });
          }}
          className="w-[100px] h-[40px] shadow-lg text-primary rounded border border-info"
        />
      </div>

      <div className="grid grid-cols-12 lg:gap-5 gap-3  md:mt-5 mt-3">
        {mytransaction.length > 0 ? (
          mytransaction.map((item: ITransaction, index) => (
            <div
              className="bg-info rounded select-none shadow xl:col-span-3 lg:col-span-4 md:col-span-6 col-span-12"
              key={index}
            >
              <div className="flex justify-between">
                <div className="flex gap-5 justify-between items-center px-5 py-3">
                  <div className="flex items-center justify-center bg-warning lg:text-3xl text-2xl p-1 shadow-lg text-white rounded-full">
                    <Iconattachmoney />
                  </div>
                  <div>
                    <div className="text-md uppercase">{t("hero.type")}: {item?.type}</div>
                    <div className="text-sm text-success font-bold uppercase">
                      {t("hero.amount")}: {FormatNumber(Number(item?.amount))}$
                    </div>
                    {getStatus(item?.status)}
                    <div className="text-[10px] text-stone-200 mt-1">
                      {FormatDatetime(item?.createdAt)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center col-span-12">{t("hero.notData")}</div>
        )}
      </div>

      <div
        className={`mt-5 ${
          Number(pagination?.total) > Number(pagination?.pageSize)
            ? "block"
            : "hidden"
        }`}
      >
        <ReactPaginate
          activeClassName="active"
          breakClassName="break-me"
          containerClassName="pagination"
          disabledClassName="disabled"
          nextClassName="next"
          nextLabel="next"
          pageClassName="page"
          onPageChange={(e) => {
            setPagination({ ...pagination, page: e.selected + 1 });
          }}
          pageCount={Number(pagination?.total) / Number(pagination?.pageSize)} // 10 / 2 = 5
          marginPagesDisplayed={1}
          pageRangeDisplayed={1}
          previousClassName="previous"
          previousLabel="pre"
        />
      </div>
    </div>
  );
}

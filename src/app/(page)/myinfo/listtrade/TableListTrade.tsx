"use client";
import { limitOptions } from "@/enum/option";
import { FormatDatetime, FormatNumber } from "@/helper/format";
import Iconchart from "@/icon/iconchart";
import Iconcirclecheck from "@/icon/iconcirclecheck";
import { ITrade } from "@/interface/interfaceType";
import { useTranslation } from "@/lib/i18n";
import { refreshwallet } from "@/redux/slice/walletSlice";
import useApi from "@/services/api";
import Select from "@/utils/Select";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";


export default function TableListTrade() {
  const { t } = useTranslation()
  const [data, setData] = useState<ITrade[]>([]);
  const dispatch = useDispatch();
  const [pagination, setPagination] = useState<{
    pageSize: number;
    page: number;
    total: number;
    sortBy: string;
    order: string;
  }>({
    pageSize: 9,
    page: 1,
    total: 0,
    sortBy: "createdAt",
    order: "DESC",
  });

  const api = useApi();

  useEffect(() => {
    loadwithdraw();
  }, [setData, pagination?.page, pagination?.pageSize]);

  const loadwithdraw = () => {
    api({ url: "trades/owner", method: "get", params: pagination }).then(
      (res) => {
        setData(res.data);
        setPagination({ ...pagination, total: res.total });
      }
    );
  };

  const handleTransfer = (id: string) => {
    api({
      url: `trades/transfer/${id}`,
      method: "put",
      params: { isTransfer: true },
    }).then((res) => {
      if (res.status === 200) {
        dispatch(refreshwallet());
        loadwithdraw();
        toast.success(t("hero.trade200"));
      } else {
        console.log(res);
      }
    });
  };

  const getstatustransfer = (data: ITrade) => {
    if (data?.isTransfer === false && data?.status === "win") {
      return (
        <button
          onClick={() => {
            handleTransfer(data?.tradeId);
          }}
          className="bg-success md:p-[5px] p-1  w-[120px] rounded 
            transition duration-100 active:scale-110 flex items-center justify-center"
        >
          <span className="text-[12px] block p-0">
            <Iconcirclecheck />
          </span>{" "}
          {t("hero.move200")}
        </button>
      );
    } else if (data?.isTransfer === true && data?.status === "win") {
      return <span className="text-success uppercase text-sm">สมบูรณ์</span>;
    } else {
      return "";
    }
  };
  const getstatustrade = (data: ITrade) => {
    if (data?.status === "win") {
      return (
        <div
          className="w-10 h-10 p-2 
           select-none rounded-full flex justify-center 
            items-center bg-success 
            uppercase text-[12px]"
        >
          {data?.status}
        </div>
      );
    } else if (data?.status === "lost") {
      return (
        <div
          className="w-10 h-10 p-2 
           select-none rounded-full flex justify-center 
            items-center bg-danger 
            uppercase text-[12px]"
        >
          {data?.status}
        </div>
      );
    } else {
      return (
        <div
          className="w-10 h-10 p-2 
           select-none rounded-full flex justify-center 
            items-center bg-warning 
            uppercase text-[12px]"
        >
          <Iconchart />
        </div>
      );
    }
  };

  return (
    <div className="w-full overflow-x-auto mt-5 pb-5">
      <div className="w-full flex justify-between items-center">
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
      <div className="grid grid-cols-12 lg:gap-10 md:gap-5 gap-2 mt-5">
        {data.length > 0 ? (
          data.map((item: ITrade, index) => (
            <div
              className="col-span-12 md:col-span-6 xl:col-span-4"
              key={index}
            >
              <div className="bg-info px-5 py-3  rounded shadow text-sm">
                <div className="w-full flex justify-between items-center gap-x-5">
                  {getstatustrade(item)}
                  <div className="w-full grid grid-cols-2 gap-x-5">
                    <div className="grid-col-1">
                      <div>{t("hero.amount")}: {FormatNumber(Number(item?.quantity))}$</div>
                      <div>{t("hero.percent")}: {item?.percent}%</div>
                      <div className="text-lg font-bold text-success">
                        {t("hero.all")}
                        <span>
                          {FormatNumber(
                            Number(item?.quantity) + Number(item?.price)
                          )}
                          <span className="text-sm"> USDT</span>
                        </span>
                      </div>
                      <div className="text-[9px] opacity-80">
                        {FormatDatetime(item?.createdAt)}
                      </div>
                    </div>
                    <div className="grid-col-1 flex flex-col ">
                      <div>
                        {t("hero.type")}:
                        <span className="uppercase text-warning">
                          {item?.type}
                        </span>
                      </div>
                      <div>
                        {t("hero.trade")}:
                        {item?.trade === "up" ? (
                          <span className="text-success uppercase"> ขึ้น</span>
                        ) : (
                          <span className="text-danger uppercase"> ลง</span>
                        )}
                      </div>
                      {/* <div>{item?.tradeId}</div> */}
                      <div>{t("hero.move200")}: {item?.isTransfer ? " Yes" : " No"}</div>
                      <div className="flex gap-x-2 items-center">
                        {getstatustransfer(item)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-12 text-center">{t("hero.notData")}</div>
        )}
      </div>

      <div
        className={`mt-5 ${Number(pagination?.total) > Number(pagination?.pageSize)
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
          previousLabel="prev"
        />
      </div>
    </div>
  );
}

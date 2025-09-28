"use client";

import { limitOptions } from "@/enum/option";
import { FormatDatetime, FormatNumber } from "@/helper/format";
import Iconcheckinvoice from "@/icon/iconcheckinvoice";
import { IFormWithdraw, IWithdraw } from "@/interface/withdrawtype";
import { useTranslation } from "@/lib/i18n";
import { refreshwallet } from "@/redux/slice/walletSlice";
import useApi from "@/services/api";
import Button from "@/utils/Button";
import Numberfield from "@/utils/Numberfield";
import Select from "@/utils/Select";
import Textfield from "@/utils/Textfield";
import MyModal from "@/utils/modal";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

export default function TableWithdraw() {
  const { t } = useTranslation();

  const formempty: IFormWithdraw = {
    name: "",
    accountName: "",
    accountNumber: "",
    amount: "",
  };

  const dispatch = useDispatch();
  const [isopen, setIsopen] = useState(false);
  const [reload, setReload] = useState(false);
  const [datawithdraw, setDatawithdraw] = useState<IWithdraw[]>([]);
  const [formwithdraw, setFormwithdraw] = useState<IFormWithdraw>(formempty);
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
    const socket = io(`${process.env.NEXT_PUBLIC_API_SOCKET}`); // Replace with your server URL
    socket.on("confirm_withdraw", (res: any) => {
      setReload((prevReload) => !prevReload);
    });
    return () => {
      socket.disconnect();
    };
  }, [setReload]);

  useEffect(() => {
    loadwithdraw();
  }, [setDatawithdraw, pagination?.page, pagination?.pageSize, reload]);

  const loadwithdraw = () => {
    api({
      url: "withdraws/owner",
      method: "get",
      params: pagination,
    }).then((res) => {
      setDatawithdraw(res?.data);
      setPagination({ ...pagination, total: res?.total });
    });
  };

  const keyup = (e: any) => {
    setFormwithdraw({ ...formwithdraw, [e.target.name]: e.target.value });
  };
  const handleWithdraw = (e: any) => {
    e.preventDefault();
    api({
      url: "withdraws",
      method: "post",
      params: formwithdraw,
    }).then((res) => {
      if (res?.status == "200") {
        toast.success(t("withdraw.success"));
        setIsopen(false);
        dispatch(refreshwallet());
        loadwithdraw();
      }
    });
  };

  console.log(datawithdraw);

  return (
    <div className="w-full overflow-x-auto mt-8">
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

        <button
          className="btn flex gap-2 uppercase btn-warning"
          onClick={() => setIsopen(true)}
        >
          <span className="font-bold">
            <Iconcheckinvoice />
          </span>{" "}
          {t("wirthdraw")}
        </button>
      </div>


      <div className="grid grid-cols-12 gap-5 mt-5 pb-5">
        {datawithdraw.length > 0 ? (
          datawithdraw.map((item: IWithdraw, index) => (
            <div
              className="col-span-12 md:col-span-6 xl:col-span-4 bg-info py-3 px-5 rounded shadow select-none"
              key={index}
            >
              <div>
                <div className="flex flex-col gap-1">
                  <div className="text-sm uppercase">
                    {t("bank.bank_name")}: {item?.name}{" "}
                  </div>
                  <div className="text-sm uppercase">
                    {t("bank.bank_account_name")}: {item?.accountName}
                  </div>
                  <div className="text-sm uppercase">
                    {t("bank.bank_account_number")}: {item?.accountNumber}
                  </div>
                  <div className="text-sm text-success font-bold">
                    {t("list_coin_amount")}: {FormatNumber(Number(item?.amount))} USDT
                  </div>

                  <div className="w-full flex items-center justify-between ">
                    <div className="text-[12px]">
                      {FormatDatetime(item?.createdAt)}
                    </div>
                    <div
                      className={`select-none
                                        ${item?.status === "pending"
                          ? "badge-warning"
                          : item?.status === "completed"
                            ? "badge-success"
                            : "badge-danger"
                        }`}
                    >
                      {item?.status == "pending"
                        ? t("list_coin_pending")
                        : item?.status == "completed"
                          ? t("list_coin_completed")
                          : t("list_coin_reject")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-12 text-center">{t("list_coin_no_data")}</div>
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
          previousLabel="pre"
        />
      </div>

      <MyModal
        isOpen={isopen}
        onClose={() => setIsopen(!isopen)}
        className="w-[350px] md:w-[400px]"
      >
        <h3 className="text-lg text-center font-bold">ฟอร์มถอนเงิน</h3>
        <form onSubmit={handleWithdraw} className="md:py-4 md:px-5 p-1">
          <div className="flex flex-col gap-3">
            <Textfield
              required
              value={formwithdraw.name}
              title={t("bank.bank_name")}
              name="name"
              placeholder={t("bank.bank_name_placeholder")}
              id="name"
              onChange={keyup}
            />

            <Textfield
              required
              value={formwithdraw.accountName}
              title={t("bank.bank_account_name")}
              name="accountName"
              placeholder={t("bank.bank_account_name_placeholder")}
              id="accountName"
              onChange={keyup}
            />

            <Textfield
              required
              value={formwithdraw.accountNumber}
              title={t("bank.bank_account_number")}
              name="accountNumber"
              placeholder={t("bank.bank_account_number_placeholder")}
              id="accountNumber"
              onChange={keyup}
            />

            <Numberfield
              title={t("withdraw_amount")}
              id="amount"
              required
              type="number"
              placeholder={t("withdraw_amount_placeholder")}
              name="amount"
              value={formwithdraw.amount}
              onChange={(e) => {
                const value = e.target.value.replace(/,/g, "");
                setFormwithdraw({
                  ...formwithdraw,
                  [e.target.name]: Number(value),
                });
              }}
            />

            <Button
              value="Confirm"
              title={t("confirm.button")}
              className="bg-warning text-white rounded  py-3 mt-3"
            />
          </div>
        </form>
      </MyModal>
    </div>
  );
}

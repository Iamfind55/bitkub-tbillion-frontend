"use client";
import { IDurationType } from "@/interface/durationType";
import { IFormTrade } from "@/interface/formtradetype";
import { ITrade } from "@/interface/interfaceType";
import { IOwnerWallet } from "@/interface/ownerwallet";
import { closetrade, opentrade } from "@/redux/slice/tradeSlice";
import { refreshwallet } from "@/redux/slice/walletSlice";
import useApi from "@/services/api";
import Button from "@/utils/Button";
import Numberfield from "@/utils/Numberfield";
import { useParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import Timecountdowntrade from "@/helper/timecountdowntrade";
import { useDispatch, useSelector } from "react-redux";
import MyModal from "@/utils/modal";

export default function Formsubmitrading() {
  const [duration, setDuration] = useState<IDurationType[]>([]);
  const [timetrade, setTimetrade] = useState<IDurationType | any>();
  const [wallet, setWallet] = useState<IOwnerWallet>();
  const [data, setData] = useState<ITrade>();
  const [currentdate, setCurrentdate] = useState(new Date());
  const dispatch = useDispatch();
  const [isTrade, setIsTrade] = useState(false);
  const [openmodal, setOpenmodal] = useState(false);

  const redux = useSelector((state: any) => state.trade);
  const reduxwallet = useSelector((state: any) => state.wallet);

  const param = useParams();
  let FormTradeEmty = {
    type: "BTCUSDT",
    quantity: 0,
    duration: "0",
    trade: "",
  };
  const [trade, setTrade] = useState<IFormTrade>(FormTradeEmty);
  const api = useApi();
  useEffect(() => {
    api({ url: "durations", method: "get", params: {} }).then((res) => {
      if (res?.status && res?.status == 200) {
        setDuration(res.data);
      } else {
        console.log(res);
      }
    });
  }, []);

  useEffect(() => {
    loadwallet();
  }, [reduxwallet?.wallet?.refresh]);

  useEffect(() => {
    loadwallet();
    setIsTrade(false);
    loadtrade();
  }, [setWallet, setData, setCurrentdate]);
  data?.startDate && currentdate && data?.endDate;
  const loadtrade = () => {
    api({ url: "trades/owner/last-trade", method: "get", params: {} }).then(
      (res) => {
        if (res?.status === 200) {
          setCurrentdate(res?.currentDate);
          setData(res?.data);
          if (res?.data?.isTrade) {
            dispatch(opentrade()); // ເປິດ status trade
          } else {
            dispatch(closetrade()); // ເປິດ status trade
          }
        } else {
          console.log(res);
        }
      }
    );
  };

  const loadwallet = () => {
    api({ url: "wallets/account", method: "get", params: {} }).then((res) => {
      if (res?.status) {
        setWallet(res?.data);
      }
    });
  };

  const handleChooseDuraction = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    localStorage.setItem(
      "duration",
      JSON.stringify(
        duration.find((item) => item.durationId === e.currentTarget.value)
      )
    );
    setTimetrade(
      duration.find((item) => item.durationId === e.currentTarget.value)
    );
    setTrade({ ...trade, duration: e.currentTarget.value });
  };

  useMemo(() => {
    if (timetrade?.durationId !== undefined) {
      setTrade({ ...trade, type: param?.name.toString() });
    }
  }, [timetrade, param?.name]);

  const handleTrade = (e: any) => {
    e.preventDefault();
    if (
      trade?.duration === "0" ||
      trade?.duration === undefined ||
      trade?.duration === null
    ) {
      toast.warning("โปรดเลือกระยะเวลา.");
      return;
    }

    if (!["up", "down"].includes(trade?.trade)) {
      toast.warning(`กรุณาเลือก ขึ้น หรือ ลง!` + trade.trade);
      return;
    }

    if (trade?.quantity === 0 || trade?.quantity === undefined) {
      toast.warning("กรุณาระบุจำนวนเงิน.");
      return;
    }

    if (Number(trade?.quantity) > Number(wallet?.balance)) {
      toast.warning("ยอดเงินไม่เพียงพอ.");
      return;
    }
    if (Number(trade?.quantity) > Number(wallet?.balance)) {
      toast.warning("ยอดเงินไม่เพียงพอ.");
      return;
    }

    if (Number(trade?.quantity) < Number(timetrade?.minPrice)) {
      toast.warning(`จำนวนเงินขั้นต่ำ ${timetrade?.minPrice}`);
      return;
    }

    setIsTrade(true);
    api({ url: "trades", method: "post", params: trade }).then((res) => {
      setIsTrade(false);
      if (res?.status === 200) {
        setTrade(FormTradeEmty);
        setTimetrade(undefined);
        loadwallet();
        loadtrade();
        dispatch(refreshwallet());
        dispatch(opentrade()); // ເປິດ status trade
        // toast.success("ทำธุรกรรมสำเร็จ.");
        setOpenmodal(false);
        
        // window.location.reload();
      } else {
        console.log(res);
      }
    });
  };

  return (
    <div
      className={`${
        redux?.trade?.status ? "pointer-events-none select-none" : ""
      } `}
    >
      <div
        className={`grid grid-cols-12 gap-5  ${
          redux?.trade?.status ? "hidden" : "block my-3"
        }`}
      >
        <div className="col-span-12 flex justify-center gap-5">
          <Button
            title="ลง"
            value="down"
            onClick={(e) => {
              setTrade({ ...trade, trade: e.currentTarget.value });
              setOpenmodal(true);
            }}
            className={`bg-danger md:py-3 py-2 text-default rounded select-none md:w-[150px] w-full ${
              redux?.trade?.status ? "opacity-70" : ""
            }`}
          />
          <Button
            title="ขึ้น"
            value="up"
            onClick={(e) => {
              setTrade({ ...trade, trade: e.currentTarget.value });
              setOpenmodal(true);
            }}
            className={`bg-success md:py-3 py-2 text-default rounded select-none md:w-[150px] w-full ${
              redux?.trade?.status ? "opacity-70" : ""
            }`}
          />
        </div>
      </div>
      <MyModal
        isOpen={openmodal}
        className="md:w-[400px] w-[300px] "
        onClose={() => setOpenmodal(!openmodal)}
      >
        <div className="grid grid-cols-12 gap-2 text-info">
          <div className="col-span-12 select-none">ระยะเวลา</div>
          {duration.length > 0 &&
            duration.map((item: IDurationType, index) => {
              let i18nDuration = "";

              if (item?.unit == "second") {
                i18nDuration = "วินาที";
              } else if (item?.unit == "minute") {
                i18nDuration = "นาที";
              } else if (item?.unit == "hour") {
                i18nDuration = "ชั่วโมง";
              } else if (item?.unit == "day") {
                i18nDuration = "วัน";
              } else if (item?.unit == "week") {
                i18nDuration = "อาทิตย์";
              }

              return (
                <div className="col-span-6" key={index}>
                  <button
                    type="button"
                    name="number"
                    onClick={handleChooseDuraction}
                    value={item?.durationId}
                    className={`${
                      trade.duration === item?.durationId
                        ? "bg-success"
                        : "bg-info/90 "
                    }
                  text-sm rounded select-none w-full text-white
                  rounded-fixed flex items-center justify-center hover:opacity-80  
                  transition duration-300 px-[10px] py-2 lg:text-md font-bold active:scale-105`}
                  >
                    {item?.number} {i18nDuration} / {item?.percent}%
                  </button>
                </div>
              );
            })}
        </div>

        <form onSubmit={handleTrade} className="grid grid-cols-12 gap-2 mt-3">
          <div className="col-span-12 select-none">ดุลการลงทุน</div>
          <div className="col-span-6 sm:col-span-6 md:col-span-3 lg:col-span-3">
            <button
              type="button"
              name="number"
              onClick={() => {
                setTrade({ ...trade, quantity: 100 });
              }}
              value={100}
              className={`
              ${trade.quantity == 100 ? "bg-success" : "bg-info/90"}
                  text-sm rounded select-none w-full text-white
                  rounded-fixed flex flex-col items-center justify-center hover:opacity-80  
                  transition duration-300 px-[10px] py-2 lg:text-md font-bold active:scale-105`}
            >
              <div>100</div>
              <div className="text-xs">USDT</div>
            </button>
          </div>
          <div className="col-span-6 sm:col-span-6 md:col-span-3 lg:col-span-3">
            <button
              type="button"
              name="number"
              onClick={() => {
                setTrade({ ...trade, quantity: 200 });
              }}
              value={200}
              className={` 
              ${trade.quantity == 200 ? "bg-success" : "bg-info/90"}
                  text-sm rounded select-none w-full text-white
                  rounded-fixed flex flex-col items-center justify-center hover:opacity-80  
                  transition duration-300 px-[10px] py-2 lg:text-md font-bold active:scale-105`}
            >
              <div>200</div>
              <div className="text-xs">USDT</div>
            </button>
          </div>
          <div className="col-span-6 sm:col-span-6 md:col-span-3 lg:col-span-3">
            <button
              type="button"
              name="number"
              onClick={() => {
                setTrade({ ...trade, quantity: 500 });
              }}
              value={500}
              className={` 
              ${trade.quantity == 500 ? "bg-success" : "bg-info/90"}
                  text-sm rounded select-none w-full text-white
                  rounded-fixed flex flex-col items-center justify-center hover:opacity-80  
                  transition duration-300 px-[10px] py-2 lg:text-md font-bold active:scale-105`}
            >
              <div>500</div>
              <div className="text-xs">USDT</div>
            </button>
          </div>
          <div className="col-span-6 sm:col-span-6 md:col-span-3 lg:col-span-3">
            <button
              type="button"
              name="number"
              onClick={() => {
                setTrade({ ...trade, quantity: 1000 });
              }}
              value={1000}
              className={`
              ${
                trade.quantity == 1000 ? "bg-success" : "bg-info/90"
              }              
                  text-sm rounded select-none w-full text-white
                  rounded-fixed flex flex-col items-center justify-center hover:opacity-80  
                  transition duration-300 px-[10px] py-2 lg:text-md font-bold active:scale-105`}
            >
              <div>1,000</div>
              <div className="text-xs">USDT</div>
            </button>
          </div>

          <div className="col-span-12">
            <Numberfield
              title="จำนวน"
              id="amountrade"
              required
              placeholder="จำนวนเงิน..."
              name="quantity"
              value={trade?.quantity}
              onChange={(e) => {
                const value = e.target.value.replace(/,/g, "");
                setTrade({ ...trade, quantity: Number(value) });
              }}
            />
          </div>

          <div className="col-span-12 mt-5">
            {isTrade ? (
              <Button
                type="button"
                title="Loading..."
                value="confirt"
                className={`bg-success text-default rounded py-3 select-none w-full opacity-70`}
              />
            ) : (
              <Button
                title="ยืนยัน"
                value="confirt"
                className={`bg-success text-default rounded py-3 select-none w-full ${
                  redux?.trade?.status ? "opacity-70" : ""
                }`}
              />
            )}
          </div>
        </form>
      </MyModal>

      {data?.endDate && data?.startDate && currentdate && (
        <div className="w-full flex justify-center items-center">
          <Timecountdowntrade endtime={data?.endDate} tradeid={data?.tradeId} />
        </div>
      )}
    </div>
  );
}

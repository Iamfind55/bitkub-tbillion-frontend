"use client";
import Iconcirclecheck from "@/icon/iconcirclecheck";
import Icontimecircle from "@/icon/icontimecircle";
import { ITrade } from "@/interface/interfaceType";
import useApi from "@/services/api";
import MyModal from "@/utils/modal";
import { useEffect, useState } from "react";
import { FormatNumber } from "./format";
import { useDispatch, useSelector } from "react-redux";
import { closetrade } from "@/redux/slice/tradeSlice";
import { toast } from "react-toastify";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { refreshwallet } from "@/redux/slice/walletSlice";

const Timecountdowntrade = ({
  endtime,
  tradeid,
}: {
  endtime: any;
  tradeid: string;
}) => {
  const calculateTimeLeft = () => {
    const timeZone = "Asia/Bangkok"; // Set your desired time zone here
    const localEndTime = new Date(endtime).toLocaleString("en-US", {
      timeZone,
    });
    const timestampNow = new Date().toLocaleString("en-US", {
      timeZone,
    });

    const endTimeUTC = new Date(localEndTime).getTime();
    const nowUTC = new Date(timestampNow).getTime();
    const difference = +endTimeUTC - +nowUTC;

    let timeLeft = {};
    if (difference >= 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<any>(calculateTimeLeft());
  const [openmodal, setOpenmodal] = useState(false);
  const dispatch = useDispatch();
  const redux = useSelector((state: any) => state.trade);

  useEffect(() => {
    if (openmodal) {
      document.body.style.overflow = "hidden"; // Disable scrolling on the body
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling on the body
    }
  }, [openmodal]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => {
      if (timeLeft?.seconds == 0 && timeLeft?.minutes == 0) {
        setOpenmodal(true);
        dispatch(closetrade());
        loadtradebyid(tradeid);
      } else {
      }
      clearTimeout(timer);
    };
  });

  const api = useApi();
  const [trade, setTrade] = useState<ITrade>();
  const loadtradebyid = (id: string) => {
    api({
      url: "trades/" + id,
      method: "get",
      params: {},
    }).then((res) => {
      setTrade(res.data);
    });
  };
  const handletransfer = (id: string) => {
    api({
      url: "trades/transfer/" + id,
      method: "put",
      params: { isTransfer: true },
    }).then((res) => {
      if (res.status === 200) {
        setOpenmodal(false);
        // toast.success("โอนสำเร็จ");
        dispatch(refreshwallet());
      } else {
      }
    });
  };

  // calculate total time cirle
  let timeCircle = 0;
  const timeDuration = localStorage.getItem("duration");
  const duration = timeDuration && JSON?.parse(timeDuration ?? "");
  if (duration) {
    if (duration?.unit === "second") {
      timeCircle = duration?.number;
    } else if (duration?.unit === "minute") {
      timeCircle = duration?.number * 60;
    } else if (duration?.unit === "hour") {
      timeCircle = duration?.number * 60 * 60;
    } else if (duration?.unit === "day") {
      timeCircle = duration?.number * 24 * 60 * 60;
    }
  }

  const boxtime = (timeLeft: any) => {
    let newTimeRoaming = 0;
    if (timeLeft?.days) {
      newTimeRoaming = timeLeft?.days * 24 * 60 * 60;
    } else if (timeLeft?.hours) {
      const newTime = 2 * 60;
      newTimeRoaming = newTime;
    } else if (timeLeft?.minutes) {
      const newTime = timeLeft?.minutes * 60 + timeLeft?.seconds;
      newTimeRoaming = newTime;
    } else if (timeLeft?.seconds) {
      const newTime = timeLeft?.seconds;
      newTimeRoaming = newTime;
    }
    return (
      <div className="text-center">
        <div>
          <CountdownCircleTimer
            isPlaying
            size={65}
            strokeWidth={5}
            // duration={endtime}
            duration={timeCircle}
            colors={["#067a34", "#F7B801", "#fbe605", "#f73201"]}
            colorsTime={[15, 7, 3, 0]}
            onComplete={() => ({
              shouldRepeat: true,
              delay: 10,
            })}
          >
            {() => (
              <div className="timer">
                {/* <div className="text-sm">เหลืออยู่</div> */}
                <div className="value">{newTimeRoaming}</div>
                <div className="text-[10px]">
                  {timeLeft?.days
                    ? "ชั่วโมง"
                    : timeLeft?.hours
                    ? "นาที"
                    : "วินาที"}
                </div>
              </div>
            )}
          </CountdownCircleTimer>
        </div>
      </div>
    );
  };

  return (
    <>
      {redux?.trade?.status && (
        <div className="flex justify-center items-center gap-5 text-warning p-2 rounded">
          {boxtime(timeLeft)}
        </div>
      )}

      {trade?.tradeId && (
        <MyModal
          isOpen={openmodal}
          className="md:w-[400px] w-[300px] "
          onClose={() => setOpenmodal(openmodal)}
        >
          <div className="flex flex-col gap-5 items-center py-5 select-none justify-center ">
            <div
              className={` md:text-6xl text-5xl ${
                trade?.status === "win" ? "text-success" : "text-danger"
              }`}
            >
              {trade?.status === "win" ? (
                <Iconcirclecheck />
              ) : (
                <Icontimecircle />
              )}
            </div>
            <div className="text-lg text-center  uppercase">
              <p>{trade?.status === "win" ? "คุณชนะ" : "ขออภัย, คุณแพ้แล้ว"}</p>
              {trade?.status === "win" ? (
                <strong className="py-3">
                  {FormatNumber(Number(trade?.quantity))} USDT+
                  {FormatNumber(Number(trade?.price))} USDT =
                  {FormatNumber(Number(trade?.quantity) + Number(trade?.price))}
                  USDT
                </strong>
              ) : (
                <strong className="py-3">
                  -{FormatNumber(Number(trade?.quantity))} USDT
                </strong>
              )}
            </div>

            <div className="flex gap-5">
              {trade?.status === "win" ? (
                <button
                  onClick={() => {
                    handletransfer(tradeid);
                  }}
                  className="text-white hover:scale-105 cursor-pointer transition-all 
            duration-200 md:px-5 px-3 md:py-2 py-1 rounded shadow-xl  
            flex bg-danger hover:opacity-90 justify-center 
            items-center"
                >
                  ปิด
                </button>
              ) : (
                <button
                  onClick={() => setOpenmodal(false)}
                  className="text-white hover:scale-105 cursor-pointer transition-all 
          duration-200 md:px-5 px-3 md:py-2 py-1 rounded shadow-xl  
          flex bg-danger hover:opacity-90 justify-center 
          items-center"
                >
                  ปิด
                </button>
              )}
            </div>
          </div>
        </MyModal>
      )}
    </>
  );
};

export default Timecountdowntrade;

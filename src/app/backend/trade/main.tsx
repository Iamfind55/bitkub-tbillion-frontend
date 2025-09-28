"use client";
import { TradeColumns } from "@/column/column";
import { LinkApi } from "@/enum/linkapi";
import { setRefresh } from "@/redux/slice/dialogSlice";
import useApi from "@/services/api";
import { usePendingGetTrade } from "@/services/tradeservice";
import Button from "@/utils/Button";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
import useFilter from "../user/hooks/useFilter";

function TradeMain() {
  const dispatch = useDispatch();
  const filter = useFilter();
  const tradeHook = usePendingGetTrade({ filter: filter.state });
  const { data, total, loading, error, refreshData } = tradeHook;
  const [checkTradeId, setCheckTradeId] = useState<string[]>([]);
  const api = useApi();
  const [newTime, setNewTime] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  const handleEventApprove = async (val: string, tradeId: string) => {
    const result = await api({
      url: `${LinkApi.manageTrade}/${tradeId}`,
      method: "put",
      params: { status: val },
    });
    if (result.status == 200) {
      setCheckTradeId((prevTradeIds) => [
        ...prevTradeIds,
        result.data[0].tradeId,
      ]);
    }
    tradeHook.refreshData();
  };
  useEffect(() => {
    data.forEach((item) => {
      const dateTime = new Date(item?.endDate);
      const currentTimestamp = new Date().getTime();
      const isPast = currentTimestamp < dateTime.getTime();

      if (!isPast && !isRendered) {
        setIsRendered(true);
        return;
      }

      if (!isPast) {
        setTimeout(() => {
          setNewTime(true);
        }, 100);
      }
    });
  }, [data, newTime, isRendered]);

  useEffect(() => {
    const socket = io(`${process.env.NEXT_PUBLIC_API_SOCKET}`);
    socket.on("trade", () => {
      refreshData();
    });

    return () => {
      socket.disconnect();
    };
  }, [refreshData]);

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            {TradeColumns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 &&
            data?.map((item: any, index) => {
              let bgColor;
              let textColor;
              let title = checkTradeId?.includes(item.tradeId) || false;
              if (item.trade === "up") {
                bgColor = "bg-success";
                textColor = "text-red-500";
              } else {
                bgColor = "bg-danger";
                textColor = "text-green-500";
              }
              const dateTime = new Date(item?.endDate);
              const currentTime = new Date();
              const dateTimeTimestamp = dateTime.getTime();
              const currentTimestamp = currentTime.getTime();
              const isPast = currentTimestamp < dateTimeTimestamp;

              const renderer = ({
                hours,
                minutes,
                seconds,
                completed,
              }: {
                hours: number;
                minutes: number;
                seconds: number;
                completed: boolean;
              }) => {
                if (completed) {
                  refreshData();
                  dispatch(setRefresh(true));
                }

                return (
                  <span>
                    {hours}:{minutes}:{seconds}
                  </span>
                );
              };

              if (isPast) {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item?.wallet?.user.name}</td>

                    <td>{item.quantity} $</td>
                    <td>{item?.type ?? ""}</td>
                    <td className="text-gray-500">
                      <Countdown date={item.endDate} renderer={renderer} />
                    </td>
                    <td>{item?.duration?.unit ?? ""}</td>
                    <td>
                      <div className={`${textColor}`}>{item.trade}</div>
                    </td>
                    <td className="flex justify-center">
                      <Button
                        title={title ? "approved.." : "win"}
                        disabled={title ? true : false}
                        className="bg-success rounded-lg"
                        onClick={() => handleEventApprove("win", item.tradeId)}
                      />
                    </td>
                  </tr>
                );
              }
            })}
        </tbody>
      </table>
    </div>
  );
}

export default TradeMain;

"use client";
import Candlestick from "@/components/heightchart/candlestick";
import { 
  getTypetrade 
} from "@/services/services";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
export default function Chartcoinrealtime() {
  const [data, setdata] = useState([[]]);
  const [reload, setReload] = useState(false);
  const param = useParams();
  useEffect(() => {
    if (!param.name) {
      return;
    }
    reloadchart(param?.name);
    const socket = io(`${process.env.NEXT_PUBLIC_API_SOCKET_REALTIME}`); // Replace with your server URL
    socket.on("refresh", (message) => {
      setReload(!reload);
    });
    return () => {
      socket.disconnect();
    };
  }, [reload, setReload, setdata]);

  const reloadchart = (paramsname: any) => {
    getTypetrade(paramsname).then((res) => {
      const datas = res.map((innerArray: any) => {
        return innerArray.map((item: any) => {
          return isNaN(item) ? Number(item) : Number(item);
        });
      });
      setdata(datas);
    });
  };

  return (
    <div>
      {data[0].length === 0 ? (
        <div className="text-center lg:py-30 md:py-20 py-10">Loading...</div>
      ) : (
        <div>
          <Candlestick data={data} />
        </div>
      )}
    </div>
  );
}

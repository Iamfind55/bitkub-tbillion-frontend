"use client";
import { FormatNumber } from "@/helper/format";
import { getusers } from "@/services/services";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
export default function Ouruser() {
  const [refresh, setRefresh] = useState(false);
  const [ourser, setourser] = useState(0);
  useEffect(() => {
    Loadourner();
    const socket = io(`${process.env.NEXT_PUBLIC_API_SOCKET_REALTIME}`); // Replace with your server URL
    socket.on("refresh", (res: any) => {
      setRefresh(!refresh);
    });
    return () => {
      socket.disconnect();
    };
  }, [refresh]);

  const Loadourner = async () => {
    await getusers().then((res) => {
      setourser(Number(res.data.regUserCount));
    });
  };

  return (
    <div>
      <span>{ourser ? FormatNumber(ourser) : "กำลังส่ง..."}</span>
    </div>
  );
}

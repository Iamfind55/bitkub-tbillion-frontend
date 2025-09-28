import Iconcirclecheck from "@/icon/iconcirclecheck";
import Icontimecircle from "@/icon/icontimecircle";
import { ITrade } from "@/interface/interfaceType";
import useApi from "@/services/api";
import MyModal from "@/utils/modal";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

export default function DemotimeCircleCountdown({
  totaltime,
  timerade,
  size,
  tradeid,
}: {
  totaltime: number;
  timerade: number;
  size?: number;
  tradeid: string;
}) {
  const [trading, setTrading] = useState("trading");
  const [openmodal, setOpenmodal] = useState(false);
  const router = useRouter();
  const api = useApi();
  const [trade, setTrade] = useState<ITrade>();
  const loadtradebyid = (id: string) => {
    api({ url: "trades/" + id, method: "get", params: {} }).then((res) => {
      setTrade(res.data);
    });
  };

  useEffect(() => {
    if (totaltime === 0) {
      loadtradebyid(tradeid);
      setOpenmodal(true);
    }
  }, [totaltime, tradeid]); // Watch for changes in totaltime and tradeid props

  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <CountdownCircleTimer
        isPlaying
        size={size ? size : 100}
        duration={totaltime ? totaltime : 0}
        initialRemainingTime={timerade ? timerade : 0}
        colors={["#03d178", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[30, 10, 5, 0]}
      >
        {({ remainingTime }) => {
          if (remainingTime === 0) {
            setTrading("completed");
            return 0;
          } else {
            return remainingTime;
          }
        }}
      </CountdownCircleTimer>
      <p>{trading}</p>

      <MyModal
        isOpen={openmodal}
        className="w-[300px]"
        onClose={() => setOpenmodal(!openmodal)}
      >
        {/* <div className="text-center text-info font-bold text-lg">Trade</div> */}
        <div className="flex flex-col gap-5 items-center select-none justify-center ">
          <div
            className={` text-5xl ${
              trade?.status === "win" ? "text-success" : "text-danger"
            }`}
          >
            {trade?.status === "win" ? <Iconcirclecheck /> : <Icontimecircle />}
          </div>
          <div className="text-xl uppercase">
            {trade?.status === "win" ? "You Are Win" : "Sorry, You Lost"}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setOpenmodal(false)}
              className="text-white hover:scale-105 cursor-pointer transition-all 
            duration-200 md:px-5 px-3 md:py-2 py-1 rounded shadow-xl  
            flex bg-danger hover:opacity-90 justify-center 
            items-center"
            >
              close
            </button>
            <button
              onClick={() => {
                router.push("/myinfo/listtrade");
              }}
              className="text-white hover:scale-105 cursor-pointer transition-all 
            duration-200 md:px-5 px-3 md:py-2 py-1 rounded shadow-xl  
            flex bg-success hover:opacity-90 justify-center 
            items-center"
            >
              check
            </button>
          </div>
        </div>
      </MyModal>
    </div>
  );
}

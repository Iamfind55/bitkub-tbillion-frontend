"use client";
import { useTranslation } from "@/lib/i18n";
import { getPromotion } from "@/services/services";
import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";

export default function TimeCountdownPromotion() {
  const { t } = useTranslation();
  const [resulttime, setResulttime] = useState({
    percent: 0,
    endDate: "" as any,
  });
  const resultdate = async () => {
    getPromotion().then((res) => {
      if (res.status === 200) {
        setResulttime({
          percent: res?.data?.percent,
          endDate: res?.data?.endDate
            ? new Date(res?.data?.endDate + " 23:59:59")
            : new Date(),
        });
      }
    });
  };
  useEffect(() => {
    resultdate();
  }, [setResulttime]);
  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) {
      return <span>{t("hero.time_up")}</span>;
    } else {
      return (
        <span className="drop-shadow-md">
          {`${days ? days + "d:" : ""}${hours}h:${minutes}m:${seconds}s`}
        </span>
      );
    }
  };
  return (
    <div className="md:text-xl text-md inline-block font-bold bg-primary/80 backdrop-blur-sm shadow text-warning rounded py-5 px-5 lg:w-[300px] md:w-[250px] w-[200px]">
      <div className="mb-2 uppercase text-center">
        {t("hero.promot_title")}
        <span className="md:text-3xl text-xl"> {resulttime?.percent ? resulttime?.percent : 0}%</span>
      </div>
      <div className="lg:text-2xl md:text-xl text-lg  text-center">
        {resulttime?.endDate === "" ? (
          t("hero.sending")
        ) : (
          <Countdown date={resulttime?.endDate} renderer={renderer} />
        )}
      </div>
    </div>
  );
}

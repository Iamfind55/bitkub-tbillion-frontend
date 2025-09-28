"use client";
import { FormatNumber } from "@/helper/format";
import { getTypetradePrice } from "@/services/services";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Listtrade() {
  const [data, setData] = useState<
    { icon: string; title: string; price: string }[]
  >([]);
  useEffect(() => {
    loaddata();
  }, [setData]);
  const loaddata = async () => {
    const data = await getTypetradePrice();
    setData(data);
  };
  return (
    <div className="w-full grid grid-cols-12 gap-y-2 gap-x-4">
      {data.length > 0 &&
        data?.map(
          (
            item: { icon: string; title: string; price: string },
            index: number
          ) => {
            return (
              <Link
                href={`/trade/${item?.title}`}
                className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-3 z-20 cursor-pointer"
                key={index}
              >
                <div className="lg:py-3 bg-primary/90 py-2 md:px-5 px-3 text-sm md:text-md">
                  <div className="flex justify-between items-center gap-x-2">
                    <div className="flex gap-2 items-center">
                      <img
                        src={`/icons/${item?.icon}`}
                        alt=""
                        className="md:w-8 md:h-8 w-6 h-6"
                      />
                      <p>{item?.title}</p>
                    </div>
                    <span>{FormatNumber(Number(item?.price))}</span>
                  </div>
                </div>
              </Link>
            );
          }
        )}
    </div>
  );
}

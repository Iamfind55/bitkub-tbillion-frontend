import React from "react";
import Formsubmitrading from "./formsubmitrading";
import Chartcoinrealtime from "./chartcoinrealtime";
import Tablerealtimetrade from "../../tablerealtimetrade";
import Listtrade from "./listtrade";
export default async function page() {
  return (
    <div className="mx-auto pt-[42px] w-full m-0">
      <div className="grid grid-cols-12 gap-4 px-2 py-5">
        <div className="col-span-12">
          <Chartcoinrealtime />
        </div>
        <div className="lg:px-1 px-4 col-span-12">
          <div className="flex flex-col">
            <Formsubmitrading />
          </div>
        </div>
        {/* <div className="col-span-12">
          <Listtrade/>
        </div> */}
      </div>
    </div>
  );
}

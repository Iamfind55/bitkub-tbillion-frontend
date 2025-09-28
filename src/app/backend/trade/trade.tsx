"use client";
import { useState } from "react";
import ListTrade from "./listTrade";
import TradeMain from "./main";

function Trade() {
  const [activeTab, setActiveTab] = useState(1);
  const handleTabClick = (tabNumber: any) => {
    setActiveTab(tabNumber);
  };
  return (
    <div>
      <div className="mb-4">
        <ul
          className="flex flex-wrap -mb-px text-sm font-medium text-center"
          role="tablist"
        >
          <li>
            <button
              className={`inline-block p-4 lg:px-5 lg:py-2 px-3 py-1 text-white font-bold hover:opacity-80 ${
                activeTab === 1 ? "bg-info" : "bg-warning"
              }`}
              type="button"
              onClick={() => handleTabClick(1)}
            >
              List trade
            </button>
          </li>
          <li>
            <button
              className={`inline-block p-4 lg:px-5 lg:py-2 px-3 py-1 text-white font-bold hover:opacity-80 ${
                activeTab === 2 ? "bg-info" : "bg-warning"
              }`}
              type="button"
              onClick={() => handleTabClick(2)}
            >
              List trade history
            </button>
          </li>
        </ul>
      </div>
      {activeTab === 1 && <TradeMain />}
      {activeTab === 2 && <ListTrade />}
    </div>
  );
}

export default Trade;

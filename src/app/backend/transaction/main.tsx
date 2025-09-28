"use client";
import { useState } from "react";
import MainTransaction from "./transaction";
import ManiWithdraw from "./withdraw";

const Main = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber: any) => {
    setActiveTab(tabNumber);
  };

  return (
    <div>
      
      <div className="mb-4 border-b border-gray-200">
        <ul
          className="flex flex-wrap -mb-px text-sm font-medium text-center"
          role="tablist"
        >
          <li
            className={`me-2 ${
              activeTab === 1 ? "border-b-2 border-blue-500" : ""
            }`}
          >
            <button
              className="inline-block p-4"
              type="button"
              onClick={() => handleTabClick(1)}
            >
              Withdraw
            </button>
          </li>
          <li
            className={`me-2 ${
              activeTab === 2 ? "border-b-2 border-blue-500" : "border-none"
            }`}
          >
            <button
              className="inline-block p-4"
              type="button"
              onClick={() => handleTabClick(2)}
            >
              History transaction
            </button>
          </li>
        </ul>
      </div>
      {activeTab === 1 && <ManiWithdraw />}
      {activeTab === 2 && <MainTransaction />}
    </div>
  );
};

export default Main;

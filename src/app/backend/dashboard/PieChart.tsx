"use client";
import { durationUnit } from "@/enum/duration";
import Select from "@/utils/Select";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { useState } from "react";
import { Pie } from "react-chartjs-2";
import { useGetTrade } from "./hooks/useChartData";
import useDate from "./hooks/useDate";

export function PieChart() {
  const eventDates = useDate();
  const [eventData, setEventData] = useState({
    data: "Weekly",
    newDate: eventDates.weeklyDates,
  });
 
  const tradeHooks = useGetTrade({ filter: eventData.newDate });
  const optionFilter: any = [
    {
      label: "Weekly",
      value: "Weekly",
    },
    { label: "Monthly", value: "Monthly" },
    { label: "Yearly", value: "Yearly" },
  ];
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    if (newValue === "Weekly") {
      setEventData((prevData: any) => ({
        ...prevData,
        data: newValue,
        newDate: eventDates.weeklyDates,
      }));
    } else if (newValue === "Monthly") {
      setEventData((prevData: any) => ({
        ...prevData,
        data: newValue,
        newDate: eventDates.monthlyDates,
      }));
    } else {
      setEventData((prevData: any) => ({
        ...prevData,
        data: newValue,
        newDate: eventDates.yearlyDates,
      }));
    }
  };

  const filteredItems = tradeHooks?.data.filter((item: any) => {
    const isMatch = durationUnit
      .map((unit) => unit.value)
      .includes(item.duration.unit);
    return isMatch;
  });

  const countByDurationUnit: Record<string, number> = {};

  (filteredItems || []).forEach((item: any) => {
    const unit = item.duration.unit;
    countByDurationUnit[unit] = (countByDurationUnit[unit] || 0) + 1;
  });
  
  const unitCountsArray: number[] = Object.values(countByDurationUnit);
  const sortedUnitCountsArray: number[] = unitCountsArray.sort((a, b) => b - a);

  const sortedUnits = Object.keys(countByDurationUnit).sort(
    (a, b) => countByDurationUnit[b] - countByDurationUnit[a]
  );
  type Item = {
    duration: {
      unit: string;
    };
  };
  const unitLengths: Record<string, { count: number; items: Item[] }> =
    filteredItems.reduce((acc, item: Item) => {
      acc[item.duration.unit] = acc[item.duration.unit] || {
        count: 0,
        items: [],
      };
      acc[item.duration.unit].count += 1;
      acc[item.duration.unit].items?.push(item);
      return acc;
    }, {} as Record<string, { count: number; items: Item[] }>);

  ChartJS.register(ArcElement, Tooltip, Legend);
  const data = {
    labels: sortedUnits,
    datasets: [
      {
        label: "Trade",
        data: sortedUnitCountsArray,
        backgroundColor: [
          "rgba(20, 210, 23, 0.518)",
          "rgba(38, 159, 240, 0.517)",
          "rgba(241, 188, 53, 0.371)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(118, 52, 251, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "#2c8a0c",
          "#1376b9",
          "#e9b738",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: "50%",
  };

  return (
    <div>
      <div className="flex justify-between mb-5">
        <h3 className="font-bold text-lg">Trade top duration</h3>
        <Select
          name="filter"
          option={optionFilter}
          value={eventData.data || ""}
          onChange={(e) => handleChange(e)}
          className="px-2 py-2 z-auto text-base text-gray-900 border border-gray-300 rounded-lg focus:border-blue-500 bg-gray-50 min-w-[100px]"
        />
      </div>
      <Pie data={data} options={options} />
      <div className="py-3">
        <table className="table">
          <tbody>
            {Object.entries(unitLengths)
              .sort(([, a], [, b]) => b.count - a.count)
              .map(([unit, { count }]) => (
                <tr key={unit}>
                  <td className="text-transform: capitalize">{unit}</td>
                  <td>{count}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

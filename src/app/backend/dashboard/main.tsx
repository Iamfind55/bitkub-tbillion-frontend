"use client";
import { PieChart } from "./PieChart";
import {
  useChartData,
  useGetUserChart,
  useGetWithDraw
} from "./hooks/useChartData";
import TableChart from "./tableChart";

function DashboardMain() {
  const incomeHooks = useGetWithDraw();
  const userHooks = useGetUserChart();
  const depositHooks = useChartData();

  const { data: incomeData } = incomeHooks;
  const { total: userTotal, loading: userLoading } = userHooks;
  const { data: depositData, loading: depositLoading } = depositHooks;

  const totalAmount = incomeData.reduce((acc, item: any) => {
    const amount = parseFloat(item.amount) || 0;
    return acc + amount;
  }, 0);

  const totalAmountIncomes = depositData.reduce((acc, item: any) => {
    const amount = parseFloat(item?.amount) || 0;
    return acc + amount;
  }, 0);

  return (
    <div>
      <div className="grid gap-2 grid-cols-12 mt-2">
        <div className="xl:col-span-4 lg:col-span-4 col-span-12 bg-gray-100 shadow text-dark p-5 rounded">
          <h2 className="font-bold text-lg">All users</h2>
          <p>{userLoading ? "..." : userTotal < 1 ? 0 : userTotal}</p>
        </div>

        <div className="xl:col-span-4 lg:col-span-6 col-span-12 bg-gray-100 shadow text-dark p-5 rounded">
          <h2 className="font-bold text-lg">Expenditures</h2>
          <p>{totalAmount} USDT</p>
        </div>
        <div className="xl:col-span-4 lg:col-span-6 col-span-12 bg-gray-100 shadow text-dark p-5 rounded">
          <h2 className="font-bold text-lg">Incomes</h2>
          <p>{totalAmountIncomes} USDT</p>
        </div>
      </div>
      <div className="grid gap-5 grid-cols-12 py-5">
        <div className="xl:col-span-4 lg:col-span-4 col-span-12 bg-gray-100 shadow text-dark p-5 rounded">
          <PieChart />
        </div>
        <div className="xl:col-span-8 lg:col-span-8 col-span-12 bg-gray-100 shadow text-dark p-5 rounded">
          <h3 className="font-bold text-lg mb-5">Transactions</h3>
          <TableChart />
        </div>
      </div>
    </div>
  );
}

export default DashboardMain;

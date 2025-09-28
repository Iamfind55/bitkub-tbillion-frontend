import { useEffect, useState } from "react";
import useApi from "./api";
import { LinkApi } from "@/enum/linkapi";

const useGetDeposits = ({ filter }: { filter: any }) => {
  const [data, setData] = useState<[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const api = useApi();

  const fetchData = async () => {
    try {
      const result = await api({
        url: `${LinkApi.coin}?pageSize=${
          filter.pageSize ? filter.pageSize : ""
        }&page=${
          filter.currentPage ? filter.currentPage : ""
        }&sortBy=createdAt&order=DESC&search=${filter.search ?? ""}`,
        method: "get",
        params: {},
      });
      setData(result.data);
      setTotal(result.total);
    } catch (error: any) {
      setError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [filter]);
  const refreshData = () => {
    fetchData();
  };
  return { data, loading, total, error, refreshData };
};

export { useGetDeposits };

// hooks/useApi.ts

import { useEffect, useState } from "react";
import useApi from "@/services/api";
import { LinkApi } from "@/enum/linkapi";
import { ITrade } from "@/interface/interfaceType";
import { formatDateDash } from "@/helper/format";

const useGetTrade = ({ filter }: { filter: any }) => {
  const api = useApi();
  const [data, setData] = useState<ITrade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  let startDate = "";
  let endDate = "";
  if (filter.startDate && filter.endDate) {
    startDate = formatDateDash(filter.startDate);
    endDate = formatDateDash(filter.endDate);
  }
  const fetchGetTrade = async () => {
    try {
      const result = await api({
        url: `${LinkApi.trade}?pageSize=${filter.pageSize}&currentPage=${filter.currentPage}&sortBy=createdAt&order=DESC&startDate=${startDate}&endDate=${endDate}`,
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
    fetchGetTrade();
  }, [filter]);
  const refreshData = () => {
    fetchGetTrade();
  };
  return { data, loading, total, error, refreshData };
};


const usePendingGetTrade = ({ filter }: { filter: any }) => {
  const api = useApi();
  const [data, setData] = useState<ITrade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  let startDate = "";
  let endDate = "";
  if (filter.startDate && filter.endDate) {
    startDate = formatDateDash(filter.startDate);
    endDate = formatDateDash(filter.endDate);
  }
  const fetchGetTrade = async () => {
    try {
      const result = await api({
        url: `${LinkApi.tradePending}?pageSize=${filter.pageSize}&currentPage=${filter.currentPage}&sortBy=createdAt&order=DESC`,
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
    fetchGetTrade();
  }, [filter]);
  const refreshData = () => {
    fetchGetTrade();
  };
  return { data, loading, total, error, refreshData };
};

export { useGetTrade, usePendingGetTrade };

import { useEffect, useState } from "react";
import useApi from "@/services/api";
import { LinkApi } from "@/enum/linkapi";
import { ITransaction } from "@/interface/interfaceType";
import { useAppSelector } from "@/redux/store";
import { formatDateDash } from "@/helper/format";

const useGetTransaction = ({ filter }: { filter: any }) => {
  const api = useApi();
  const [data, setData] = useState<ITransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  let startDate = "";
  let endDate = "";
  if (filter.startDate && filter.endDate) {
    startDate = formatDateDash(filter.startDate);
    endDate = formatDateDash(filter.endDate);
  }
  const fetchTransaction = async () => {
    try {
      const result = await api({
        url: `${LinkApi.transaction}?pageSize=${filter.pageSize}&page=${
          filter.currentPage
        }&sortBy=createdAt&order=DESC&search=${
          filter.search ?? ""
        }&typeFilter=${
          filter.status
        }&startDate=${startDate}&endDate=${endDate}`,
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
    fetchTransaction();
  }, [filter]);
  const refreshData = () => {
    fetchTransaction();
  };
  return { data, loading, total, error, refreshData };
};
const useGetCurrentDateTransaction = ({ filter }: { filter: any }) => {
  const api = useApi();
  const [data, setData] = useState<ITransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  let startDate = "";
  let endDate = "";
  if (today && tomorrow) {
    startDate = formatDateDash(today);
    endDate = formatDateDash(tomorrow);
  }

  const fetchTransaction = async () => {
    try {
      const result = await api({
        url: `${LinkApi.transaction}?pageSize=${filter.pageSize}&page=${filter.currentPage}&sortBy=createdAt&order=DESC&startDate=${startDate}&endDate=${endDate}`,
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
    fetchTransaction();
  }, [filter]);
  const refreshData = () => {
    fetchTransaction();
  };

  return { data, loading, total, error, refreshData };
};
const useGetWithdraw = ({ filter }: { filter: any }) => {
  const api = useApi();
  const [data, setData] = useState<ITransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const autoFetch = useAppSelector((state) => state.dialog);
  let startDate = "";
  let endDate = "";
  if (filter.startDate && filter.endDate) {
    startDate = formatDateDash(filter.startDate);
    endDate = formatDateDash(filter.endDate);
  }
  const fetchWithdraw = async () => {
    try {
      const result = await api({
        url: `${LinkApi.withdraw}/pending?pageSize=${filter.pageSize}&page=${
          filter.currentPage
        }&sortBy=createdAt&order=DESC&search=${
          filter.search ?? ""
        }&&startDate=${startDate}&endDate=${endDate}`,
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
    fetchWithdraw();
  }, [filter, autoFetch.autoRefresh]);
  const refreshData = () => {
    fetchWithdraw();
  };
  return { data, loading, total, error, refreshData };
};
const useGetWithdraws = ({ filter }: { filter: any }) => {
  const api = useApi();
  const [data, setData] = useState<ITransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const autoFetch = useAppSelector((state) => state.dialog.autoRefresh);

  let startDate = "";
  let endDate = "";
  if (filter.startDate && filter.endDate) {
    startDate = formatDateDash(filter.startDate);
    endDate = formatDateDash(filter.endDate);
  }
  const fetchWithdraw = async () => {
    try {
      const result = await api({
        url: `${LinkApi.withdraw}?pageSize=${filter.pageSize}&page=${filter.currentPage}&sortBy=createdAt&order=DESC&startDate=${startDate}&endDate=${endDate}`,
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
    fetchWithdraw();
  }, [filter, autoFetch]);
  const refreshData = () => {
    fetchWithdraw();
  };
  return { data, loading, total, error, refreshData };
};
export {
  useGetTransaction,
  useGetCurrentDateTransaction,
  useGetWithdraw,
  useGetWithdraws,
};

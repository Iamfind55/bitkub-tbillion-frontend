import { LinkApi } from "@/enum/linkapi";
import useApi from "@/services/api";
import React, { useState } from "react";

const useChartData = () => {
  const api = useApi();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const fetchWithdraw = async () => {
    try {
      const result = await api({
        url: `${LinkApi.transaction}?typeFilter=deposit`,
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
  React.useEffect(() => {
    fetchWithdraw();
  }, []);

  return { data, loading, total, error };
};

const useGetUserChart = () => {
  const api = useApi();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const fetchUser = async () => {
    try {
      const result = await api({
        url: `${LinkApi.users}?&roleFilter=customer`,
        method: "get",
        params: {},
      });
      setTotal(result.total);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    fetchUser();
  }, []);

  return { loading, total, error };
};

const useGetWithDraw = () => {
  const api = useApi();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const fetchWithdraw = async () => {
    try {
      const result = await api({
        url: `${LinkApi.transaction}?typeFilter=withdraw`,
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
  React.useEffect(() => {
    fetchWithdraw();
  }, []);
  return { data, loading, total, error };
};

const useGetTrade = ({ filter }: { filter: any }) => {
  const api = useApi();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  const fetchGetTrade = async () => {
    try {
      const result = await api({
        url: `${LinkApi.trade}?startDate=${filter.startDate}&endDate=${filter.endDate}&order=DESC`,
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

  React.useEffect(() => {
    fetchGetTrade();
  }, [filter]);
  const refreshData = () => {
    fetchGetTrade();
  };
  return { data, loading, total, error, refreshData };
};
export { useChartData, useGetUserChart, useGetWithDraw, useGetTrade };

// hooks/useApi.ts

import { LinkApi } from "@/enum/linkapi";
import { IUserType } from "@/interface/usertype";
import useApi from "@/services/api";
import { useEffect, useState } from "react";

const useGetUser = ({ filter }: { filter: any }) => {
  const [data, setData] = useState<IUserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const api = useApi();

  const fetchData = async () => {
    try {
      const result = await api({
        url: `${LinkApi.users}?pageSize=${
          filter.pageSize ? filter.pageSize : ""
        }&page=${
          filter.currentPage ? filter.currentPage : ""
        }&sortBy=createdAt&order=DESC&roleFilter=${
          filter.status ? filter.status : ""
        }&search=${filter.search ?? ""}`,
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

const useGetUserById = (id: string) => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const api = useApi();
  const fetchData = async () => {
    try {
      const result = await api({
        url: `/users/${id}`,
        method: "get",
        params: {},
      });
      setData(result.data);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);
  const refreshData = () => {
    fetchData();
  };
  return { data, loading, error, refreshData };
};

export { useGetUser, useGetUserById };

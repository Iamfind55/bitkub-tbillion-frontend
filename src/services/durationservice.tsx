// hooks/useApi.ts

import { useEffect, useState } from "react";
import useApi from "@/services/api";
import { LinkApi } from "@/enum/linkapi";
import { IDurationType } from "@/interface/durationType";

const useGetDuration = () => {
  const api = useApi();
  const [data, setData] = useState<IDurationType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDuration = async () => {
    try {
      const result = await api({
        url: `${LinkApi.duration}?pageSize=20&page=1&sortBy=createdAt&order=DESC`,
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
    fetchDuration();
  }, []);
  const refreshData = () => {
    fetchDuration();
  };
  return { data, loading, error, refreshData };
};

export { useGetDuration };

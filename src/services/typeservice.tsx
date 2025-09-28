// hooks/useApi.ts

import { useEffect, useState } from "react";
import useApi from "@/services/api";
import { LinkApi } from "@/enum/linkapi";
import { IType } from "@/interface/type";

const useGetType = () => {
  const api = useApi();
  const [data, setData] = useState<IType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchType = async () => {
    try {
      const result = await api({
        url: `${LinkApi.types}/?pageSize=20&page=1&sortBy=createdAt&order=DESC`,
        method: "get",
        params: {},
      });
      setData(result.data);
    } catch (error: any) {
      setError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchType();
  }, []);
  const refreshData = () => {
    fetchType();
  };
  return { data, loading, error, refreshData };
};

export { useGetType };

import { LinkApi } from "@/enum/linkapi";
import useApi from "@/services/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useGetUserOwner = () => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useSelector((state: any) => state.auth);
  const api = useApi();
  const fetchData = async () => {
    try {
      const result = await api({
        url: `${LinkApi.users}/owner`,
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
    if (!user?.role) return;
    fetchData();
  }, []);
  const refreshData = () => {
    fetchData();
  };
  return { data, loading, error, refreshData };
};

export { useGetUserOwner };

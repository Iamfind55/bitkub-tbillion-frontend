// hooks/useApi.ts

import { LinkApi } from "@/enum/linkapi";
import { ITrade, Iqrcode } from "@/interface/interfaceType";
import useApi from "@/services/api";
import { useEffect, useState } from "react";


const useQrcodes = () => {
  const api = useApi();
  const [data, setData] = useState<Iqrcode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGetTrade = async () => {
    try {
      const result = await api({
        url: `${LinkApi.qrcode}`,
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
    fetchGetTrade();
  }, []);
  const refreshData = () => {
    fetchGetTrade();
  };
  return { data, loading, error, refreshData };
};

export { useQrcodes };


import { useEffect, useState } from "react";
import useApi from "@/services/api";
import { LinkApi } from "@/enum/linkapi";
import { ICoupon } from "@/interface/coupontype";


const useGetCoupon = ({ filter }: { filter: any }) => {
  const api = useApi();
  const [data, setData] = useState<ICoupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  const fetchCoupon = async () => {
    try {
      const result = await api({
        url: `${LinkApi.coupons}?pageSize=${filter.pageSize}&page=${filter.currentPage}&sortBy=createdAt&order=DESC`,
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
    fetchCoupon();
  }, [filter]);
  const refreshData = () => {
    fetchCoupon();
  };
  return { data, loading, total, error, refreshData };
};

export { useGetCoupon };

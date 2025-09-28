"use client";
import { logout } from "@/redux/slice/authSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_URL; // server
axios.defaults.headers.common["Content-Type"] = "application/json";

const useApi = () => {
  const router = useRouter();
  const { user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const fetch = async (props: {
    url: string;
    params?: {};
    method: "get" | "post" | "put" | "patch" | "delete";
  }) => {
    try {
      if (props.method === "post") {
        const response = await axios.post(props.url, props.params, {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token"),
            Accept: "application/json",
          },
        });
        if (response?.status === 200) {
          return response?.data;
        } else {
          return response;
        }
      } else if (props.method === "get") {
        const response = await axios.get(props.url, {
          params: props.params,
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token"),
            Accept: "application/json",
          },
        });
        if (response?.status === 200) {
          return response?.data;
        } else {
          return response;
        }
      } else if (props.method === "put") {
        const response = await axios.put(props.url, props.params, {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token"),
            Accept: "application/json",
          },
        });
        if (response?.status === 200) {
          return response?.data;
        } else {
          return response;
        }
      } else if (props.method === "patch") {
        const response = await axios.patch(props.url, props.params, {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token"),
            Accept: "application/json",
          },
        });
        if (response?.status === 200) {
          return response?.data;
        } else {
          return response;
        }
      } else if (props.method === "delete") {
        const response = await axios.delete(props.url, {
          params: props.params,
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token"),
            Accept: "application/json",
          },
        });
        if (response?.status === 200) {
          return response?.data;
        } else {
          return response;
        }
      } else {
        const response = await axios.get(props.url, {
          params: props.params,
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token"),
            Accept: "application/json",
          },
        });
        if (response?.status === 200) {
          return response?.data;
        } else {
          return response;
        }
      }
    } catch (error: any) {
      if (error?.response?.status === 401) {
        dispatch(logout());
      } else if (error?.response?.status === 400) {
        toast.warning(error?.response?.data?.message);
      } else if (error?.response?.status === 403) {
        toast.error("Forbidden");
      } else if (error?.response?.status === 404) {
        if (error?.response?.data?.message === "Your account is not verified") {
          toast.warning("บัญชีของคุณไม่ได้รับการยืนยัน!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.warning(error?.response?.data?.message);
        }
      } else if (error?.response?.status === 500) {
        toast.error(error?.response?.data?.message);
      } else if (error?.response?.status === 503) {
        toast.error("Service Unavailable");
      }
    }
  };
  return fetch;
};
export default useApi;

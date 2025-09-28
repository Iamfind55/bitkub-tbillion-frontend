"use client";
import useTradeFilter from "@/app/backend/user/hooks/useFilter";
import Iconkey from "@/icon/iconkey";
import Iconnotification from "@/icon/iconnotification";
import Iconsignout from "@/icon/iconsignout";
import { ITransaction } from "@/interface/interfaceType";
import { IDecodeToken } from "@/interface/logintype";
import { logout } from "@/redux/slice/authSlice";
import { clearRefresh } from "@/redux/slice/dialogSlice";
import { useAppSelector } from "@/redux/store";
import useFilter from "@/services/filternavbarservice";
import { usePendingGetTrade } from "@/services/tradeservice";
import { useGetWithdraw } from "@/services/transactionservice";
import { useGetUserById } from "@/services/userservice";
import { MessageIcon } from "@/utils/Icons";
import Cookies from "js-cookie";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

export default function Menunavbar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);
  const [auth, setAuth] = useState<IDecodeToken>({
    userId: "",
    accountId:"",
    role: "",
    name: "",
    email: "",
    iat: 0,
    exp: 0,
  });

  useEffect(() => {
    if (!user?.role) {
      window.location.href = "/login";
    }
    if (!user) return;
    setAuth(user);
    if (["admin", "operator"].includes(user?.role) == false) {
      window.location.href = "/";
    }
  }, [user]);

  // handle logout
  const handleLogout = () => {
    window.localStorage.clear(); // clear token
    Cookies.remove("token");
    Cookies.remove("refreshToken");
    Cookies.remove("role");
    Cookies.remove("name");
    Cookies.remove("accountId");
    Cookies.remove("email");
    Cookies.remove("userid");
    dispatch(logout());
    window.location.href = "/login";
  };
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const tradeRef = useRef<HTMLUListElement>(null);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [isTrade, setTrade] = useState(false);
  const userByIdHook = useGetUserById(user?.userid);
  const { data: userProfile, refreshData: userRefresh } = userByIdHook;
  const autoFetch = useAppSelector((state) => state.dialog.autoRefresh);
  const filter = useFilter();
  const withdrawHook = useGetWithdraw({ filter: filter.state });
  const { data, loading, total, error, refreshData } = withdrawHook;
  const tradeFilter = useTradeFilter();
  const tradeHook = usePendingGetTrade({ filter: tradeFilter.state });
  const {
    data: tradeData,
    error: tradeError,
    refreshData: tradeFresh,
  } = tradeHook;

  let pastCount = 0;
  tradeData.forEach((item) => {
    const dateTime = new Date(item?.endDate);
    const currentTime = new Date();
    const dateTimeTimestamp = dateTime.getTime();
    const currentTimestamp = currentTime.getTime();
    const isPast = currentTimestamp < dateTimeTimestamp;
    if (isPast) {
      pastCount++;
    }
  });

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  const toggleTrade = () => {
    setTrade(!isTrade);
  };
  const handleItemClick = (item: ITransaction) => {
    router.push(
      `/backend/transaction/${encodeURIComponent(JSON.stringify(item))}`
    );
    toggleMenu();
  };
  const handleOutsideClick = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuOpen(false);
    }
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsProfile(false);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tradeRef.current &&
        !tradeRef.current?.contains(event.target as Node)
      ) {
        setTrade(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const socket = io(`${process.env.NEXT_PUBLIC_API_SOCKET}`);
    socket.on("withdraw", () => {
      refreshData();
    });
    socket.on("trade", () => {
      tradeFresh();
    });
    return () => {
      socket.disconnect();
    };
  }, [refreshData, tradeFresh]);

  useEffect(() => {
    tradeFresh();
    if (autoFetch) {
      userRefresh();
      refreshData();
      setTimeout(() => {
        dispatch(clearRefresh());
      }, 20);
    }
  }, [autoFetch, dispatch]);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  const TimeAgoCalculator = ({ date }: { date: any }) => {
    const [timeAgo, setTimeAgo] = useState("");

    useEffect(() => {
      const intervalId = setInterval(() => {
        const duration = moment.duration(moment().diff(date));
        const seconds = duration.asSeconds();
        let displayText;

        if (seconds < 60) {
          displayText = `${Math.round(seconds)} seconds ago`;
        } else if (seconds < 3600) {
          const minutes = duration.asMinutes();
          displayText = `${Math.round(minutes)} minutes ago`;
        } else if (seconds < 86400) {
          const hours = duration.asHours();
          displayText = `${Math.round(hours)} hours ago`;
        } else if (seconds < 172800) {
          displayText = `1 day ago`;
        } else {
          const days = duration.asDays();
          displayText = `${Math.round(days)} days ago`;
        }
        setTimeAgo(displayText);
      }, 1000);

      return () => clearInterval(intervalId);
    }, [date]);

    return (
      <div>
        <p className="text-sm text-blue-500">{timeAgo ? timeAgo : "Await.."}</p>
      </div>
    );
  };

  return (
    <div className="flex items-center gap-5" ref={menuRef}>
      <button
        className="relative inline-flex items-center"
        onClick={toggleMenu}
      >
        <MessageIcon size={18} />
        {data?.length > 0 && (
          <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs bg-red-500  rounded-full -top-3 -end-3">
            {data?.length}
          </div>
        )}
      </button>
      <button
        className="relative inline-flex items-center"
        onClick={toggleTrade}
      >
        <Iconnotification />
        {pastCount > 0 && (
          <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs bg-red-500  rounded-full -top-2 -end-2">
            {pastCount}
          </div>
        )}
      </button>

      <div className="relative" ref={modalRef}>
        <div
          onClick={() => setIsProfile(!isProfile)}
          className="transition-all duration-200  cursor-pointer active:opacity-70 flex gap-1 items-center hover:text-white/80 font-bold text-lg"
        >
          <span className="text-lg">
            {userProfile?.filename ? (
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}/images/${userProfile.filename}`}
                alt="profile"
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <img
                src="/images/profile_avatar.webp"
                alt=""
                className="w-10 h-10 rounded-full"
              />
            )}
          </span>
        </div>
        <div
          className={`absolute top-[50px] right-0 min-w-[200px] w-auto text-info font-bold bg-white shadow rounded p-5
                     ${isProfile ? "visible" : "invisible"}`}
        >
          <ul className="flex flex-col gap-5 text-sm">
            <li
              className="cursor-pointer flex gap-2 items-center hover:opacity-80"
              onClick={() => {
                setIsProfile(false);
                router.push("/backend/userprofile");
              }}
            >
              {userProfile?.filename ? (
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}/images/${userProfile.filename}`}
                  alt="profile"
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <img
                  src="/images/profile_avatar.webp"
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
              )}
              <div>
                <span>{auth?.name}</span>
                <p />
                <span className="text-[12px]">{auth?.email}</span>
              </div>
            </li>
            <li
              onClick={() => {
                setIsProfile(false);
                router.push("/backend/changepassword");
              }}
              className="cursor-pointer flex gap-2 items-center hover:opacity-80"
            >
              <Iconkey />
              <span>Change Password</span>
            </li>

            <li
              className="cursor-pointer flex gap-2 items-center hover:opacity-80"
              onClick={handleLogout}
            >
              <Iconsignout /> Logout
            </li>
          </ul>
        </div>
      </div>

      {isMenuOpen && data.length > 0 && (
        <ul className="absolute w-60 text-blue-gray-500 py-3 shadow-blue-gray-500/10 focus:outline-none z-10 top-12 right-20 mt-2 bg-white text-gray-900 border rounded shadow">
          {data?.map((item: any, index) => {
            return (
              <li
                key={index}
                className="py-2 border px-4 cursor-pointer hover:bg-gray-200"
                onClick={() => handleItemClick(item)}
              >
                <div className="flex items-center gap-4">
                  {item?.wallet?.user?.filename ? (
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}/images/${item?.wallet?.user?.filename}`}
                      alt={item?.wallet?.user?.filename}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <img
                      className="w-8 h-8 rounded-full"
                      src="/images/profile_avatar.webp"
                      alt=""
                    />
                  )}
                  <div className="font-medium">
                    <p>
                      {item.wallet?.user?.name}, {"withdraw"}
                    </p>
                    <TimeAgoCalculator date={item.createdAt} />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {isTrade && pastCount > 0 && (
        <ul
          ref={tradeRef}
          className="absolute w-60 text-blue-gray-500 py-3 shadow-blue-gray-500/10 focus:outline-none z-10 top-12 right-20 mt-2 bg-white text-gray-900 border rounded shadow"
        >
          {tradeData?.map((item: any, index) => {
            const dateTime = new Date(item?.endDate);
            const currentTime = new Date();
            const dateTimeTimestamp = dateTime.getTime();
            const currentTimestamp = currentTime.getTime();
            const isPast = currentTimestamp < dateTimeTimestamp;
            if (isPast) {
              return (
                <li
                  key={index}
                  className="py-2 border px-4 cursor-pointer hover:bg-gray-200"
                  onClick={() => {
                    setTrade(false);
                    router.push("/backend/trade");
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="font-medium">
                      <p>
                        {item.wallet?.user?.name}, {item.type},
                        {`trade  ${item.trade}`}
                      </p>
                      <TimeAgoCalculator date={item.createdAt} />
                    </div>
                  </div>
                </li>
              );
            }
          })}
        </ul>
      )}
    </div>
  );
}

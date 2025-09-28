"use client";
import { useGetUserOwner } from "@/app/(page)/myinfo/hooks/useUsers";
import Iconkey from "@/icon/iconkey";
import Iconsecurity from "@/icon/iconsecurity";
import Iconsignout from "@/icon/iconsignout";
import { IDecodeToken } from "@/interface/logintype";
import { logout } from "@/redux/slice/authSlice";
import { clearRefresh } from "@/redux/slice/dialogSlice";
import { useAppSelector } from "@/redux/store";
import Cookies from "js-cookie";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Mywallet from "./mywallet";
import Iconuser from "@/icon/iconuser";

export default function Navbar() {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  const [isprofile, setIsprofile] = useState(false);
  const userAccount = useGetUserOwner();
  const { data, loading, error, refreshData } = userAccount;
  const [toggle, setToggle] = useState(false);
  const pathname = usePathname();
  const params = useParams();
  const [scroll, setScroll] = useState(false);
  const autoFetch = useAppSelector((state) => state.dialog.autoRefresh);
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);
  const [auth, setAuth] = useState<IDecodeToken>({
    userId: "",
    accountId: "",
    role: "",
    name: "",
    email: "",
    iat: 0,
    exp: 0,
  });

  useEffect(() => {
    setAuth(user);
  }, [user]);
  useEffect(() => {
    if (autoFetch) {
      refreshData();
      setTimeout(() => {
        dispatch(clearRefresh());
      }, 20);
    }
  }, [autoFetch, dispatch]);

  // handle logout
  const handleLogout = () => {
    window.localStorage.clear(); // clear token
    Cookies.remove("token");
    Cookies.remove("refreshToken");
    Cookies.remove("role");
    Cookies.remove("name");
    Cookies.remove("email");
    Cookies.remove("userid");
    dispatch(logout());
    window.location.href = "/";
  };

  //  handle clickoutside close modal profile
  const handleOutsideClick: any = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsprofile(false); // Close the modal when clicking outside
    }
  };

  // handle toggle menu mobile
  useEffect(() => {
    if (toggle) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [toggle]);

  // handle scroll navbar
  const handleScroll = () => {
    if (window.scrollY > 40) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // handle redirect when login
  useMemo(() => {
    if (user?.role === "admin" || user?.role === "operator") {
      window.location.href = "/backend";
    }
  }, [pathname, params]);

  return (
    <>
      <nav
        className={`bg-gradient-to-t fixed top-0 right-0 left-0 transition-all z-30 duration-700 
         ${
           scroll
             ? "py-3 text-white  shadow backdrop-blur  from-primary/60 to-primary "
             : "py-5 text-white  from-green-400/0 to-primary/10"
         } 
         `}
      >
        <div className="mx-auto container flex items-center justify-between  px-5">
          <Link href="/" className="logo flex items-center">
            <img
              src="/images/logo.png"
              alt="logo"
              className="h-8 w-8 lg:h-10 lg:w-10 "
            />
            <span className="text-md sm:text-xl lg:text-2xl font-bold ml-2 select-none uppercase">
              Bitkubnek
            </span>
          </Link>

          {/* menu desktop */}
          <div className="lg:block hidden  select-none">
            <div className="flex items-center gap-5 ">
              {auth?.name ? (
                <>
                  <div className="relative" ref={modalRef}>
                    <div
                      onClick={() => setIsprofile(!isprofile)}
                      className="transition-all duration-200  
                      cursor-pointer active:opacity-90 flex gap-1 
                      items-center hover:text-white/80 font-bold text-lg select-none"
                    >
                      {data?.filename ? (
                        <img
                          className="w-8 h-8 rounded-full"
                          src={`${process.env.NEXT_PUBLIC_API_URL}/images/${data?.filename}`}
                          alt="R"
                        />
                      ) : (
                        <img
                          src="/images/profile_avatar.webp"
                          alt=""
                          className="w-8 h-8 rounded-full"
                        />
                      )}
                    </div>
                    <div
                      className={`absolute top-[50px] right-0 min-w-[220px] w-auto overflow-x-hidden text-info font-bold bg-white shadow rounded p-5
                     ${isprofile ? "visible" : "invisible"}
                    `}
                    >
                      <ul className="flex flex-col gap-5 text-sm">
                        <li
                          onClick={() => {
                            router.push("/myinfo"), setIsprofile(false);
                          }}
                          className="cursor-pointer flex gap-2 items-center hover:opacity-80 uppercase"
                        >
                          {data?.filename ? (
                            <img
                              className="w-8 h-8 rounded-full"
                              src={`${process.env.NEXT_PUBLIC_API_URL}/images/${data?.filename}`}
                              alt={auth?.name}
                            />
                          ) : (
                            <img
                              src="/images/profile_avatar.webp"
                              alt=""
                              className="w-8 h-8 rounded-lg"
                            />
                          )}
                          <div>
                            <span>{auth?.name}</span>
                            <p />
                            <span className="text-[10px]">{auth?.email}</span>
                          </div>
                        </li>
                        <li
                          onClick={() => {
                            router.push("/myinfo"), setIsprofile(false);
                          }}
                          className="cursor-pointer flex gap-2 items-center hover:opacity-80"
                        >
                          <Iconuser />
                          <span>บัญชีของฉัน</span>
                        </li>
                        <li
                          onClick={() => {
                            router.push("/myinfo/changepassword"),
                              setIsprofile(false);
                          }}
                          className="cursor-pointer flex gap-2 items-center hover:opacity-80"
                        >
                          <Iconkey />
                          <span>เปลี่ยนรหัสผ่าน</span>
                        </li>
                        <li
                          onClick={() => {
                            router.push("/myinfo/privacy"), setIsprofile(false);
                          }}
                          className="cursor-pointer flex gap-2 items-center hover:opacity-80"
                        >
                          <Iconsecurity />
                          <span>ยืนยันตัวตน</span>
                        </li>

                        <li
                          className="cursor-pointer flex gap-2 items-center hover:opacity-80"
                          onClick={handleLogout}
                        >
                          <Iconsignout /> ออกจากระบบ
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-success/90 rounded shadow md:text-xl py-1 px-3 font-bold">
                    <Mywallet />
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="hover:text-white/80 px-3 py-1 bg-yellow-500  rounded-md transition-all duration-200 font-bold text-lg"
                  >
                    เข้าสู่ระบบ
                  </Link>
                  <Link
                    href="/register"
                    className="hover:text-white/80 px-3 py-1 rounded-md border border-gray-200 transition-all duration-200 font-bold text-lg"
                  >
                    ลงชื่อเข้าใช้
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            {auth?.name ? (
              <div className="bg-success/90 rounded md:text-xl py-1 shadow px-3 font-bold">
                <Mywallet />
              </div>
            ) : (
              ""
            )}
            {/* button toggle */}
            <button
              className="focus:outline-none"
              onClick={() => setToggle(!toggle)}
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-wite"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <div
        id="mobile"
        className={`lg:invisible visible fixed z-30 top-0 p-5 left-0 right-0 bottom-0 bg-primary text-white ${
          toggle ? "visible" : "invisible"
        }`}
      >
        <Link
          href="/"
          onClick={() => setToggle(!toggle)}
          className="logo flex flex-col items-center"
        >
          <img src="/images/logo.png" alt="logo" className="h-20 w-20" />
          <span className="text-2xl font-bold ml-2 my-5">bitkubnek</span>
        </Link>

        <button
          className="focus:outline-none fixed top-5 right-5"
          onClick={() => setToggle(!toggle)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* menu mobile */}

        <div className="flex flex-col justify-center gap-5 mt-5">
          {auth?.name ? (
            <>
              <Link
                href="/myinfo"
                onClick={() => setToggle(false)}
                className="text-center w-full justify-center active:text-white/80 text-white flex flex-col items-center gap-3"
              >
                {data?.filename ? (
                  <img
                    className="w-8 h-8 rounded-full"
                    src={`${process.env.NEXT_PUBLIC_API_URL}/images/${data?.filename}`}
                    alt={auth?.name}
                  />
                ) : (
                  <img
                    src="/images/profile_avatar.webp"
                    alt=""
                    className="w-8 h-8 rounded-lg"
                  />
                )}
                <span className="uppercase">{auth?.name}</span>
              </Link>

              <Link
                href="/myinfo"
                onClick={() => setToggle(false)}
                className="text-center w-full justify-center active:text-white/80 text-white flex items-center gap-1 "
              >
                บัญชีของฉัน
              </Link>
              <Link
                href="/myinfo/changepassword"
                onClick={() => setToggle(false)}
                className="text-center w-full justify-center active:text-white/80 text-white flex items-center gap-1 "
              >
                เปลี่ยนรหัสผ่าน
              </Link>
              <Link
                href="/myinfo/privacy"
                onClick={() => setToggle(false)}
                className="text-center w-full justify-center active:text-white/80 text-white flex items-center gap-1 "
              >
                ยืนยันตัวตน
              </Link>
              <button
                onClick={handleLogout}
                className="text-center active:text-white/80"
              >
                ออกจากระบบ
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hover:text-white/80 px-3 py-1 bg-yellow-500  rounded-md transition-all duration-200 font-bold text-lg"
              >
                เข้าสู่ระบบ
              </Link>
              <Link
                href="/register"
                className="hover:text-white/80 px-3 py-1 rounded-md border border-gray-200 transition-all duration-200 font-bold text-lg"
              >
                ลงชื่อเข้าใช้
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}

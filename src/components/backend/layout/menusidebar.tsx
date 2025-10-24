import Iconbitcoin from "@/icon/iconbitcoin";
import Iconchart from "@/icon/iconchart";
import Icondiscount from "@/icon/icondiscount";
import Iconhistory from "@/icon/iconhistory";
import Iconsetting from "@/icon/iconsetting";
import Iconuser from "@/icon/iconuser";
import { TimeIcon } from "@/utils/Icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GrTransaction } from "react-icons/gr";
import { IoMdSettings } from "react-icons/io";
import { TfiWallet } from "react-icons/tfi";
export default function Menusidebar() {
  const pathname = usePathname();
  const listmenu = [
    {
      icon: <Iconchart />,
      name: "Dashboard",
      link: "/backend",
      role: ["admin", "operator"],
    },

    {
      icon: <Iconbitcoin />,
      name: "Manage Trade",
      link: "/backend/trade",
      role: ["admin", "operator"],
    },
    {
      icon: <GrTransaction size={22} />,
      name: "Withdraw",
      link: "/backend/withdraw/pending",
      role: ["admin", "operator"],
    },
    {
      icon: <TfiWallet size={20} />,
      name: "Deposit coins",
      link: "/backend/deposit",
      role: ["admin", "operator"],
    },
    {
      icon: <Iconhistory />,
      name: "Transaction",
      link: "/backend/transaction",
      role: ["admin", "operator"],
    },
    
    {
      icon: <Iconuser />,
      name: "Manage User",
      link: "/backend/user",
      role: ["admin", "operator"],
    },
    // {
    //   icon: <Iconbitcoin />,
    //   name: "Manage Type",
    //   link: "/backend/type",
    //   role: ["admin", "operator"],
    // },
    {
      icon: <Icondiscount />,
      name: "Coupon",
      link: "/backend/coupon",
      role: ["admin", "operator"],
    },
    {
      icon: <TimeIcon size={24} />,
      name: "Duration",
      link: "/backend/duration",
      role: ["admin", "operator"],
    },
   
    {
      icon: <IoMdSettings size={24} />,
      name: "Setting",
      link: "/backend/setting",
      role: ["admin", "operator"],
    },
  ];
  return (
    <div className="menusidebar h-[calc(100vh-100px)]  overflow-y-auto bg-black">
      <ul className="w-full flex flex-col gap-3 px-2 pt-5">
        {listmenu.map((item: any, index: number) => {
          if (item?.link === "/backend") {
            return (
              <li key={index}>
                <Link
                  href={item?.link}
                  className={`duration-200 transition-all overflow-hidden hover:text-white
                 hover:bg-warning flex gap-4 px-3 py-2 rounded
                 ${item?.link === pathname ? "bg-warning text-white" : ""}
                 `}
                >
                  {item?.icon}
                  <span> {item?.name}</span>
                </Link>
              </li>
            );
          } else {
            return (
              <li key={index}>
                <Link
                  href={item?.link}
                  className={`duration-200 transition-all overflow-hidden hover:text-white
                     hover:bg-warning flex gap-4 px-3 py-2 rounded
                     ${
                       pathname.includes(item?.link)
                         ? "bg-warning text-white"
                         : ""
                     }
                     `}
                >
                  {item?.icon}
                  <span>{item?.name}</span>
                </Link>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}

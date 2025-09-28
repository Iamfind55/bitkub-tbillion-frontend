"use client";
import { useTranslation } from "@/lib/i18n";
import Link from "next/link";
function Footer() {
  const { t } = useTranslation();

  const socialList = [
    {
      icon: "",
      title: "+856 20 93046151",
      link: "https://lin.ee/NNcSXO3",
    },
  ];
  return (
    <div className="px-4">
      <div className="w-full md:mt-5 grid grid-cols-6 md:grid-cols-6 gap-2">
        <div className="md:col-span-2 col-span-12 text-gray-300">
          <div className="py-2 logo flex items-center">
            <img src="/new-logo/logo.jpeg" alt="logo" className="h-10 w-10 rounded-sm" />
            <span className="lg:text-2xl text-xl font-bold ml-2 select-none uppercase">
              Tbillions
            </span>
          </div>
          <div className="mt-3">
            <p>Email: tbillion@gmail.com</p>
          </div>
        </div>
        <div className="md:col-span-2 col-span-12 mt-2 text-gray-300">
          <h1 className="text-xl">{t("footer.contact_us")}:</h1>
          {socialList?.map((item, index) => (
            <div key={index} className="mt-3">
              <Link href={item.link} className="flex">
                <p className="px-2 flex items-center">{item.title}</p>
              </Link>
            </div>
          ))}
        </div>
        <div className="md:col-span-2 col-span-12 md:mt-2 mt-5 text-gray-300">
          <Link
            href="/trade/BTCUSDT"
            className="lg:text-md text-gray-800 py-2 px-4 rounded-md text-sm font-bold bg-yellow-500"
          >
            {t("hero.trade_now")}
          </Link>
          <p className="mt-5 text-sm">
            {t("footer.title")}
          </p>
        </div>
      </div>
      <div className="border-t border-gray-500 mt-5">
        <p className="py-4 text-gray-300 text-md">
          {t("footer.description")}
        </p>
      </div>
    </div>
  );
}

export default Footer;

"use client";

import { LinkApi } from "@/enum/linkapi";
import { IDataQR } from "@/interface/type";
import { useTranslation } from "@/lib/i18n";
import useApi from "@/services/api";
import { getTypetradePrice } from "@/services/services";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Main() {
  const { t } = useTranslation();
  const router = useRouter();
  const api = useApi();
  const [data, setData] = useState<
    { icon: string; title: string; price: string }[]
  >([]);
  const [dataqr, setDataqr] = useState<IDataQR[]>([]);
  useEffect(() => {
    loaddata();
    loadqr();
  }, [setData]);

  const loaddata = async () => {
    const data = await getTypetradePrice();
    setData(data);
  };

  const loadqr = () => {
    api({ url: "qr-code", method: "get", params: {} }).then((res: any) => {
      if (res?.status == 200) {
        setDataqr(res.data);
      } else {
        console.log(res);
      }
    });
  };

  const defaultForm = {
    title: "",
    amount: "",
    image: "",
  };

  const [loading, setLoading] = useState(false);
  const [deposit, setDeposit] = useState(defaultForm);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );

    const formdata = new FormData();
    formdata.append("name", deposit.title || data[0]?.title);
    formdata.append("amount", deposit.amount);
    formdata.append("images", deposit.image);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow" as RequestRedirect,
    };
    setLoading(true);
    fetch(process.env.NEXT_PUBLIC_API_URL + LinkApi.coin, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        toast.success("ฝากเหรียญเรียบร้อยแล้ว");
        setTimeout(() => {
          setLoading(false);
          router.push("/myinfo/transactioncoin");
        }, 1200);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  return (
    <div className="container mx-auto flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full px-8 md:px-0 md:w-[500px]"
      >
        <div>
          <div className="mt-[80px]">
            <p className="text-center">{t("deposit.title")}</p>
            <div className="flex justify-center mt-3">
              {dataqr?.length > 0 ? (
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}/images/${dataqr[0]?.qr}`}
                  alt="profile"
                  className="w-40 h-40 rounded-sm"
                />
              ) : (
                <img
                  src="/images/btc-qrcode.jpeg"
                  alt="image"
                  className="w-40 h-40"
                />
              )}
            </div>
            <div className="border rounded border-slate-400/30 px-5 py-2 mt-5 text-sm text-gray-200">
              <div>
                <div className="text-slate-400">{t("deposit.network")}:</div>{" "}
                {dataqr[0]?.name || "BTC"}
              </div>
              <div className="border-t border-slate-400/30 my-2" />
              <div>
                <div className="text-slate-400">{t("deposit.address")}:</div>{" "}
                {dataqr[0]?.accountNumber ||
                  "1FdiU4BTJWPpKxxaJpa2GZFfMPhjuZq9MV"}
              </div>
            </div>
            <div className="mt-5">
              <label
                className="block mb-1 text-sm font-medium text-gray-200"
                htmlFor="coin_type"
              >
                {t("deposit.coin_type")}
              </label>
              <select
                required
                id="coin_type"
                className="bg-gray-400 py-2.5 px-3 border border-gray-500 text-dark  text-sm rounded-lg focus:ring-blue-200 focus:border-blue-200 block w-full"
                onChange={(e: any) =>
                  setDeposit({ ...deposit, title: e.target.value })
                }
              >
                <option value="">--เลือกประเภทเลียน--</option>
                {data.map((item, index) => {
                  return (
                    <option key={index} value={item.title}>
                      {item.title}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="mt-3">
              <label className="block mb-1 text-sm font-medium text-gray-200">
                {t("deposit.amount")}
              </label>
              <div className="relative">
                <input
                  type="number"
                  className="bg-info border border-gray-500 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                  value={deposit.amount}
                  onChange={(e) =>
                    setDeposit({ ...deposit, amount: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="mt-3">
              <label className="block mb-1 text-sm font-medium text-gray-200">
                {t("deposit.upload")}
              </label>
              <div className="relative">
                <input
                  type="file"
                  className="bg-info border border-gray-500 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                  accept="image/*"
                  onChange={(e: any) =>
                    setDeposit({ ...deposit, image: e.target.files[0] })
                  }
                />
              </div>
            </div>
            <button
              type="submit"
              className="py-2 px-3 bg-success rounded mt-5"
              disabled={loading}
            >
              {loading ? t("deposit.uploading") : t("deposit.confirm")}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Main;

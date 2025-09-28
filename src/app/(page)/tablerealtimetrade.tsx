"use client";
import { FormatNumber } from "@/helper/format";
import {
  getAgldusdt1,
  getBnbusdt1,
  getBtcusdt1,
  getEthusdt1,
  getPaxgusdt1,
  getTrxusdt1,
  getXrpusdt1,
} from "@/services/services";
import Link from "next/link";
import React, { useEffect, useState } from "react"; 
export default function Tablerealtimetrade() { 
  const [data, setData] = useState({
    bnb: 0,
    btc: 0,
    eth: 0,
    xrp: 0,
    trx: 0,
    agld: 0,
    paxg: 0,
  });

  useEffect(() => {
    loaddata();
  }, [setData]);

  const loaddata = async () => {
    await getEthusdt1().then((res) => {
      setData((prevData) => ({
        ...prevData,
        eth: Number(res[0][4]),
      }));
    });

    await getBtcusdt1().then((res) => {
      setData((prevData) => ({
        ...prevData,
        btc: Number(res[0][4]),
      }));
    });

    await getBnbusdt1().then((res) => {
      setData((prevData) => ({
        ...prevData,
        bnb: Number(res[0][4]),
      }));
    });

    await getXrpusdt1().then((res) => {
      setData((prevData) => ({
        ...prevData,
        xrp: Number(res[0][4]),
      }));
    });
    await getAgldusdt1().then((res) => {
      setData((prevData) => ({
        ...prevData,
        agld: Number(res[0][4]),
      }));
    });
    await getTrxusdt1().then((res) => {
      setData((prevData) => ({
        ...prevData,
        trx: Number(res[0][4]),
      }));
    });
    await getPaxgusdt1().then((res) => {
      setData((prevData) => ({
        ...prevData,
        paxg: Number(res[0][4]),
      }));
    });
  };

  return (
    <table className="w-full">
      <tbody>
        <tr className="cursor-pointer">
          <td className="w-10 py-2">
            <Link href={`/trade/btc`}>
              <img
                src={`/images/logo/bitcoin.png`}
                alt=""
                className="w-8 h-8"
              />
            </Link>
          </td>
          <td className="py-2">
            <Link href={`/trade/btc`}>Bitcoin btc</Link>
          </td>
          <td className="text-warning font-bold pl-5 text-end py-2">
            <Link href={`/trade/btc`}>
              {data.btc ? "$" + FormatNumber(data.btc) : "กำลังส่ง..."}
            </Link>
          </td>
        </tr>

        <tr className="cursor-pointer">
          <td className="w-10 py-2">
            <Link href={`/trade/eth`}>
              <img src={`/images/logo/eth.png`} alt="" className="w-8 h-8" />
            </Link>
          </td>
          <td className="py-2">
            <Link href={`/trade/eth`}>Ethereum eth</Link>
          </td>
          <td className="text-warning font-bold pl-5 text-end py-2">
            <Link href={`/trade/eth`}>
              {data.eth ? "$" + FormatNumber(data.eth) : "กำลังส่ง..."}
            </Link>
          </td>
        </tr>

        <tr className="cursor-pointer">
          <td className="w-10 py-2">
            <Link href={`/trade/paxg`}>
              <img src={`/images/logo/paxg.png`} alt="" className="w-8 h-8" />
            </Link>
          </td>
          <td className="py-2">
            <Link href={`/trade/paxg`}>PAXG</Link>
          </td>
          <td className="text-warning font-bold pl-5 text-end py-2">
            <Link href={`/trade/paxg`}>
              {data.paxg ? "$" + FormatNumber(data.paxg) : "กำลังส่ง..."}
            </Link>
          </td>
        </tr>

        <tr className="cursor-pointer">
          <td className="w-10 py-2">
            <Link href={`/trade/bnb`}>
              <img src={`/images/logo/bnb.png`} alt="" className="w-8 h-8" />
            </Link>
          </td>
          <td className="py-2">
            <Link href={`/trade/bnb`}>BNB bnb</Link>
          </td>
          <td className="text-warning font-bold pl-5 text-end py-2">
            <Link href={`/trade/bnb`}>
              {data.bnb ? "$" + FormatNumber(data.bnb) : "กำลังส่ง..."}
            </Link>
          </td>
        </tr>

        <tr className="cursor-pointer">
          <td className="w-10 py-2">
            <Link href={`/trade/agld`}>
              <img src={`/images/logo/agld.png`} alt="" className="w-8 h-8" />
            </Link>
          </td>
          <td className="py-2">
            <Link href={`/trade/agld`}>AGLD</Link>
          </td>
          <td className="text-warning font-bold pl-5 text-end py-2">
            <Link href={`/trade/agld`}>
              {data.agld ? "$" + FormatNumber(data.agld) : "กำลังส่ง..."}
            </Link>
          </td>
        </tr>

        <tr className="cursor-pointer">
          <td className="w-10 py-2">
            <Link href={`/trade/xrp`}>
              <img src={`/images/logo/xrp.png`} alt="" className="w-8 h-8" />
            </Link>
          </td>
          <td className="py-2">
            <Link href={`/trade/xrp`}>XRP</Link>
          </td>
          <td className="text-warning font-bold pl-5 text-end py-2">
            <Link href={`/trade/xrp`}>
              {data.xrp ? "$" + FormatNumber(data.xrp) : "กำลังส่ง..."}
            </Link>
          </td>
        </tr>

        <tr className="cursor-pointer">
          <td className="w-10 py-2">
            <Link href={`/trade/trx`}>
              <img src={`/images/logo/trx.png`} alt="" className="w-8 h-8" />
            </Link>
          </td>
          <td className="py-2">
            <Link href={`/trade/trx`}>TRX</Link>
          </td>
          <td className="text-warning font-bold pl-5 text-end py-2">
            <Link href={`/trade/trx`}>
              {data.trx ? "$" + FormatNumber(data.trx) : "กำลังส่ง..."}
            </Link>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

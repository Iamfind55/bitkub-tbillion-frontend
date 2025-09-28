"use client";
import { FormatNumber } from "@/helper/format";
import { refreshwallet, updatewallet } from "@/redux/slice/walletSlice";
import useApi from "@/services/api";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
export default function Mywallet() {
  const dispatch = useDispatch();
  const { wallet } = useSelector((state: any) => state.wallet);
  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    const socket = io(`${process.env.NEXT_PUBLIC_API_SOCKET}`); // Replace with your server URL
    socket.on("deposit", (res: any) => {
      dispatch(refreshwallet());
    });
    return () => {
      socket.disconnect();
    };
  }, [wallet?.refresh]);

  useEffect(() => {
    if (!user?.role) return;
    loadwallet();
  }, [wallet?.refresh]);

  const api = useApi();
  const loadwallet = () => {
    api({ url: "wallets/account", method: "get", params: {} }).then((res) => {
      if (res?.status == 200) {
        dispatch(
          updatewallet({
            balance: res?.data?.balance,
          })
        );
      } else {
        dispatch(
          updatewallet({
            balance: 0,
          })
        );
      }
    });
  };
  return <>{FormatNumber(Number(wallet.balance))} USDT</>;
}

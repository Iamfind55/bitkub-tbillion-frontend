import { ListTypeTrade } from "@/data/listtypetrade";
import { ILogins, IRegister } from "@/interface/logintype";
import { IForgotpassword } from "@/interface/registertype";
import { toast } from "react-toastify";
const option = {
  "Content-Type": "application/json",
  origin: `${process.env.NEXT_PUBLIC_URL}`,
};
// get btcusdt
export const getBtcusdt1 = async () => {
  return fetch(
    process.env.NEXT_PUBLIC_BINANCE +
      "/api/v3/uiKlines?limit=1&symbol=BTCUSDT&interval=1m"
  ).then((res) => res.json());
};

// get Ethusdt
export const getEthusdt1 = async () => {
  return fetch(
    process.env.NEXT_PUBLIC_BINANCE +
      "/api/v3/uiKlines?limit=1&symbol=ETHUSDT&interval=1m"
  ).then((res) => res.json());
};
// get btcusdt
export const getBnbusdt1 = async () => {
  return fetch(
    process.env.NEXT_PUBLIC_BINANCE +
      "/api/v3/uiKlines?limit=1&symbol=BNBUSDT&interval=1m"
  ).then((res) => res.json());
};

// get xrpusdt 1
export const getXrpusdt1 = async () => {
  return fetch(
    process.env.NEXT_PUBLIC_BINANCE +
      "/api/v3/uiKlines?limit=1&symbol=XRPUSDT&interval=1m"
  ).then((res) => res.json());
};

// get agldusdt 1
export const getAgldusdt1 = async () => {
  return fetch(
    process.env.NEXT_PUBLIC_BINANCE +
      "/api/v3/uiKlines?limit=1&symbol=AGLDUSDT&interval=1m"
  ).then((res) => res.json());
};

// get agldusdt 1
export const getTrxusdt1 = async () => {
  return fetch(
    process.env.NEXT_PUBLIC_BINANCE +
      "/api/v3/uiKlines?limit=1&symbol=TRXUSDT&interval=1m"
  ).then((res) => res.json());
};
// get paxgusdt 1
export const getPaxgusdt1 = async () => {
  return fetch(
    process.env.NEXT_PUBLIC_BINANCE +
      "/api/v3/uiKlines?limit=1&symbol=PAXGUSDT&interval=1m"
  ).then((res) => res.json());
};

// ==========================getcoinbytype====================================

//  get limit 200 collumn
export const getTypetrade = async (type: any) => {
  const foundItem = ListTypeTrade.find((item) => item.title === type);
  if (foundItem) {
    return fetch(
      `${process.env.NEXT_PUBLIC_BINANCE}/api/v3/uiKlines?limit=200&symbol=${type}&interval=1m`
    ).then((res) => res.json());
  } else {
    return fetch(
      `${process.env.NEXT_PUBLIC_BINANCE}/api/v3/uiKlines?limit=200&symbol=BTCUSDT&interval=1s`
    ).then((res) => res.json());
  }
};

//  get limit 200 collumn
export const getTypetradePrice = async () => {
  const promises = ListTypeTrade.map(async (item) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BINANCE}/api/v3/uiKlines?limit=1&symbol=${item.title}&interval=1m`
    );
    const data = await response.json();
    return {
      icon: item.icon,
      title: item.title,
      price: data[0][4], // Assuming you want to store the response from the API in the 'detail' property
    };
  });

  const results = await Promise.all(promises);
  return results;
};

// ===============================================================

//  get limit 200 collumn
export const getBtcusdt = async () => {
  return await fetch(
    process.env.NEXT_PUBLIC_BINANCE +
      "/api/v3/uiKlines?limit=200&symbol=BTCUSDT&interval=1m"
  ).then((res) => res.json());
};

// get Ethusdt 200
export const getEthusdt = async () => {
  return fetch(
    process.env.NEXT_PUBLIC_BINANCE +
      "/api/v3/uiKlines?limit=200&symbol=ETHUSDT&interval=1m"
  ).then((res) => res.json());
};

// get btcusdt 200
export const getBnbusdt = async () => {
  return fetch(
    process.env.NEXT_PUBLIC_BINANCE +
      "/api/v3/uiKlines?limit=200&symbol=BNBUSDT&interval=1m"
  ).then((res) => res.json());
};

// get xrpusdt 200
export const getXrpusdt = async () => {
  return fetch(
    process.env.NEXT_PUBLIC_BINANCE +
      "/api/v3/uiKlines?limit=200&symbol=XRPUSDT&interval=1m"
  ).then((res) => res.json());
};

// get agldusdt 200
export const getAgldusdt = async () => {
  return fetch(
    process.env.NEXT_PUBLIC_BINANCE +
      "/api/v3/uiKlines?limit=200&symbol=AGLDUSDT&interval=1m"
  ).then((res) => res.json());
};

// get agldusdt 200
export const getTrxusdt = async () => {
  return fetch(
    process.env.NEXT_PUBLIC_BINANCE +
      "/api/v3/uiKlines?limit=200&symbol=TRXUSDT&interval=1m"
  ).then((res) => res.json());
};
// get paxgusdt 200
export const getPaxgusdt = async () => {
  return fetch(
    process.env.NEXT_PUBLIC_BINANCE +
      "/api/v3/uiKlines?limit=200&symbol=PAXGUSDT&interval=1m"
  ).then((res) => res.json());
};

// get currency
export const getCurrency = async () => {
  return fetch(
    process.env.NEXT_PUBLIC_BINANCE +
      "/bapi/asset/v1/public/asset-service/product/currency"
  ).then((res) => res.json());
};

// get users
export const getusers = async () => {
  const user = await fetch(
    process.env.NEXT_PUBLIC_BINANCE +
      "/bapi/bigdata/v1/public/bigdata/homePage/registeredUserCount"
  ).then((res) => res.json());
  if (user) {
    return user;
  }
};

export const getPromotion = async () => {
  const promotion = await fetch(
    process.env.NEXT_PUBLIC_URL + "/public/promotion"
  ).then((res) => res.json());
  if (promotion) {
    return promotion;
  }
};

export const ActionLogin = async (data: ILogins) => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_URL + "/auth/login", {
      method: "POST",
      headers: option,
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("email or password failed");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error: any) {
    if (error.message === "email or password failed") {
      toast.warning("อีเมลหรือรหัสผ่านล้มเหลว!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      return { error: error.message }; // Return an error message or handle as needed
    }
  }
};

export const ActionRegister = async (data: IRegister) => {
  const response = await fetch(process.env.NEXT_PUBLIC_URL + "/auth/signup", {
    method: "POST",
    headers: option,
    body: JSON.stringify(data),
  }).then((res) => res.json());

  return response;
};

export const ActionForgotpassword = async (data: IForgotpassword) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_URL + "/auth/forgot-password",
    {
      method: "POST",
      headers: option,
      body: JSON.stringify(data),
    }
  ).then((res) => res.json());

  return response;
};

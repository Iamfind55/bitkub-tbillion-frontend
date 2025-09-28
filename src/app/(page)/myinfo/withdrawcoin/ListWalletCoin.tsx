import { FormatNumber } from "@/helper/format";
import { IListcoinType } from "@/interface/type";
import useApi from "@/services/api";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ListTypeTrade } from "@/data/listtypetrade";
import { toast } from "react-toastify";
import Button from "@/utils/Button";
import MyModal from "@/utils/modal";
import Textfield from "@/utils/Textfield";
import Numberfield from "@/utils/Numberfield";

export default function ListWalletCoin() {
  const dispatch = useDispatch();
  const [isopen, setIsopen] = useState(false);
  const api = useApi();

  const [totalwallet, setTotalwallet] = useState(0);
  const [formwithdraw, setFormwithdraw] = useState<{
    name: string;
    walletId: string;
    amount: number;
  }>({ name: "", walletId: "", amount: 0 });

  const [data, setData] = useState<IListcoinType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    LoadData();
  }, []);

  const LoadData = () => {
    setIsLoading(true);
    api({
      url: "wallets/owner",
      method: "get",
      params: {},
    }).then((res) => {
      setData(res?.data || []);
      setIsLoading(false);
    }).catch((error) => {
      console.error("Failed to load wallet data:", error);
      toast.error("Failed to load wallet data");
      setIsLoading(false);
    });
  };

  const handlewithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formwithdraw?.walletId) {
      toast.warning("กรุณาเลือกกระเป๋าก่อน");
      return;
    }

    if (!formwithdraw?.amount || formwithdraw.amount < 1) {
      toast.warning("กรุณาระบุจำนวนเหรียญ");
      return;
    }

    if (formwithdraw.amount > totalwallet) {
      toast.warning("เหรียญของคุณไม่เพียงพอ");
      return;
    }

    api({
      url: "coins/withdraw",
      method: "post",
      params: formwithdraw,
    }).then((res) => {
      if (res?.status === "200") {
        setIsopen(false);
        setFormwithdraw({ name: "", walletId: "", amount: 0 });
        LoadData();
        toast.success("สร้างกานถอนเหรียญสำเร็จ!");
      } else {
        console.error("Withdrawal failed:", res);
        toast.error("การถอนเหรียญล้มเหลว");
      }
    }).catch((error) => {
      console.error("Withdrawal error:", error);
      toast.error("เกิดข้อผิดพลาดในการถอนเหรียญ");
    });
  };

  const keyup = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormwithdraw({ ...formwithdraw, [e.target.name]: e.target.value });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto md:w-[700px] lg:w-[900px] w-full md:py-5 md:px-10 py-2 px-2">
      <div className="grid grid-cols-12 md:gap-5 gap-3">
        {data.length === 0 ? (
          <div className="col-span-12 text-center text-gray-500">
            No wallet data available
          </div>
        ) : (
          data.map((item: IListcoinType, index) => {
            const icon = ListTypeTrade.find(
              (result) => result.title === item.type.name
            )?.icon;

            return (
              <div
                key={index}
                className="col-span-12 sm:col-span-6 lg:col-span-4 bg-primary/80 p-5 rounded shadow text-white w-full flex flex-col items-center justify-center"
              >
                <div className="text-sm overflow-hidden font-bold bg-warning shadow-lg flex justify-center items-center rounded-full p-2">
                  <img
                    src={`/icons/${icon}`}
                    alt={`${item.type.name} icon`}
                    className="md:w-10 md:h-10 w-8 h-8 rounded-full"
                  />
                </div>
                <div className="mt-3 text-sm">{item?.type?.name}</div>
                <div className="text-md font-bold">
                  {FormatNumber(Number(item.balance))}
                </div>
                <div className="text-md font-bold flex gap-2 justify-center mt-3 w-full">
                  <Button
                    title="ถอน"
                    className="bg-success text-[12px] px-4 py-2 rounded"
                    onClick={() => {
                      setIsopen(true);
                      setTotalwallet(Number(item?.balance));
                      setFormwithdraw({
                        name: item.type.name,
                        walletId: item.walletId,
                        amount: Number(item.balance),
                      });
                    }}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>

      <MyModal
        isOpen={isopen}
        onClose={() => setIsopen(!isopen)}
        className="w-[350px] md:w-[400px]"
      >
        <h3 className="text-lg text-center font-bold">ฟอร์มถอนเหรียญ</h3>
        <form className="md:py-4 md:px-5 p-1" onSubmit={handlewithdraw}>
          <div className="flex flex-col gap-3">
            <Textfield
              required
              title="ประเภทเหรียญ"
              name="name"
              placeholder="ประเภทเหรียญ..."
              value={formwithdraw?.name}
              id="name"
              disabled
              className="opacity-80 w-full rounded"
              onChange={keyup}
            />
            <Numberfield
              title="จำนวนเหรียญ"
              id="amount"
              required
              type="number"
              placeholder="จำนวนเหรียญ..."
              name="amount"
              onChange={(e: any) => {
                const numbers = parseFloat(e.target.value.replace(/,/g, ""));
                setFormwithdraw({
                  ...formwithdraw,
                  amount: Number(numbers),
                });
              }}
            />

            <Button
              value="Confirm"
              title="ยืนยัน"
              className="bg-success text-white rounded py-3 mt-3"
            />
          </div>
        </form>
      </MyModal>
    </div>
  );
}
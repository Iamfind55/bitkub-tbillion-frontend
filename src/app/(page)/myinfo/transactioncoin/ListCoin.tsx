import { FormatDatetime, FormatNumber } from "@/helper/format";
import useApi from "@/services/api";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ListTypeTrade } from "@/data/listtypetrade";
import { ITransactionCoin } from "@/interface/type";
import Iconedit from "@/icon/iconedit";
import ReactPaginate from "react-paginate";
import Numberfield from "@/utils/Numberfield";
import Textfield from "@/utils/Textfield";
import MyModal from "@/utils/modal";
import Button from "@/utils/Button";
import Iconreturnback from "@/icon/iconreturnback";
import Iconreturnnext from "@/icon/iconreturnnext";

export default function ListCoin() {
  const [pagination, setPagination] = useState<{
    pageSize: number;
    page: number;
    total: number;
    sortBy: string;
    order: string;
  }>({
    pageSize: 12,
    page: 1,
    total: 0,
    sortBy: "createdAt",
    order: "DESC",
  });
  const dispatch = useDispatch();
  const api = useApi();

  const [isopen, setIsopen] = useState(false);
  const [reload, setReload] = useState(false);

  const keyup = (e: any) => {
    // setFormwithdraw({ ...formwithdraw, [e.target.name]: e.target.value });
  };
  const [data, setData] = useState<ITransactionCoin[]>([]);
  useEffect(() => {
    LoadData();
  }, [setData, pagination?.page, pagination?.pageSize]);

  const LoadData = () => {
    api({
      url: "coins/owner",
      method: "get",
      params: pagination,
    }).then((res) => {
      setData(res?.data);
      setPagination({ ...pagination, total: res?.total });
    });
  };

  const getStatusBadge = (status: string) => {
    if (status === "rejected") {
      return <span className="badge badge-danger">ปฏิเสธ</span>;
    } else if (status === "pending") {
      return <span className="badge badge-warning">รอดำเนินการ</span>;
    } else if (status == "completed") {
      return <span className="badge badge-success">สำเร็จ</span>;
    }
  };
  const getStatuType = (status: string) => {
    if (status === "withdraw") {
      return (
        <div>
          <div className=" bg-danger w-[50px] h-[50px] rounded-full flex justify-center items-center">
          ถอน
          </div> 
        </div>
      );
    } else {
      return (
        <div>
          <div className=" bg-success w-[50px] h-[50px]  rounded-full flex justify-center items-center">
          ฝาก
          </div> 
        </div>
      );
    }
  };

  return (
    <div className="w-full overflow-x-auto md:mt-5 mt-3 pb-5">
      <div className="grid grid-cols-12 lg:gap-5 gap-3  md:mt-5 mt-3">
        {data.length > 0 ? (
          data.map((item: ITransactionCoin, index) => {
            const icon = ListTypeTrade.find(
              (result) => result?.title == item?.name
            )?.icon;
            return (
              item?.name !== null && (
                <div
                  className="xl:col-span-3 lg:col-span-4 md:col-span-6 col-span-12 bg-primary/80 px-5 py-2 relative rounded shadow text-white w-full gap-5 flex items-center justify-center"
                  key={index}
                >
                  {getStatuType(item?.type)}

                  <div className="w-full">
                    
                    <div className="text-sm w-fll flex justify-between">
                    <div className="py-1 flex items-center gap-2">
                      <img
                        src={`/icons/${icon}`}
                        alt=""
                        className="w-5 h-5 rounded-full shadow-md"
                      />
                      <span>{item?.name}</span>
                    </div>
                      <span>{getStatusBadge(item?.status)}</span>
                    </div>
                    <div className="text-md ">
                      จำนวน:{" "}
                      <span className="font-bold">
                        {item?.type=='withdraw'?'-':'+'}
                        {FormatNumber(Number(item.amount))}
                      </span>
                    </div>

                    <div className="text-sm mt-1">
                      เมื่อ: {FormatDatetime(item?.createdAt)}
                    </div>
                    {/* <button
                      className="text-sm flex gap-2 items-center absolute p-2 top-1 right-1"
                      onClick={() => {
                        setIsopen(true);
                      }}
                    >
                      <Iconedit />
                    </button> */}
                  </div>
                </div>
              )
            );
          })
        ) : (
          <div className="col-span-12 text-center">ไม่มีข้อมูล</div>
        )}
      </div>

      <div
        className={`mt-5 ${
          Number(pagination?.total) > Number(pagination?.pageSize)
            ? "block"
            : "hidden"
        }`}
      >
        <ReactPaginate
          activeClassName="active"
          breakClassName="break-me"
          containerClassName="pagination"
          disabledClassName="disabled"
          nextClassName="next"
          nextLabel="next"
          pageClassName="page"
          onPageChange={(e) => {
            setPagination({ ...pagination, page: e.selected + 1 });
          }}
          pageCount={Number(pagination?.total) / Number(pagination?.pageSize)} // 10 / 2 = 5
          marginPagesDisplayed={1}
          pageRangeDisplayed={1}
          previousClassName="previous"
          previousLabel="pre"
        />
      </div>

      <MyModal
        isOpen={isopen}
        onClose={() => setIsopen(!isopen)}
        className="w-[350px] md:w-[400px]"
      >
        <h3 className="text-lg text-center font-bold">ฟอร์มแก้ไข</h3>
        <form className="md:py-4 md:px-5 p-1">
          <div className="flex flex-col gap-3">
            <Textfield
              required
              title="ชื่อ"
              name="name"
              placeholder="ชื่อ..."
              id="name"
              onChange={keyup}
            />

            <Numberfield
              title="จำนวนเหรียญ"
              id="amount"
              required
              type="number"
              placeholder="จำนวนเหรียญ..."
              name="amount"
            />

            <Button
              value="Confirm"
              title="บันทืก"
              className="bg-warning text-white rounded  py-3 mt-3"
            />
          </div>
        </form>
      </MyModal>
    </div>
  );
}

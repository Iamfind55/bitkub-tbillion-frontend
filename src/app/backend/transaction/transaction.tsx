"use client";
import { Transaction } from "@/column/column";
import { LinkApi } from "@/enum/linkapi";
import { limitOptions } from "@/enum/option";
import { FormatDate } from "@/helper/format";
import { setIsOpen } from "@/redux/slice/dialogSlice";
import { useAppSelector } from "@/redux/store";
import useApi from "@/services/api";
import { useGetTransaction } from "@/services/transactionservice";
import Dialog from "@/utils/Dialog";
import ErrorPage from "@/utils/ErrorPage";
import Loader from "@/utils/Loader";
import Pagination from "@/utils/Pagination";
import Select from "@/utils/Select";
import TextfieldDefault from "@/utils/TextFiledDefault";
import "@/utils/style.css";
import { FormikValues, useFormik } from "formik";
import { useMemo, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import useFilter from "../user/hooks/useFilter";

const validationSchema = Yup.object({
  wallet: Yup.string().required("Wallet is required"),
  type: Yup.string().required("Type is required"),
  method: Yup.string().required("Method is required"),
  amount: Yup.number().required("Amount is required"),
});
function MainTransaction() {
  const api = useApi();
  const filter = useFilter();
  const transactionHook = useGetTransaction({ filter: filter.state });
  const { data, loading, total, error } = transactionHook;
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState(5);
  const dialog = useAppSelector((state) => state.dialog);
  const [dataEvents, setDataEvents] = useState({ action: "", data: {} });
  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>();

  const transactionType = [
    { label: "all", value: "" },
    { label: "withdraw", value: "withdraw" },
    { label: "deposit", value: "deposit" },
    { label: "trade", value: "trade" },
  ];

  const handleCancel = () => {
    formik.resetForm();
    handleClose();
  };

  const handleClose = () => {
    dispatch(setIsOpen({ isOpen: false, status: null }));
    setDataEvents({ action: "", data: {} });
  };
  const handleChange = <T extends keyof FormikValues>(
    key: T,
    value: FormikValues[T] | Date
  ) => {
    formik.handleChange(key as string)(value as string);
  };
  const handlePageClick = (event: any) => {
    const selected = event.selected;
    filter.dispatch({
      type: filter.ACTION_TYPE.PAGINATION,
      payload: selected + 1 || 0,
    });
  };
  const initialValues = dataEvents.data
    ? dataEvents.data
    : {
        wallet: "",
        type: "",
        method: "",
        amount: "",
      };
  const formik: any = useFormik({
    initialValues: dataEvents.data ? dataEvents.data : initialValues,
    validationSchema: dataEvents.action == "edit" ? "" : validationSchema,
    onSubmit: async (values: any) => {
      if (dataEvents.action === "edit") {
        const result = await api({
          url: `${LinkApi.users}/${(dataEvents.data as any)?.userId}`,
          method: "put",
          params: values,
        });
        if (result.status == 200 || result.response.data.status == 200) {
          handleClose();
        }
      } else {
        const result = await api({
          url: "LinkApi.users",
          method: "post",
          params: values,
        });

        if (result.status == 200 || result.response.data.status == 200) {
          handleClose();
        }
      }
    },
  });

  const textFields = useMemo(() => {
    const defaultData: Record<string, any> = dataEvents.data;
    return [
      { type: "text", title: "Wallet", key: "wallet" },
      { type: "text", title: "Type", key: "type" },
      { type: "text", title: "Method", key: "method" },
      { type: "number", title: "Amount", key: "amount" },
    ].map((field) => {
      if (field.type === "text" || field.type === "number") {
        return (
          <div key={field.key}>
            {field.type === "text" && (
              <TextfieldDefault
                type={field.type}
                title={field.title}
                defaultValue={defaultData ? defaultData[field.key] : ""}
                onChange={(value) => handleChange(field.key, value)}
              />
            )}

            {formik.errors[field.key] && (
              <p className="text-sm text-red-600">
                {formik.errors[field.key]}
              </p>
            )}
          </div>
        );
      }
      return null;
    });
  }, [formik, dataEvents.data]);

  if (error) {
    return <ErrorPage />;
  }

  return (
    <div>
      <h6 className="px-1 py-1 text-gray-800 font-bold">Transaction</h6>
      <div className="mb-3 md:flex sm:block justify-between mt-2">
        <div className="flex mb-2 sm:mb-0">
          <Select
            option={limitOptions}
            value={filter.state.pageSize || ""}
            onChange={(e: any) =>
              filter.dispatch({
                type: filter.ACTION_TYPE.PAGE_ROW,
                payload: e.target.value || null,
              })
            }
            className="px-2 lg:py-2 z-auto text-base text-gray-900 border border-gray-300 rounded-lg focus:border-gray-200 bg-gray-50 min-w-[70px]"
          />

          <Select
            option={transactionType}
            value={filter.state.status || ""}
            onChange={(e: any) =>
              filter.dispatch({
                type: filter.ACTION_TYPE.STATUS,
                payload: e.target.value || null,
              })
            }
            className="ml-2 px-1 py-2 md:hidden w-32 text-base text-gray-900 border border-gray-300 rounded-lg focus:border-gray-200 bg-gray-50"
          />
        </div>
        <div className="block sm:flex">
          <Select
            name="status"
            option={transactionType}
            value={filter.state.status}
            onChange={(e: any) =>
              filter.dispatch({
                type: filter.ACTION_TYPE.STATUS,
                payload: e.target.value || null,
              })
            }
            className="mr-2 px-2 lg:py-2 hidden sm:inline-block w-32 text-base text-gray-900 border border-gray-300 rounded-lg focus:border-gray-200 bg-gray-50"
          />
          <div className="flex mb-2 mr-2 px-2">
            <ReactDatePicker
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                filter.dispatch({
                  type: filter.ACTION_TYPE.START_DATE,
                  payload: date,
                });
              }}
              dateFormat="yyyy-MM-dd"
              placeholderText="yyyy-mm-dd"
              className="border border-gray-400 mr-2 sm:mr-0 rounded-lg px-4 py-2 w-full"
              wrapperClassName="custom-datepicker-wrapper"
              popperClassName="custom-popper"
            />
            <ReactDatePicker
              selected={endDate}
              onChange={(date) => {
                setEndDate(date);
                filter.dispatch({
                  type: filter.ACTION_TYPE.END_DATE,
                  payload: date,
                });
              }}
              dateFormat="yyyy-MM-dd"
              placeholderText="yyyy-mm-dd"
              className="border border-gray-400 ml-2 rounded-md px-4 py-2 w-full"
              wrapperClassName="custom-datepicker-wrapper"
              popperClassName="custom-popper"
            />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        {loading && <Loader />}
        {!loading && !error && data && (
          <table className="table text-sm">
            <thead>
              <tr>
                {Transaction.map((column) => {
                  return <th key={column}>{column}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((row: any, index) => {
                  let status;
                  if (row.status === "completed") {
                    status = "badge-success";
                  } else {
                    status = "badge-danger";
                  }

                  return (
                    <tr key={index}>
                      <td>
                        {index +
                          1 +
                          Number(
                            filter.state.pageSize *
                              (filter.state.currentPage - 1)
                          )}
                      </td>
                      <td>{row?.wallet?.user.name}</td>
                      <td>{row.amount}</td>
                      <td>{row.type}</td>
                      <td>{row.method}</td>
                      <td>
                        <div title="pending">
                          <span className={`${status}`}>{row.status}</span>
                        </div>
                      </td>
                      <td>{FormatDate(row.createdAt)}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </div>
      {total > filter.state.pageSize && (
        <div className="py-2 mb-2">
          <Pagination
            handlePageClick={handlePageClick}
            pageCount={total}
            filter={filter}
          />
        </div>
      )}
      <Dialog
        titleClose="Cancel"
        titleSave="Save"
        isOpen={dialog?.isOpen}
        onClose={handleClose}
      >
        <form onSubmit={formik.handleSubmit}>
          <h3 className="mb-4 font-semibold text-gray-900">
            {dataEvents.action ? "Edit deposit" : "Create deposit"}
          </h3>
          <div className="grid md:grid-cols-2 md:gap-6">{textFields}</div>
          <div className="flex gap-2 py-5">
            <button className="btn-danger" onClick={handleCancel}>
              Close
            </button>
            <button type="submit" className="btn-success">
              Save
            </button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}

export default MainTransaction;

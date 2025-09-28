"use client";
import { UserAccountColumns } from "@/column/column";
import { LinkApi } from "@/enum/linkapi";
import { FormatDate, calculateAge, formatDateDash } from "@/helper/format";
import { setIsOpen } from "@/redux/slice/dialogSlice";
import { useAppSelector } from "@/redux/store";
import useApi from "@/services/api";
import { useGetUserById } from "@/services/userservice";
import Dialog from "@/utils/Dialog";
import ErrorPage from "@/utils/ErrorPage";
import Notification from "@/utils/Notification";
import Skeleton from "@/utils/Skeleton";
import TextfieldDefault from "@/utils/TextFiledDefault";
import Maincontent from "@/utils/maincontent";
import { useFormik } from "formik";
import { useParams } from "next/navigation";
import { useState } from "react";
import { MdAddCard } from "react-icons/md";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import * as Yup from "yup";

function UserDetail() {
  const { id } = useParams();
  const userId = Array.isArray(id) ? id[0] : id;
  const userByIdHook = useGetUserById(userId);
  const { data, loading, error } = userByIdHook;
  const dispatch = useDispatch();
  const dialog = useAppSelector((state) => state.dialog);
  const api = useApi();
  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState("");
  const steps = [
    {
      status: "Inactive",
      value: "inactive",
      label: "Starting inactive await admin approval to trading",
      text:
        data && data?.status === "inactive"
          ? "text-green-500"
          : "text-gray-900",
      border:
        data && data?.status === "inactive"
          ? "border-green-600"
          : "border-gray-900",
    },
    {
      status: "Active",
      value: "active",
      label: "User active trading",
      text:
        data && data?.status === "active" ? "text-green-500" : "text-gray-900",
      border:
        data && data?.status === "active"
          ? "border-green-600"
          : "border-gray-900",
    },
    {
      status: "Blocked",
      value: "blocked",
      label: "User block can't logged",
      text:
        data && data?.status === "blocked" ? "text-green-500" : "text-gray-900",
      border:
        data && data?.status === "blocked"
          ? "border-green-600"
          : "border-gray-900",
    },
  ];
  const handleClose = () => {
    formik.resetForm();
    dispatch(setIsOpen({ isOpen: false, status: null }));
  };

console.log(data);


  const handleApprove = async (step: string) => {
    try {
      const result = await Swal.fire({
        title: "You want to approve status?",
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "Yes, approve!",
        cancelButtonText: "No, keep it",
        icon: "warning",
      });

      if (result.isConfirmed) {
        const updateResult = await api({
          url: `/users/${id}`,
          method: "put",
          params: { status: step },
        });
        userByIdHook.refreshData();
        if (updateResult) {
          Swal.fire("Approve Successful!", "", "success");
        }
      }
    } catch (error) {
      console.error("Error in POST request:", error);
    }
  };
  setTimeout(() => {
    setShowNotification(false);
  }, 5000);

  const initialValues = {
    userId: id,
    type: "deposit",
    method: "bank transfer",
    amount: "",
  };
  const validationSchema = Yup.object({
    amount: Yup.string()
      .required("Amount is required")
      .test(
        "is-greater-than-100",
        "Amount less must be 100 up",
        (value) => parseInt(value) > 99
      ),
  });
  const formik: any = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values: any) => {
      try {
        const result = await api({
          url: LinkApi.deposit,
          method: "post",
          params: values,
        });
        if (result.status === 200) {
          userByIdHook.refreshData();
          handleClose();
          setShowNotification(true);
        }
        setMessage("Add balance success");
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div>
      {loading ? <Skeleton /> : error && <ErrorPage />}
      {!loading && !error && data && (
        <Maincontent>
          <h3 className="text-gray-800 font-bold mb-2 py-2 text-xl">
            Information
          </h3>
          <div className="grid gap-6 mb-2 md:grid-cols-2 border border-gray-100 rounded-md py-2 px-5">
            <div className="block md:flex">
              {data?.filename ? (
                <img
                  className="w-40 h-40 rounded object-fill"
                  src={`${process.env.NEXT_PUBLIC_API_URL}/images/${data.filename}`}
                  alt={data?.name}
                />
              ) : (
                <img
                  src="/images/profile_avatar.webp"
                  alt=""
                  className="w-40 h-40 rounded-full"
                />
              )}

              <div className="ml-5 py-4">
                <p className="text-base text-gray-900">name: {data?.name}</p>
                <p className="text-base text-gray-900">email: {data?.email}</p>
                <p className="text-base text-gray-900">birth: {data?.dob}</p>
              </div>
            </div>
            <div className="py-2 px-5 mb-10 mt-2">
              <h3 className="text-gray-900 text-xl font-bold mb-5">Wallet</h3>
              <p className="text-base">Wallet id: {data.wallet[0]?.walletId}</p>
              <p>Type: {data.wallet[0]?.type.code}</p>
              <div>
                <p>Balance: {data.wallet[0]?.balance} USDT</p>
                <div className="relative group mt-2">
                  <button
                    className="relative bg-warning py-2 px-2 rounded-md"
                    onClick={() => {
                      dispatch(
                        setIsOpen({ isOpen: true, status: "addDeposit" })
                      );
                    }}
                  >
                    Add deposit
                    <span className="absolute whitespace-nowrap -bottom-full bg-gray-700 text-white text-xs px-2 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition duration-300 transform translate-y-1/2 w-auto">
                      Add new balance
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="py-2 px-5 rounded-md mt-2 border border-gray-100">
            <h3 className="text-gray-900 text-xl font-bold mb-5">
              Information
            </h3>

            <div className="grid gap-6 mb-2 md:grid-cols-2 text-info">
              <div>
                <p>Female</p>
                <p className="font-bold">{data.gender}</p>
              </div>
              <div>
                <div>
                  <p>Age</p>
                  <p className="font-bold">{calculateAge(data.dob)}</p>
                </div>
              </div>
            </div>
            <div className="grid gap-6 mb-2 md:grid-cols-2 text-info">
              <div>
                <p>Address</p>
                <p className="font-bold">{data.address}</p>
              </div>
              <div>
                <p>Role</p>
                <p className="font-bold">{data.role}</p>
              </div>
            </div>
            <div className="grid gap-6 mb-2 md:grid-cols-2 text-info">
              <div>
                <p>Status</p>
                <span
                  className={`badge-${
                    data?.status === "inactive"
                      ? "primary"
                      : data?.status === "active"
                      ? "success"
                      : "danger"
                  } w-28 font-bold`}
                >
                  {data.status}
                </span>
              </div>
              <div>
                <p>CreatedAt</p>
                <p className="font-bold">{formatDateDash(data.createdAt)}</p>
              </div>
            </div>
          </div>
          <div className="py-2 px-5 rounded-md mt-2 border border-gray-100">
            <h3 className="text-gray-900 text-xl font-bold mb-5">
              Verified details
            </h3>

            <div className="grid gap-2 mb-2 md:grid-cols-2 text-info">
              {data?.profile?.map((preview:any, index:number) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg h-60 dark:bg-gray-800 dark:border-gray-700"
                >
                  <div className="p-4">
                    <p className="font-bold mb-2">Passport id/Card id</p>
                    {data?.profile?.length > 0 ? (
                      <a
                        href={`${process.env.NEXT_PUBLIC_API_URL}/images/${preview?.filename}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          className="w-full h-40 object-cover rounded-t-lg mb-4"
                          src={`${process.env.NEXT_PUBLIC_API_URL}/images/${preview?.filename}`}
                          alt={data?.profile[0]?.originalname}
                        />
                      </a>
                    ) : (
                      <p>Document for verification not upload get</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="py-2 px-5 rounded-md mt-2 border border-gray-100">
            <h3 className="text-gray-900 text-xl font-bold mb-5">
              Approve user status
            </h3>
            <div className="grid gap-6 mb-5 md:grid-cols-1 text-info">
              <ol className="items-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse">
                {steps?.map((step, index) => (
                  <li
                    key={index}
                    className={`flex items-center cursor-pointer ${step.text} space-x-2.5 rtl:space-x-reverse`}
                    onClick={() => handleApprove(step.value)}
                  >
                    <span
                      className={`flex items-center justify-center w-8 h-8 border ${step.border} rounded-full shrink-0 dark:border-blue-500`}
                    >
                      {index + 1}
                    </span>
                    <span>
                      <h3 className="font-medium leading-tight">
                        {step.status}
                      </h3>
                      <p className="text-sm">{step.value}</p>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          {data?.bank?.length > 0 && (
            <div className="py-4 px-5 rounded-md mt-2 border border-gray-100">
              <h3 className="text-gray-900 text-xl font-bold mb-5">
                Bank accounts
              </h3>
              {!loading && data && (
                <table className="table">
                  <thead>
                    <tr>
                      {UserAccountColumns?.map((column) => (
                        <th key={column}>{column}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data?.bank?.map((data: any, index: any) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{data.name}</td>
                        <td>{data.accountName}</td>
                        <td>{data.accountNumber}</td>
                        <td>{FormatDate(data.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
          <Dialog
            titleClose="Cancel"
            titleSave="Save"
            isOpen={dialog.isOpen}
            onClose={handleClose}
            className="bg-white overflow-auto mt-10 text-info p-6  rounded z-50 w-[80%] md:w-1/4 max-h-[85vh]"
          >
            <form onSubmit={formik.handleSubmit}>
              <TextfieldDefault
                title="Create deposit"
                type="number"
                required
                placeholder="100"
                name="amount"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.amount}
              />
              <p className="text-sm text-red-500">{formik.errors.amount}</p>
              <div className="flex gap-2 mt-5">
                <button
                  className="px-3 py-1 rounded-lg border border-gray-400 transition-all duration-200 font-bold text-lg"
                  onClick={handleClose}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="hover:text-gray-6s00 px-3 py-1 bg-yellow-500  rounded-lg transition-all duration-200 font-bold text-lg"
                >
                  Save
                </button>
              </div>
            </form>
          </Dialog>
          {showNotification && (
            <Notification message={message} timeout={5000} />
          )}
        </Maincontent>
      )}
    </div>
  );
}

export default UserDetail;

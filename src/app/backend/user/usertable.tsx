"use client";
import { UserColumns } from "@/column/column";
import { LinkApi } from "@/enum/linkapi";
import { FormatDate, formatDateDash } from "@/helper/format";
import Iconadd from "@/icon/iconadd";
import { IUserType } from "@/interface/usertype";
import { setIsOpen } from "@/redux/slice/dialogSlice";
import { useAppSelector } from "@/redux/store";
import useApi from "@/services/api";
import useHandleDelete from "@/services/deleteservice";
import { useGetUser } from "@/services/userservice";
import Button from "@/utils/Button";
import ButtonIcon from "@/utils/ButtonIcon";
import DatePicker from "@/utils/DatePicker";
import Dialog from "@/utils/Dialog";
import ErrorNotification from "@/utils/ErrorNotification";
import ErrorPage from "@/utils/ErrorPage";
import IconButton from "@/utils/IconButton";
import { EditIcon, TrashIcon } from "@/utils/Icons";
import Loader from "@/utils/Loader";
import Pagination from "@/utils/Pagination";
import SearchInput from "@/utils/SearchInput";
import Select from "@/utils/Select";
import SelectField from "@/utils/SelectField";
import TextfieldDefault from "@/utils/TextFiledDefault";
import { Formik, FormikErrors, FormikValues, useFormik } from "formik";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import * as Yup from "yup";
import useFilter from "./hooks/useFilter";
import { MdEdit } from "react-icons/md";
import { CiUnlock } from "react-icons/ci";
import { IoEyeOffOutline } from "react-icons/io5";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FiUnlock } from "react-icons/fi";
interface FormValues {
  userId?: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
type PasswordVisibilityState = {
  currentPass: boolean;
  newPass: boolean;
  confirmPass: boolean;
};
const initialValuesChangePassword = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};
const validate = (values: FormikValues) => {
  const errors: FormikErrors<FormikValues> = {};
  if (!values.oldPassword) {
    errors.oldPassword = "Required";
  }
  if (!values.newPassword) {
    errors.newPassword = "Required";
  } else if (values.newPassword.length < 8) {
    errors.newPassword = "Password must be at least 8 characters long";
  }
  if (values.newPassword !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }
  return errors;
};
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password less more 8 character")
    .required("Password is required"),
  phone: Yup.string().required("Phone number is required"),
  address: Yup.string().required("Address is required"),
});
interface DataType {
  walletId?: any;
  accountId?: any;
  name?: string;
  amount?: string;
  email?: string;
}
function UserTable() {
  const api = useApi();
  const filter = useFilter();
  const [selectedValue, setSelectedValue] = useState(5);
  const { handleDelete } = useHandleDelete();
  const userHook = useGetUser({ filter: filter.state });
  const { data, total, loading, error, refreshData } = userHook;
  const dispatch = useDispatch();
  const dialog = useAppSelector((state) => state.dialog);
  const [showError, setShowError] = useState(false);
  const [dataEvents, setDataEvents] = useState({ action: "", data: {} });
  const [wallet, setWallet] = useState<DataType>({});
  const [userId, setUserId] = useState("");
  const [showPassword, setShowPassword] = useState<PasswordVisibilityState>({
    currentPass: false,
    newPass: false,
    confirmPass: false,
  });

  const togglePasswordVisibility = (field: keyof PasswordVisibilityState) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };
  const { user } = useSelector((state: any) => state.auth);
  const options: any = [
    { label: "10", value: "10" },
    { label: "20", value: "20" },
    { label: "50", value: "50" },
    { label: "100", value: "100" },
  ];
  const userRole: any = [
    { label: "All", value: "" },
    { label: "customer", value: "customer" },
    { label: "admin", value: "admin" },
    {
      label: "operator",
      value: "operator",
    },
  ];
  const handleSelectChange = (value: any) => {
    setSelectedValue(value.target.value);
    filter.dispatch({
      type: filter.ACTION_TYPE.STATUS,
      payload: value.target.value,
    });
  };
  setTimeout(() => {
    setShowError(false);
  }, 5000);
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
    if (value instanceof Date) {
      formik.setFieldValue(key as string, value);
    } else {
      formik.handleChange(key as string)(value as string);
    }
  };

  const genderOptions = [
    { label: "male", value: "male" },
    { label: "female", value: "female" },
    { label: "other", value: "other" },
  ];
  const statusOptions = [
    { label: "active", value: "active" },
    { label: "inactive", value: "inactive" },
  ];
  const roleOptions = [
    { label: "operator", value: "operator" },
    { label: "admin", value: "admin" },
  ];
  const handleEnter = (e: any) => {
    if (e.key === "Enter") {
      filter.dispatch({
        type: filter.ACTION_TYPE.SEARCH,
        payload: e.target.value ?? "",
      });
    } else if (e.target.value?.length < 2) {
      filter.dispatch({
        type: filter.ACTION_TYPE.SEARCH,
        payload: "",
      });
    }
  };
  const handlePageClick = (event: any) => {
    const selected = event.selected;
    filter.dispatch({
      type: filter.ACTION_TYPE.PAGINATION,
      payload: selected + 1 || 0,
    });
  };
  const initialValues = {
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "operator",
    gender: "male",
    status: "active",
    address: "",
    dob: "",
    ...dataEvents.data,
  };
  React.useEffect(() => {
    if (dataEvents.action === "edit") {
      formik.setValues({
        ...formik.values,
        ...dataEvents.data,
      });
    }
  }, [dataEvents.data]);
  const handleUserDelete = async (userId: string) => {
    try {
      const url = `${LinkApi.users}/${userId}`;
      const deleteResult = await handleDelete(url);
      if (deleteResult.status === 200) {
        userHook.refreshData();
        Swal.fire("Delete Successful!", "", "success");
      } else if (deleteResult.response.status === 500) {
        setShowError(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getValueForKey = (key: string) => {
    return formik.values[key];
  };

  const formik: any = useFormik({
    initialValues,
    validationSchema: dataEvents.action == "edit" ? "" : validationSchema,
    onSubmit: async (values: any) => {
      if (dataEvents.action === "edit") {
        const formattedDate = formatDateDash(values.dob);
        values.dob = formattedDate;
        const result = await api({
          url: `${LinkApi.users}/${(dataEvents.data as any)?.userId}`,
          method: "put",
          params: values,
        });
        if (result.status == 200) {
          userHook.refreshData();
          handleClose();
          handleCancel();
          toast.success("Edit new user success");
        }
      } else {
        const formattedDate = formatDateDash(values.dob);
        values.dob = formattedDate;
        const result = await api({
          url: LinkApi.users,
          method: "post",
          params: values,
        });

        if (result.status == 200) {
          userHook.refreshData();
          handleClose();
          handleCancel();
          toast.success("Add new user success");
        }
      }
    },
  });
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const result = await api({
        url: LinkApi.deposit,
        method: "put",
        params: wallet,
      });

      if (result.status === 200) {
        toast.success("Edit success");
        refreshData();
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangePassword = async (values: FormValues, actions: any) => {
    try {
      actions.setSubmitting(true);
      values.userId = userId;
      const result = await api({
        url: LinkApi.changeCustomerPassword,
        method: "post",
        params: values,
      });
      if (result.status === 200) {
        toast.success("Change password success");
        actions.resetForm();
        refreshData();
        handleClose();
      } else if (result.status == 404) {
        toast.warning("Current password is incorrect");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      actions.setSubmitting(false);
    }
  };
  const textFields = useMemo(() => {
    const defaultData: Record<string, any> = dataEvents.data;
    return [
      { type: "text", title: "Name", key: "name" },
      { type: "text", title: "Email", key: "email" },
      {
        type: dataEvents?.action ? "" : "password",
        title: "Password",
        key: "password",
      },
      { type: "text", title: "Phone number", key: "phone" },
      { type: "select", title: "Role", key: "role", options: roleOptions },
      {
        type: "select",
        title: "Gender",
        key: "gender",
        options: genderOptions,
      },
      {
        type: "select",
        title: "Status",
        key: "status",
        options: statusOptions,
      },
      { type: "text", title: "Address", key: "address" },
      {
        type: "date",
        title: "Birthday",
        key: "dob",
      },
    ].map((field) => {
      if (
        field.type === "text" ||
        field.type === "password" ||
        field.type === "date"
      ) {
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
            {field.type === "password" && (
              <TextfieldDefault
                type={field.type}
                title={field.title}
                defaultValue={defaultData ? defaultData[field.key] : ""}
                onChange={(value) => handleChange(field.key, value)}
              />
            )}
            {field.type === "date" && (
              <DatePicker
                field={field}
                defaultValue={defaultData ? defaultData[field.key] : ""}
                getValueForKey={getValueForKey}
                handleChange={handleChange}
              />
            )}
            {formik.errors[field.key] && (
              <p className="text-sm text-red-600 dark:text-red-500">
                {formik.errors[field.key]}
              </p>
            )}
          </div>
        );
      } else if (field.type === "select") {
        return (
          <div key={field.key}>
            <SelectField
              title={field.title}
              options={field.options}
              value={defaultData ? defaultData[field.key] : ""}
              onChange={(value) => {
                handleChange(field.key, value);
              }}
            />
            {formik.errors[field.key] && (
              <p className="text-sm text-red-600 dark:text-red-500">
                {formik.errors[field.key]}
              </p>
            )}
          </div>
        );
      }
      return null;
    });
  }, [formik, dataEvents.data]);

  
  return (
    <div className="overflow-x-hidden">
      {loading ? <Loader /> : error && <ErrorPage />}

      {!loading && !error && data && (
        <div>
          <h6 className="px-1 py-1 text-gray-800 font-bold">Manage users</h6>
          <div className="mb-3 md:flex sm:block justify-between mt-2">
            <div className="flex mb-2 sm:mb-0">
              <Select
                option={options}
                value={filter.state.pageSize || ""}
                onChange={(e: any) =>
                  filter.dispatch({
                    type: filter.ACTION_TYPE.PAGE_ROW,
                    payload: e.target.value || "",
                  })
                }
                className="mr-2 px-5 py-2 md:hidden inline-block w-32 text-base text-gray-900 border border-gray-300 rounded-lg focus:border-blue-500 bg-gray-50  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <Select
                option={options}
                value={filter.state.pageSize || ""}
                onChange={(e: any) =>
                  filter.dispatch({
                    type: filter.ACTION_TYPE.PAGE_ROW,
                    payload: e.target.value || "",
                  })
                }
                className="mr-2 px-5 py-2 hidden sm:inline-block w-32 text-base text-gray-900 border border-gray-300 rounded-lg focus:border-blue-500 bg-gray-50  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <Select
                option={userRole}
                value={selectedValue}
                onChange={handleSelectChange}
                className="mr-4 px-5 py-2 md:hidden inline-block w-32 text-base text-gray-900 border border-gray-300 rounded-lg focus:border-blue-500 bg-gray-50  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="flex">
              <Select
                option={userRole}
                value={selectedValue}
                onChange={handleSelectChange}
                className="mr-4 px-5 py-2 hidden sm:inline-block w-32 text-base text-gray-900 border border-gray-300 rounded-lg focus:border-blue-500 bg-gray-50  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <SearchInput onKeyDown={handleEnter} />

              <Button
                disabled={user?.role !== "admin"}
                title="Add new"
                className="bg-info text-white rounded-lg px-1 ml-2 py-2 hidden sm:inline-block"
                onClick={() =>
                  dispatch(setIsOpen({ isOpen: true, status: "addUser" }))
                }
              />
              <IconButton
                disabled={user?.role !== "admin"}
                className="md:hidden ml-1"
                icon={<Iconadd />}
                onClick={() =>
                  dispatch(setIsOpen({ isOpen: true, status: "addUser" }))
                }
              />
            </div>
          </div>

          <div className="overflow-auto">
            {data?.length && (
              <table className="table overflow-x-auto text-sm">
                <thead>
                  <tr>
                    {UserColumns?.map((column, index: number) => (
                      <th key={index + 1}>{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.length &&
                    data.map((item: IUserType, index: number) => {
                      let status;
                      if (item.status === "active") {
                        status = "badge-success";
                      } else if (item.status === "inactive") {
                        status = "badge-warning";
                      } else {
                        status = "badge-danger";
                      }
                      const renderEditButton = () => {
                        if (item.role === "admin") {
                          return "";
                        } else if (item.role !== "customer") {
                          return (
                            <ButtonIcon
                              style={{ marginLeft: "4px" }}
                              icon={<EditIcon size={18} />}
                              onClick={() => {
                                setDataEvents({ action: "edit", data: item });
                                dispatch(
                                  setIsOpen({ isOpen: true, status: "addUser" })
                                );
                              }}
                            />
                          );
                        } else {
                          return (
                            <Link href={`/backend/user/${item.userId}`}>
                              <ButtonIcon icon={<EditIcon size={18} />} />
                            </Link>
                          );
                        }
                      };

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
                          <td>{item.accountId}</td>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>{item.phone}</td>
                          <td>{item.gender}</td>
                          <td>{item.address}</td>
                          <td>{item.role}</td>
                          <td>
                            {item.role == "customer" && (
                              <div>
                                {item.wallet[0]?.balance} USDT
                                <span className="cursor-pointer">
                                  <MdEdit
                                    size={16}
                                    onClick={() => {
                                      const newData = {
                                        walletId: item.wallet[0]?.walletId,
                                        amount: item.wallet[0]?.balance,
                                        accountId: item.accountId,
                                        name: item.name,
                                        email: item.email,
                                      };
                                      setWallet(newData);
                                      dispatch(
                                        setIsOpen({
                                          isOpen: true,
                                          status: "editWallet",
                                        })
                                      );
                                    }}
                                  />
                                </span>
                              </div>
                            )}
                          </td>
                          <td>
                            <div title="pending">
                              <span
                                className={`${status} text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded`}
                              >
                                {item.status}
                              </span>
                            </div>
                          </td>
                          <td>{FormatDate(item.createdAt)}</td>
                          <td>
                            <div className="flex justify-center">
                              {item.role == "customer" && (
                                <ButtonIcon
                                  icon={
                                    <FiUnlock
                                      size={18}
                                      onClick={() => {
                                        setUserId(item.userId);
                                        dispatch(
                                          setIsOpen({
                                            isOpen: true,
                                            status: "changePassword",
                                          })
                                        );
                                      }}
                                    />
                                  }
                                />
                              )}
                              {renderEditButton()}
                              {item.role !== "admin" && (
                                <ButtonIcon
                                  disabled={showError ? true : false}
                                  style={{ marginLeft: "2px" }}
                                  icon={<TrashIcon size={18} />}
                                  onClick={() => handleUserDelete(item.userId)}
                                />
                              )}
                            </div>
                          </td>
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
          {dialog.status === "addUser" && (
            <Dialog
              titleClose="Cancel"
              titleSave="Save"
              isOpen={dialog.isOpen}
              onClose={handleClose}
              className="w-auto"
            >
              <form onSubmit={formik.handleSubmit}>
                <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
                  {dataEvents.action ? "Edit user" : "Create user"}
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
          )}

          {showError && (
            <ErrorNotification message="Delete failed" timeout={5000} />
          )}
          {dialog.status == "editWallet" && (
            <Dialog
              titleClose="Cancel"
              titleSave="Save"
              isOpen={dialog.isOpen}
              onClose={handleClose}
              className="bg-white overflow-auto mt-10 text-info p-6  rounded z-50 w-[80%] md:w-1/4 max-h-[85vh]"
            >
              <form onSubmit={handleSubmit}>
                <h6 className="text-2xl font-bold mb-5">Update wallet</h6>
                <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-2 mb-5">
                  <TextfieldDefault
                    title="Account ID"
                    type="text"
                    disabled
                    required
                    value={wallet?.accountId}
                  />
                  <TextfieldDefault
                    title="Name"
                    type="text"
                    required
                    disabled
                    value={wallet?.name}
                  />
                </div>
                <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-2 mb-5">
                  <TextfieldDefault
                    disabled
                    title="Email"
                    type="text"
                    required
                    value={wallet?.email}
                  />
                  <TextfieldDefault
                    title="Amount USDT"
                    type="text"
                    required
                    value={wallet && wallet.amount ? wallet.amount : ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setWallet({ ...wallet, amount: e.target.value })
                    }
                  />
                </div>

                <div className="flex gap-2 mt-5">
                  <button
                    className="px-3 py-1 rounded-md border border-gray-400 transition-all duration-200 text-md"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="hover:text-gray-6 px-3 py-1 bg-yellow-500  rounded-md transition-all duration-200 text-md"
                  >
                    Edit
                  </button>
                </div>
              </form>
            </Dialog>
          )}
        </div>
      )}

      {dialog.status == "changePassword" && (
        <Dialog
          titleClose="Cancel"
          titleSave="Save"
          isOpen={dialog.isOpen}
          onClose={handleClose}
          className="bg-white overflow-auto mt-10 text-info p-6  rounded z-50 w-[80%] md:w-1/4 max-h-[85vh]"
        >
          <Formik
            initialValues={initialValuesChangePassword}
            validate={validate}
            onSubmit={handleChangePassword}
          >
            {(props) => (
              <form
                onSubmit={props.handleSubmit}
                className="max-w-lg mx-auto sm:w-full"
              >
                <h1 className="text-2xl mb-14 mt-3 text-gray-900 font-medium">
                  Change password
                </h1>
                <div className="mb-5">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Current password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword.currentPass ? "text" : "password"}
                      id="password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="current password"
                      required
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.oldPassword}
                      name="oldPassword"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={() => togglePasswordVisibility("currentPass")}
                    >
                      {showPassword.currentPass ? (
                        <IoEyeOffOutline size={18} />
                      ) : (
                        <MdOutlineRemoveRedEye size={18} />
                      )}
                    </button>
                  </div>

                  {props.errors.oldPassword && props.touched.oldPassword && (
                    <p className="mt-2 text-sm text-red-600">
                      {props.errors.oldPassword}
                    </p>
                  )}
                </div>

                <div className="mb-5">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    New password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword.newPass ? "text" : "password"}
                      id="password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="new password"
                      required
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.newPassword}
                      name="newPassword"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={() => togglePasswordVisibility("newPass")}
                    >
                      {showPassword.newPass ? (
                        <IoEyeOffOutline size={18} />
                      ) : (
                        <MdOutlineRemoveRedEye size={18} />
                      )}
                    </button>
                  </div>
                  {props.errors.newPassword && props.touched.newPassword && (
                    <p className="mt-2 text-sm text-red-600">
                      {props.errors.newPassword}
                    </p>
                  )}
                </div>

                <div className="mb-5">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Confirm password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword.confirmPass ? "text" : "password"}
                      id="password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="confirm password"
                      required
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.confirmPassword}
                      name="confirmPassword"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={() => togglePasswordVisibility("confirmPass")}
                    >
                      {showPassword.confirmPass ? (
                        <IoEyeOffOutline size={18} />
                      ) : (
                        <MdOutlineRemoveRedEye size={18} />
                      )}
                    </button>
                  </div>
                  {props.errors.confirmPassword &&
                    props.touched.confirmPassword && (
                      <p className="mt-2 text-sm text-red-600">
                        {props.errors.confirmPassword}
                      </p>
                    )}
                </div>

                <button
                  type="submit"
                  className="text-white bg-info hover:bg-gray-600 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                  Submit
                </button>
              </form>
            )}
          </Formik>
        </Dialog>
      )}
    </div>
  );
}

export default UserTable;

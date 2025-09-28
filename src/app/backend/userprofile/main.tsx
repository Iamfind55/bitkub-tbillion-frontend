"use client";
import { LinkApi } from "@/enum/linkapi";
import { formatDateDash, formateDateSlash } from "@/helper/format";
import { setRefresh } from "@/redux/slice/dialogSlice";
import useApi from "@/services/api";
import { useGetUserById } from "@/services/userservice";
import ErrorPage from "@/utils/ErrorPage";
import Loader from "@/utils/Loader";
import { FormikValues } from "formik";
import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function Main() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);
  const userByIdHook = useGetUserById(user?.userid);
  const { data, loading, error, refreshData } = userByIdHook;
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(data?.dob);
  const api = useApi();
  const [initialValues, setInitialValues] = useState({
    name: data?.name,
    gender: data?.gender,
    phone: data?.phone,
    dob: data?.dob,
  });

  React.useEffect(() => {
    setInitialValues(data);
  }, [data]);

  const genderOptions = [
    { label: "female", value: "female" },
    { label: "male", value: "male" },
    { label: "other", value: "other" },
  ];

  const handleFileChange = (e: any) => {
    setFile(e?.target?.files[0]);
    const selectedFile = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader?.result as string);
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault()
    try {
      const result = await api({
        url: `${LinkApi.users}/${data?.userId}`,
        method: "put",
        params: initialValues,
      });

      const myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Bearer " + localStorage.getItem("token")
      );
      if (file) {
        const formdata = new FormData();
        formdata.append("images", file);
        const requestOptions = {
          method: "PUT",
          headers: myHeaders,
          body: formdata,
        };
        fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/profile/${data?.userId}`,
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => {});
      }

      if (result.status == 200 || result.response.data.status == 200) {
        toast.success("Update profile success");
      }
      setTimeout(() => {
        dispatch(setRefresh(true));
        refreshData();
      }, 100);
      setTimeout(() => {
        setFile(null);
        setImagePreview(null);
      }, 200);
    } catch (error) {
      console.log(error);
    }
  };
  if (error) return <ErrorPage />;
  if (loading) return <Loader />;
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-5 flex justify-center">
          <div className="w-40">
            <label className="flex flex-col items-center justify-center w-50 h-40 border-2 border-gray-300 border-dashed rounded-full cursor-pointer bg-gray-50 ">
              {imagePreview ? (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <img
                    src={imagePreview}
                    alt=""
                    className="w-40 h-40 rounded-full"
                  />
                </div>
              ) : data?.filename ? (
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}/images/${data.filename}`}
                  alt="image"
                  className="w-40 h-40 rounded-full"
                />
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <img
                    src="/images/profile_avatar.webp"
                    alt=""
                    className="w-40 h-40 rounded-full"
                  />
                </div>
              )}
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Name
            </label>
            <div className="relative">
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Name"
                required
                name="name"
                value={initialValues?.name}
                onChange={(e) =>
                  setInitialValues({ ...initialValues, name: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Email
            </label>
            <div className="relative">
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Email"
                name="email"
                disabled
                value={data?.email}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Position
            </label>
            <div className="relative">
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="name"
                disabled
                value={data?.role}
              />
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 w-full">
              Date of birth
            </label>
            <div className="relative">
              <ReactDatePicker
                selected={startDate ? startDate : new Date(data?.dob)}
                onChange={(date) => {
                  setStartDate(date);
                  setInitialValues({
                    ...initialValues,
                    dob: formatDateDash(date),
                  });
                }}
                dateFormat="yyyy-MM-dd"
                placeholderText="yyyy-mm-dd"
                className="border border-gray-400 mr-2 sm:mr-0 bg-slate-50 rounded-lg px-4 py-2"
                wrapperClassName="custom-datepicker-wrapper"
                popperClassName="custom-popper"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Gender
            </label>
            <select
              name="gender"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={initialValues?.gender}
              onChange={(e) =>
                setInitialValues({ ...initialValues, gender: e.target.value })
              }
            >
              <option value="" disabled>
                {data?.gender || "choose"}
              </option>
              {genderOptions.map((item, index) => (
                <option value={item.value} key={index}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Phone
            </label>
            <div className="relative">
              <input
                type="number"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="phone"
                name="phone"
                value={initialValues?.phone}
                onChange={(e) =>
                  setInitialValues({ ...initialValues, phone: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Status
            </label>
            <div className="relative">
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
                disabled
                value={data?.status}
              />
            </div>
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              CreateAt
            </label>
            <div className="relative">
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="name"
                required
                disabled
                value={formateDateSlash(data?.createdAt)}
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-info hover:bg-gray-600 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Main;

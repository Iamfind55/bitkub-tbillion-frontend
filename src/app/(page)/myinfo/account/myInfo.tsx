"use client";
import { LinkApi } from "@/enum/linkapi";
import { formatDateDash } from "@/helper/format";
import { useTranslation } from "@/lib/i18n";
import { setRefresh } from "@/redux/slice/dialogSlice";
import useApi from "@/services/api";
import Loader from "@/utils/Loader";
import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function MyInfo() {
  const { t } = useTranslation()
  const api = useApi();
  const [myinfo, setMyinfo] = useState<any | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [userData, setUserData] = useState({});
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);
  const genders = [
    { label: t("hero.male"), value: "male" },
    { label: t("hero.female"), value: "female" },
    { label: t("hero.other"), value: "other" },
  ];
  const fetchData = async () => {
    try {
      const result = await api({
        url: `${LinkApi.users}/owner`,
        method: "get",
        params: {},
      });
      if (result.status === 200) {
        if (result?.data?.dob && !isNaN(Date.parse(result.data.dob))) {
          const dobDate = new Date(result.data.dob);
          setStartDate(dobDate);
        }
      }
      setMyinfo(result.data);
    } catch (error: any) {
      setError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user?.token) {
      fetchData();
    }
  }, []);


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
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const result = await api({
      url: `${LinkApi.users}/${myinfo?.userId}`,
      method: "put",
      params: userData,
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
        `${process.env.NEXT_PUBLIC_API_URL}/users/profile/${myinfo?.userId}`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          setImagePreview(null);
          setFile(null);
        });
    }
    if (result.status == 200) {
      toast.success(t("alert.upldateProfile200"));
      dispatch(setRefresh(true));
    }
    setTimeout(() => {
      fetchData();
    }, 100);
  };

  if (loading) return <Loader />;

  return (
    <>
      <div className="px-5 py-20 bg-info">
        <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
          <div className="mb-5">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-50 h-40 border-2 border-gray-300 border-dashed rounded-full cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                {imagePreview ? (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <img
                      src={imagePreview}
                      alt=""
                      className="w-40 h-40 rounded-full"
                    />
                  </div>
                ) : myinfo?.filename ? (
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}/images/${myinfo.filename}`}
                    alt="profile"
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
          <div className="mb-5">
            <label className="block mb-2 text-md font-medium text-gray-300 ">
              {t("hero.user")}
            </label>
            <input
              type="text"
              id="text"
              className="shadow-sm bg-gray-300 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder={t("hero.user")}
              value={myinfo?.name}
              onChange={(e) => {
                setMyinfo({ ...myinfo, name: e?.target?.value });
                setUserData({ ...userData, name: e?.target?.value });
              }}
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-md font-medium text-gray-300 ">
              {t("label.email")}
            </label>
            <input
              type="email"
              id="email"
              className="shadow-sm bg-gray-300 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder={t("label.email")}
              value={myinfo?.email}
              onChange={(e) => {
                setMyinfo({ ...myinfo, name: e?.target?.value });
                setUserData({ ...userData, name: e?.target?.value });
              }}
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-md font-medium text-gray-300">
              {t("label.phone")}
            </label>
            <input
              type="number"
              className="shadow-smg bg-gray-300 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder={t("label.phone")}
              value={myinfo?.phone}
              onChange={(e) => {
                setMyinfo({ ...myinfo, phone: e?.target?.value });
                setUserData({ ...userData, phone: e?.target?.value });
              }}
            />
          </div>

          <div className="mb-5 md:flex justify-between sm:block">
            <div className="mb-5 md:mb-0">
              <label className="block mb-2 text-md font-medium text-gray-300">
                {t("label.db")}
              </label>
              <ReactDatePicker
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date);
                  setUserData({ ...userData, dob: formatDateDash(date) });
                }}
                dateFormat="yyyy-MM-dd"
                placeholderText="yyyy-mm-dd"
                className="bg-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-50 p-2.5"
                wrapperClassName="custom-datepicker-wrapper"
                popperClassName="custom-popper"
              />
            </div>

            <div>
              <label className="block mb-2 text-md font-medium text-gray-300 dark:text-white">
                {t("label.status")}
              </label>
              <input
                type="text"
                className="shadow-sm bg-gray-300 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder={t("label.status")}

                disabled={true}
                value={myinfo?.status}
              />
            </div>
          </div>
          <div className="flex">
            {genders.map((item, index) => (
              <div className="flex items-center mb-5 me-4" key={index}>
                <input
                  id="inline-radio"
                  type="radio"
                  value={item?.value ?? myinfo.gender}
                  name="inline-radio-group"
                  checked={myinfo?.gender == item.value}
                  onChange={(e) => {
                    setMyinfo({ ...myinfo, gender: e?.target?.value });
                    setUserData({ ...userData, gender: e?.target?.value });
                  }}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="ms-2 text-md font-medium text-gray-300 dark:text-gray-300">
                  {item.label}
                </label>
              </div>
            ))}
          </div>

          <div className="mb-5">
            <label className="block mb-2 text-md font-medium text-gray-300 dark:text-white">
              {t("label.address")}
            </label>

            <textarea
              id="chat"
              rows={4}
              className="block w-full text-md text-gray-900 bg-gray-300 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={t("label.address")}
              value={myinfo?.address}
              onChange={(e) => {
                setMyinfo({ ...myinfo, address: e?.target?.value });
                setUserData({ ...userData, address: e?.target?.value });
              }}
            ></textarea>
          </div>

          <button
            type="submit"
            className="text-white bg-yellow-500 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {t("button.sumbit")}
          </button>
        </form>
      </div>
    </>
  );
}

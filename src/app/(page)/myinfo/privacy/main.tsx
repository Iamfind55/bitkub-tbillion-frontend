"use client";
import useApi from "@/services/api";
import React, { useEffect, useState } from "react";
import { FaAddressCard } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaCloudUploadAlt } from "react-icons/fa";
import { VscPreview } from "react-icons/vsc";
import { GiConfirmed } from "react-icons/gi";
import { LinkApi } from "@/enum/linkapi";
import { toast } from "react-toastify";
import Loader from "@/utils/Loader";
import ErrorPage from "@/utils/ErrorPage";
import { useSelector } from "react-redux";
function MainPrivacy() {
  const api = useApi();
  const [myinfo, setMyinfo] = useState<any | null>(null);
  const [verification, setVerification] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useSelector((state: any) => state.auth);
  const fetchData = async () => {
    try {
      const result = await api({
        url: `${LinkApi.users}/owner`,
        method: "get",
        params: {},
      });

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

  const getImage = async () => {
    try {
      const result = await api({
        url: `${LinkApi.profile}`,
        method: "get",
        params: {},
      });
      setVerification(result?.data);
    } catch (error: any) {
      setError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user?.token) {
      getImage();
    }
  }, []);
  const [userData, setUserData] = useState({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageAfter, setImageAfter] = useState<string | null>(null);
  const [file, setFile] = useState<{ status: any; data: [] | any } | null>({
    status: null,
    data: null,
  });
  const handleFileChange = (e: any, name: string) => {
    const selectedFile = e.target.files[0];
    setFile((prevFile) => {
      if (!prevFile) {
        const newFiles = {
          status: name,
          files: e?.target?.files[0],
        };
        return { status: name, data: newFiles };
      } else {
        const newData = prevFile?.data
          ? [...prevFile?.data, e?.target?.files[0]]
          : [e?.target?.files[0]];
        const newStatus = prevFile?.status
          ? [...prevFile?.status, name]
          : [name];

        return { status: newStatus, data: newData };
      }
    });

    const reader = new FileReader();
    reader.onload = () => {
      if (name == "after") {
        setImageAfter(reader?.result as string);
      } else {
        setImagePreview(reader?.result as string);
      }
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };
  const handleSubmit = async () => {
    const result = await api({
      url: `${LinkApi.users}/${myinfo?.userId}`,
      method: "put",
      params: userData,
    });
    if (file?.data?.length > 0) {
      const myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Bearer " + localStorage.getItem("token")
      );
      const formdata = new FormData();
      let url = "";
      let method = "";
      for (let i = 0; i < file?.data?.length; i++) {
        if (file?.status[i] === "before") {
          formdata.append("images", file?.data[0]);
          url = myinfo?.profile[0]?.filename
            ? process.env.NEXT_PUBLIC_API_URL +
              "/" +
              "profile" +
              "/" +
              myinfo?.profile[0]?.profileId
            : process.env.NEXT_PUBLIC_API_URL + "/" + "profile";
          method = myinfo?.profile[0]?.filename ? "PUT" : "POST";
        } else {
          if (file?.data?.length > 1) {
            formdata.append("images", file?.data[1] || file?.data[0]);
            url = myinfo?.profile[1]?.filename
              ? process.env.NEXT_PUBLIC_API_URL +
                "/" +
                "profile" +
                "/" +
                myinfo?.profile[1]?.profileId
              : process.env.NEXT_PUBLIC_API_URL + "/" + "profile";
            method = myinfo?.profile[1]?.filename ? "PUT" : "POST";
          }
        }
        const requestOptions = {
          method: method,
          headers: myHeaders,
          body: formdata,
        };
        fetch(url, requestOptions)
          .then((response) => response.text())
          .then((result) => {
            // toast.success(
            //   myinfo?.profile?.length > 0
            //     ? "Upload image success"
            //     : "Image Updated Successfully"
            // );
          })
          .catch((error) => toast.error(error));
      }
      setTimeout(() => {
        getImage();
        setImagePreview(null);
        setImageAfter(null);
        setFile({ status: null, data: null });
        fetchData();
      }, 1000);
    }
    if (result.status == 200) {
      toast.success("อัปเดตความสำร็จ", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  if (loading) return <Loader />;
  return (
    <div>
      <div className="mt-5 px-10 py-5  md:flex justify-around sm:block">
        <div>
          <p className="text-gray-400 text-xl underline mb-5">
            กระบวนการที่ผ่านการตรวจสอบ
          </p>
          <ol className="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
            <li className="mb-10 ms-8">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
                <FaCheck className="text-green-500" />
              </span>
              <h3 className="font-medium leading-tight">ข้อมูลส่วนตัว</h3>
              <p className="text-sm">ชื่อ อีเมล เพศ ที่อยู่ และอื่นๆ</p>
            </li>
            <li className="mb-10 ms-8">
              <span
                className={`absolute flex items-center justify-center w-8 h-8 ${
                  myinfo?.profile?.length > 0 ? "bg-green-200" : "bg-gray-100"
                } rounded-full -start-4 ring-4 ring-white`}
              >
                {myinfo?.profile?.length > 0 ? (
                  <FaCheck className="text-green-500" />
                ) : (
                  <FaAddressCard />
                )}
              </span>
              <h3 className="font-medium leading-tight">ข้อมูลบัญชี</h3>
              <p className="text-sm">หนังสือเดินทาง,บัตรประจำตัวประชาชน</p>
            </li>
            <li className="mb-10 ms-8">
              <span
                className={`absolute flex mt-2 items-center justify-center w-8 h-8 ${
                  myinfo?.status === "active" ? "bg-green-200" : "bg-gray-200"
                } rounded-full -start-4 ring-4 ring-white`}
              >
                {myinfo?.status === "active" ? (
                  <FaCheck className="text-green-500" />
                ) : (
                  <VscPreview className="text-gray-700" />
                )}
              </span>
              <h3 className="font-medium leading-tight">ตรวจสอบ</h3>
              <p className="text-sm">ประวัติข้อมูลทั้งหมด</p>
            </li>
            <li className="ms-8">
              <span
                className={`absolute flex mt-2 items-center justify-center w-8 h-8 ${
                  myinfo?.status === "active" ? "bg-green-200" : "bg-gray-200"
                } rounded-full -start-4 ring-4 ring-white`}
              >
                {myinfo?.status === "active" ? (
                  <FaCheck className="text-green-500" />
                ) : (
                  <GiConfirmed size={20} />
                )}
              </span>

              <h3 className="font-medium leading-tight">ได้รับการอนุมัติ</h3>
              <p className="text-sm">ยืนยันตัวตนเสร็จสมบูรณ์</p>
            </li>
          </ol>
        </div>

        <div className="md:w-1/2 sm:w-full md:mt-0 mt-10">
          <p className="text-red-400 text-xl">
            การยืนยันตัวตนของผู้ใช้งานจะใช่เวลา 1 - 3 วันทำการ
          </p>
          <p className="text-gray-400">
            วิธียืนยันตัวตน (โปรดอ่าน) ถ่ายรูปบัตรประชาชน หรือ ใบขับขี่
            โดยเห็นชื่อให้ชัด ถ้าไม่ชัดทางเราจะให้คุณยืนยันตัวตนใหม่
          </p>
          <div className="md:mt-10 mt-5">
            <div className="mb-3">
              <label className="block text-md font-medium text-gray-400">
                ชื่อผู้ใช้
              </label>
              <input
                type="text"
                id="text"
                className="shadow-sm bg-gray-300 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="ชื่อผู้ใช้"
                value={myinfo?.name}
                onChange={(e) => {
                  setMyinfo({ ...myinfo, name: e?.target?.value });
                }}
              />
            </div>
            <div className="mb-3">
              <label className="block text-md font-medium text-gray-400">
                อีเมลของคุณ
              </label>
              <input
                type="email"
                id="email"
                className="shadow-sm bg-gray-300 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="อีเมลของคุณ"
                value={myinfo?.email}
                onChange={(e) => {
                  setMyinfo({ ...myinfo, name: e?.target?.value });
                }}
              />
            </div>
            <div className="mb-5">
              <label className="block text-md font-medium text-gray-400">
                โทรศัพท์
              </label>
              <input
                type="number"
                className="shadow-smg bg-gray-300 border border-gray-400 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="โทรศัพท์..."
                value={myinfo?.phone}
                onChange={(e) => {
                  setMyinfo({ ...myinfo, phone: e?.target?.value });
                  setUserData({ ...userData, phone: e?.target?.value });
                }}
              />
            </div>
            <div className="mb-5">
              <div className="md:flex sm:block">
                <div className="w-full">
                  <p className="text-md font-medium text-gray-400 mb-5">
                    แนบรูปภาพหน้าบัตรประชาชน
                  </p>
                  {loading ? (
                    <Loader />
                  ) : (
                    <label className="flex flex-col items-center justify-center w-60 h-40 rounded-lg cursor-pointer">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt=""
                          className="w-60 h-40 rounded-lg"
                        />
                      ) : myinfo?.profile?.length > 0 ? (
                        <img
                          src={`${process.env.NEXT_PUBLIC_API_URL}/images/${myinfo?.profile[0]?.filename}`}
                          alt="profile"
                          className="w-60 h-40 rounded-lg"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center py-10 bg-white rounded-lg">
                          <h2 className="text-gray-900 px-2">
                            อัปโหลดรูปภาพหน้าหนังสือเดินทางหรือบัตรประจำตัวประชาชน
                          </h2>
                        </div>
                      )}
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, "before")}
                      />
                      <div className="flex gap-5 py-2 mt-0">
                        <FaCloudUploadAlt size={22} />
                        <p>เลือกภาพ</p>
                      </div>
                    </label>
                  )}
                </div>
                <div className="w-full mt-3 md:mt-0">
                  <p className="text-md font-medium text-gray-400 mb-5">
                    แนบรูปภาพหลังบัตรประชาชน
                  </p>
                  {loading ? (
                    <Loader />
                  ) : (
                    <label className="flex flex-col items-center justify-center w-60 h-40 rounded-lg cursor-pointer">
                      {imageAfter ? (
                        <img
                          src={imageAfter}
                          alt=""
                          className="w-60 h-40 rounded-lg"
                        />
                      ) : myinfo?.profile[1]?.filename ? (
                        <img
                          src={`${process.env.NEXT_PUBLIC_API_URL}/images/${myinfo?.profile[1]?.filename}`}
                          alt="profile"
                          className="w-60 h-40 rounded-lg"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center py-10 bg-white rounded-lg">
                          <h2 className="text-gray-900 px-2">
                            อัปโหลดรูปภาพหลังหนังสือเดินทางหรือบัตรประจำตัวประชาชน
                          </h2>
                        </div>
                      )}
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, "after")}
                      />
                      <div className="flex gap-5 py-2 mt-0">
                        <FaCloudUploadAlt size={22} />
                        <p>เลือกภาพ</p>
                      </div>
                    </label>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-0 mb-5">
        <div className="md:w-1/2 sm:w-full px-20 mb-5">
          <button
            type="submit"
            className="text-white bg-yellow-500 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleSubmit}
          >
            อัปโหลดตอนนี้
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainPrivacy;

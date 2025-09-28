"use client";

import { LinkApi } from "@/enum/linkapi";
import { useQrcodes } from "@/services/qrcodeservice";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Main() {
  const { data, refreshData } = useQrcodes();
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [dataEvents, setdataEvents] = useState({
    qrId: "",
    name: "",
    accountNumber: "",
    images: "",
  });
  useEffect(() => {
    if (data?.length > 0) {
      const newData = {
        qrId: data[0]?.qrId || "",
        name: data[0]?.name,
        accountNumber: data[0]?.accountNumber,
        images: data[0].qr,
      };

      setdataEvents(newData);
    }
  }, [data]);
  const handleFileChange = (e: any) => {
    setFile(e?.target?.files[0]);
    setdataEvents((data) => ({
      ...data,
      images: e?.target?.files[0],
    }));
    const selectedFile = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader?.result as string);
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );

    if (data?.length > 0) {
      const formdata = new FormData();
      formdata.append("name", dataEvents.name);
      formdata.append("accountNumber", dataEvents.accountNumber);
      formdata.append("images", dataEvents.images);

      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: formdata,
        redirect: "follow" as RequestRedirect,
      };
      fetch(
        process.env.NEXT_PUBLIC_API_URL +
          LinkApi.qrcode +
          "/" +
          dataEvents?.qrId,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          refreshData();
          toast.success("Update success");
          console.log(JSON.parse(result));
        })
        .catch((error) => console.error(error));
    } else {
      const formdata = new FormData();
      formdata.append("name", dataEvents.name);
      formdata.append("accountNumber", dataEvents.accountNumber);
      formdata.append("images", dataEvents.images);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow" as RequestRedirect,
      };

      fetch(process.env.NEXT_PUBLIC_API_URL + LinkApi.qrcode, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          refreshData();
          toast.success("Create success");
          console.log(JSON.parse(result));
        })
        .catch((error) => console.error(error));
    }
  };
  return (
    <div>
      <h6 className="px-1 py-1 text-gray-800 font-bold py-5">Account manage</h6>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Network
            </label>
            <div className="relative">
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Network"
                required
                value={dataEvents.name}
                onChange={(e) =>
                  setdataEvents({
                    ...dataEvents,
                    name: e?.target.value,
                  })
                }
              />
              <p
                style={{ fontSize: "12px", marginTop: "2px" }}
                className="text-gray-400"
              >
                Your coin network
              </p>
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Account
            </label>
            <div className="relative">
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="1123456789"
                value={dataEvents.accountNumber}
                onChange={(e) =>
                  setdataEvents({
                    ...dataEvents,
                    accountNumber: e?.target.value,
                  })
                }
              />
              <p
                style={{ fontSize: "12px", marginTop: "2px" }}
                className="text-gray-400"
              >
                Your coin account number
              </p>
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              QR Code
            </label>

            <input
              id="dropzone-file"
              type="file"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={handleFileChange}
            />
          </div>
          <div>
            {imagePreview ? (
              <div className="pt-5">
                <img
                  src={imagePreview}
                  alt=""
                  className="w-80 h-40 rounded-sm"
                />
              </div>
            ) : dataEvents?.images ? (
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}/images/${dataEvents.images}`}
                alt={dataEvents.images}
                className="w-80 h-40 rounded-sm"
              />
            ) : (
              ""
            )}
          </div>
          <div>
            <button
              type="submit"
              className="hover:text-gray-6 px-4 py-1 bg-yellow-500  rounded-md transition-all duration-200 text-md"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
export default Main;

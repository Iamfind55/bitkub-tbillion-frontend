"use client";
import Iconkey from "@/icon/iconkey";
import { IChangepassword } from "@/interface/changepasswordtype";
import { useTranslation } from "@/lib/i18n";
import useApi from "@/services/api";
import Button from "@/utils/Button";
import Password from "@/utils/Password";
import { useState } from "react";
import { toast } from "react-toastify";

export default function FormChangepassword() {
  const { t } = useTranslation()
  const api = useApi();

  const [data, setData] = useState<IChangepassword>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const onkey = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handlesubmit = (e: any) => {
    e.preventDefault();
    if (data.confirmPassword != data.newPassword) {
      toast.warning("new password not mat");
      return false;
    }
    api({ url: "/users/change-password", method: "post", params: data }).then(
      (res) => {
        console.log(res);
      }
    );
  };

  return (
    <div>
      <div className="container mx-auto px-5 pt-[80px]">
        <div className="mx-auto select-none hover:scale-110 transition-all duration-100 lg:my-10 my-5 text-3xl text-white bg-warning w-[70px] h-[70px] flex items-center justify-center shadow-lg rounded-full">
          <Iconkey />
        </div>
        <h3 className="lg:text-2xl text-xl lg:mt-5 text-warning select-none font-bold text-center ">
          {t("forgot.title")}
        </h3>
        <form
          onSubmit={handlesubmit}
          className="mx-auto md:w-[400px] w-full mt-5 flex flex-col gap-3"
        >
          <Password
            required
            onChange={onkey}
            value={data.oldPassword}
            placeholder={t("placeholder.olderPassword")}
            name="oldPassword"
            title={t("label.olderPassword")}
          />
          <Password
            required
            onChange={onkey}
            value={data.newPassword}
            placeholder={t("placeholder.newPassword")}
            name="newPassword"
            title={t("label.newPassword")}
          />
          <Password
            required
            onChange={onkey}
            value={data.confirmPassword}
            placeholder={t("placeholder.confirm")}
            name="confirmPassword"
            title={t("label.confirmPassword")}
          />

          <div className="flex gap-2 item-center">
            <Button
              className="bg-warning rounded lg:text-xl text-lg mt-5"
              title={t("button.savechange")}
            />
            <Button
              type="reset"
              className="border border-gray-200 rounded lg:text-xl text-lg mt-5"
              title={t("label.reset")}
              onClick={() => {
                setData({
                  confirmPassword: "",
                  newPassword: "",
                  oldPassword: "",
                });
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

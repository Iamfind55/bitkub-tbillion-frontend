"use client";
import Iconreload from "@/icon/iconreload";
import { IForgotpassword } from "@/interface/registertype";
import { useTranslation } from "@/lib/i18n";
import { ActionForgotpassword } from "@/services/services";
import Button from "@/utils/Button";
import Textfield from "@/utils/Textfield";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function FormForgotpassword() {
  const {t}=useTranslation()
  const [isloading, setIsloading] = useState(false);
  const router = useRouter();
  const formenforgotpassword = {
    email: "",
  };
  const [formforgotpass, setFormforgotpass] =
    useState<IForgotpassword>(formenforgotpassword);

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormforgotpass({ ...formforgotpass, [e.target.name]: e.target.value });
  };

  const handleforgotpassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsloading(true);
    ActionForgotpassword(formforgotpass).then((res: any) => {
      setIsloading(false);
      try {
        if (res.status === 200) {
          toast.warning(t("alert.resetPassword"),{
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );

          setFormforgotpass(formenforgotpassword);
          setTimeout(() => {
            router.push("/login");
          }, 1000);
        } else {
          if (res.message == "Already exists") {
            toast.warning(t("alert.notFoundEmail"), {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else {
            toast.warning(res.message);
          }
        }
      } catch (error) {
        toast.warning(t("alert.message500"));
      }
    });
  };
  return (
    <>
      <form
        onSubmit={handleforgotpassword}
        className="grid grid-cols-12 gap-5 p-5 lg:p-8 w-full"
      >
        <div className="col-span-12 mb-5">
          <div className="text-3xl text-center font-medium">ลืมรหัสผ่าน</div>
        </div>
        <div className="col-span-12">
          <Textfield
            name="email"
            value={formforgotpass.email}
            onChange={handleForm}
            title={t("label.email")}
            placeholder={t("label.email")}
            required
          />
        </div>
        <div className="col-span-12 flex items-center gap-5">
          <Button
            title={t("button.sumbit")}
            type="submit"
            className="bg-warning rounded text-white"
          />
        </div>
      </form>

      <div
        className={`fixed flex text-xl justify-center items-center left-0 top-0 right-0 bottom-0 text-white backdrop-blur-sm bg-slate-400/80 z-30 h-screen w-full ${
          isloading ? "visible" : "invisible"
        }`}
      >
        <span>
          {t("hero.sending")}
          <Iconreload />
        </span>
      </div>
    </>
  );
}

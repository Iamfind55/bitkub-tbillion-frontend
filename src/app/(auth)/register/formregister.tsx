"use client";
import { IRegister } from "@/interface/registertype";
import { useTranslation } from "@/lib/i18n";
import { ActionRegister } from "@/services/services";
import Button from "@/utils/Button";
import Textarea from "@/utils/Textarea";
import Textfield from "@/utils/Textfield";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function FormRegister() {
  const { t } = useTranslation()
  const router = useRouter();
  const formentry = {
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  };
  const [formsigin, setFormsigin] = useState<IRegister>(formentry);

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormsigin({ ...formsigin, [e.target.name]: e.target.value });
  };

  const handleregister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    ActionRegister(formsigin).then((res: any) => {
      try {
        if (res.status === 200) {
          toast.success(t("alert.signup200"));
          setFormsigin(formentry);
          router.push("/login");
        } else {
          if (res.message === "Email already registered") {
            toast.warning("register.exist", {
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
        toast.error(t("alert.message500"));
      }
    });
  };
  return (
    <>
      <form
        onSubmit={handleregister}
        className="grid grid-cols-12 gap-5 p-5 lg:p-8 w-full"
      >
        <div className="col-span-12 mb-5">
          <div className="text-3xl text-center font-medium">
            {t("register.title")}
          </div>
        </div>
        <div className="col-span-12">
          <Textfield
            name="name"
            value={formsigin.name}
            onChange={handleForm}
            title={t("label.name")}
            placeholder={t("label.name")}
            required
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <Textfield
            type="number"
            name="phone"
            value={formsigin.phone}
            onChange={handleForm}
            title={t("label.phone")}
            placeholder={t("label.phone")}
            required
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <Textfield
            type="password"
            name="password"
            value={formsigin.password}
            onChange={handleForm}
            title={t("label.password")}
            placeholder={t("label.password")}
            required
          />
        </div>
        <div className="col-span-12">
          <Textfield
            name="email"
            value={formsigin.email}
            onChange={handleForm}
            title={t("label.email")}
            placeholder={t("label.email")}
          />
        </div>
        <div className="col-span-12">
          <Textarea
            name="address"
            value={formsigin.address}
            onChange={(e) => {
              handleForm(e as any);
            }}
            title={t("label.address")}
            placeholder={t("label.address")}
          />
        </div>
        <div className="col-span-12 flex items-center gap-5">
          <Button
            title={t("label.reset")}
            type="reset"
            className="rounded text-white mt-3 text-large border border-gray-200"
          />
          <Button
            title={t("login.signup")}
            type="submit"
            className="bg-warning rounded mt-3 text-large text-white"
          />
        </div>
        <div className="col-span-12">
          <a href="/login" className="underline uppercase">
            {t("login.title")}
          </a>
        </div>
      </form>
    </>
  );
}

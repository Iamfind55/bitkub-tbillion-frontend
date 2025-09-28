"use client";
import { IDecodeToken, ILogins, ITokens } from "@/interface/logintype";
import { login } from "@/redux/slice/authSlice";
import { ActionLogin } from "@/services/services";
import Button from "@/utils/Button";
import DecodeToken from "@/utils/DecodeToken";
import Password from "@/utils/Password";
import Textfield from "@/utils/Textfield";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function FormLogin() {
  const router = useRouter();
  const dispath = useDispatch();
  const { user } = useSelector((state: any) => state.auth);
  const [form, setForm] = useState<ILogins>({ email: "", password: "" });
  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handlesubmitform = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    ActionLogin(form).then((res: ITokens) => {
      try {
        if (res.status === 200) {
          const data: IDecodeToken = DecodeToken(res?.token?.accessToken);
          // set to localstorage
          localStorage.setItem("token", res?.token?.accessToken);
          localStorage.setItem("refreshToken", res?.token?.refreshToken);
          localStorage.setItem("userid", data?.userId);
          localStorage.setItem("role", data?.role);
          localStorage.setItem("name", data?.name);
          localStorage.setItem("email", data?.email);
          localStorage.setItem("accountId", data?.accountId);
          //set to cookies
          Cookies.set("token", res?.token?.accessToken);
          Cookies.set("refreshToken", res?.token?.refreshToken);
          Cookies.set("role", data?.role);
          Cookies.set("name", data?.name);
          Cookies.set("email", data?.email);
          Cookies.set("userid", data?.userId);
          Cookies.set("accountId", data?.accountId);
          //set to redux
          dispath(
            login({
              token: res?.token?.accessToken,
              refreshToken: res?.token?.refreshToken,
              role: data?.role,
              name: data?.name,
              email: data?.email,
              userid: data?.userId,
              accountId: data?.accountId,
            })
          );
          // Swal.fire('warning', 'login success','success');
          toast.success("เข้าสู่ระบบสำเร็จ");
          if (data?.role === "admin" || data?.role === "operator") {
            setTimeout(() => {
              window.location.href = "/backend";
            }, 1000);
          } else if (data?.role === "customer") {
            setTimeout(() => {
              window.location.href = "/trade/btc";
            }, 1000);
          }
        } else {
          toast.warning(res.error);
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  useEffect(() => {
    if (user?.role === "admin" || user?.role === "operator") {
      window.location.href = "/backend";
    } else if (user?.role === "customer") {
      window.location.href = "/trade/BTCUSDT";
    }
  }, [user?.role]);

  return (
    <form onSubmit={handlesubmitform} className="flex flex-col gap-5">
      <Textfield
        name="email"
        value={form.email}
        placeholder="กรอกหมายเลขโทรศัพท์ หรือ อีเมล์ของคุณ"
        id="email"
        title="หมายเลขโทรศัพท์ / อีเมล"
        onChange={handleForm}
        required
      />
      <Password
        name="password"
        value={form.password}
        placeholder="รหัสผ่าน"
        id="password"
        title="รหัสผ่าน"
        onChange={handleForm}
        required
      />
      <Button
        title="เข้าสู่ระบบ"
        type="submit"
        className="bg-warning rounded mt-3 py-3 text-large text-white"
      />
      <div className="flex justify-between">
        <Link href="/forgotpassword" className="underline underline-offset-1">
          ลืมรหัสผ่าน
        </Link>
        <Link href="/register" className="underline underline-offset-1">
          ลงทะเบียนเลย
        </Link>
      </div>
    </form>
  );
}

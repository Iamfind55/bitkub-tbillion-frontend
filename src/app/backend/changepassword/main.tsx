"use client";
import { LinkApi } from "@/enum/linkapi";
import useApi from "@/services/api";
import Maincontent from "@/utils/maincontent";
import { Formik, FormikErrors } from "formik";
import { useState } from "react";
import { IoEyeOffOutline } from "react-icons/io5";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { toast } from "react-toastify";
import Link from "next/link";

interface FormValues {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
type PasswordVisibilityState = {
  currentPass: boolean;
  newPass: boolean;
  confirmPass: boolean;
};
const initialValues = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};
const validate = (values: FormValues) => {
  const errors: FormikErrors<FormValues> = {};
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
function ChangePassword() {
  const api = useApi();
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
  const handleSubmit = async (values: FormValues, actions: any) => {
    try {
      actions.setSubmitting(true);
      const result = await api({
        url: LinkApi.changePassword,
        method: "post",
        params: values,
      });
      if (result.status === 200) {
        toast.success("Change password success");
        actions.resetForm();
      } else if (result.status == 404) {
        toast.warning("Current password is incorrect");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      actions.setSubmitting(false);
    }
  };
  return (
    <div>
      <Maincontent>
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={handleSubmit}
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
      </Maincontent>
    </div>
  );
}

export default ChangePassword;

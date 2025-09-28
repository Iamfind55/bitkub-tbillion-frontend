"use client";
import React, { useMemo, useState } from "react";
import { DurationColumns } from "@/column/column";
import { FormatDate } from "@/helper/format";
import { useGetDuration } from "@/services/durationservice";
import Button from "@/utils/Button";
import ButtonIcon from "@/utils/ButtonIcon";
import useHandleDelete from "@/services/deleteservice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import { EditIcon, TrashIcon } from "@/utils/Icons";
import { setIsOpen } from "@/redux/slice/dialogSlice";
import { LinkApi } from "@/enum/linkapi";
import Swal from "sweetalert2";
import Dialog from "@/utils/Dialog";
import TextfieldDefault from "@/utils/TextFiledDefault";
import { useFormik } from "formik";
import useApi from "@/services/api";
import * as Yup from "yup";
import Notification from "@/utils/Notification";
import ErrorNotification from "@/utils/ErrorNotification";
import { durationUnit } from "@/enum/duration";
import SelectField from "@/utils/SelectField";
import { toast } from "react-toastify";
const validationSchema = Yup.object({
  unit: Yup.string().required("Unit is required"),
  number: Yup.string()
    .required("Number is required")
    .matches(/^\d+$/, "Mus be number"),
  percent: Yup.string().matches(/^\d+$/, "Mus be number"),
  minPrice: Yup.string().matches(/^\d+$/, "Mus be number"),
});
const updateValidationSchema = Yup.object({
  number: Yup.string().matches(/^\d+$/, "Mus be number"),
});
function DurationTable() {
  const durationHook = useGetDuration();
  const api = useApi();
  const { data, loading, error } = durationHook;
  const { handleDelete } = useHandleDelete();
  const dispatch = useDispatch();
  const dialog = useAppSelector((state) => state.dialog);
  const [dataEvents, setDataEvents] = useState({ action: "", data: {} });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const handleCancel = () => {
    handleClose();
    formik.resetForm();
  };
  const handleClose = () => {
    dispatch(setIsOpen({ isOpen: false, status: null }));
    setDataEvents({ action: "", data: {} });
  };
  setTimeout(() => {
    setShowSuccess(false);
    setShowError(false);
  }, 5000);
  const handleUserDelete = async (durationId: string) => {
    try {
      const url = `${LinkApi.duration}/${durationId}`;
      const deleteResult = await handleDelete(url);
      if (deleteResult.status === 200) {
        durationHook.refreshData();
        Swal.fire("Delete Successful!", "", "success");
      } else if (deleteResult.response.status === 500) {
        setShowError(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const initialValues = {
    unit: "second",
    number: Number,
    percent: "",
    minPrice: "",
    ...dataEvents.data,
  };

  const formik: any = useFormik({
    initialValues: initialValues,
    validationSchema:
      dataEvents.action == "edit" ? updateValidationSchema : validationSchema,
    onSubmit: async (values) => {
      if (dataEvents.action == "edit") {
        const result = await api({
          url: `${LinkApi.duration}/${(dataEvents.data as any)?.durationId}`,
          method: "put",
          params: {
            ...values,
            number: Number(values.number),
          },
        });
        if (result.status == 200 || result.response.data.status == 200) {
          durationHook.refreshData();
          handleClose();
          setShowSuccess(true);
          handleCancel();
          toast.success("Edit duration success");
        }
        if (result.response?.data?.status === 500) {
          setShowError(true);
          setErrorMessage(result.response?.data?.message);
        }
      } else {
        const result = await api({
          url: LinkApi.duration,
          method: "post",
          params: values,
        });
        if (result.status == 200) {
          setShowSuccess(true);
          durationHook.refreshData();
          handleClose();
          toast.success("Add new duration");
        }
        if (result.response.data.status === 500) {
          setShowError(true);
          setErrorMessage(result.response.data.message);
        }
      }
    },
  });
  React.useEffect(() => {
    if (dataEvents.action === "edit") {
      formik.setValues({
        ...formik.values,
        ...dataEvents.data,
      });
    }
  }, [dataEvents.data]);
  const handleChange = (key: string, value: string) => {
    formik.handleChange(key as string)(value as string);
  };
  const textFields = useMemo(() => {
    const defaultData: Record<string, any> = dataEvents.data;
    return [
      { type: "select", title: "Unit", key: "unit", options: durationUnit },
      { type: "text", title: "Number", key: "number" },
      { type: "text", title: "Percent", key: "percent" },
      { type: "text", title: "Min price", key: "minPrice" },
    ].map((field) => {
      if (field.type === "text") {
        return (
          <div key={field.key}>
            <TextfieldDefault
              type={field.type}
              title={field.title}
              placeholder={field.title}
              defaultValue={defaultData ? defaultData[field.key] : ""}
              onChange={(value: any) => handleChange(field.key, value)}
            />
            {formik.errors[field.key] && (
              <p className="text-sm text-red-600">
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
              <p className="text-sm text-red-600">
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
    <div>
      <h6 className="px-1 py-1 mt-2 text-gray-800 font-bold">
        Manage duration
      </h6>
      <div className="flex justify-end mb-2">
        <Button
          title="Add new"
          className="bg-info text-white rounded-lg px-1 ml-2 py-2"
          onClick={() =>
            dispatch(setIsOpen({ isOpen: true, status: "addDuration" }))
          }
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table text-sm">
          <thead>
            <tr>
              {DurationColumns.map((column) => {
                return <th key={column}>{column}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((row, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{row.number + row.unit}</td>
                  <td>{row.percent}%</td>
                  <td>{row.minPrice}</td>
                  <td>{FormatDate(row.createdAt)}</td>
                  <td>
                    <div className="flex justify-center">
                      <ButtonIcon
                        style={{ marginLeft: "4px" }}
                        icon={<EditIcon size={18} />}
                        onClick={() => {
                          setDataEvents({ action: "edit", data: row });
                          dispatch(
                            setIsOpen({ isOpen: true, status: "addDuration" })
                          );
                        }}
                      />
                      <ButtonIcon
                        style={{ marginLeft: "4px" }}
                        icon={<TrashIcon size={18} />}
                        onClick={() => handleUserDelete(row.durationId)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {dialog.isOpen && dialog.status === "addDuration" && (
        <Dialog
          titleClose="Cancel"
          titleSave="Save"
          isOpen={dialog.isOpen}
          onClose={handleClose}
          className="bg-white overflow-auto mt-10 text-info p-6  rounded z-50 w-[80%] md:w-1/4 max-h-[85vh]"
        >
          <form onSubmit={formik.handleSubmit}>
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
              {dataEvents.action === "edit" ? "Edit duration" : "Add duration"}
            </h3>
            <div className="grid md:grid-cols-1 md:gap-6">{textFields}</div>
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
        <ErrorNotification
          message={errorMessage || "Edit duration failed"}
          timeout={5000}
        />
      )}
    </div>
  );
}

export default DurationTable;

"use client";
import { typeColumns } from "@/column/column";
import { LinkApi } from "@/enum/linkapi";
import { FormatDate } from "@/helper/format";
import { setIsOpen } from "@/redux/slice/dialogSlice";
import { useAppSelector } from "@/redux/store";
import useApi from "@/services/api";
import useHandleDelete from "@/services/deleteservice";
import { useGetType } from "@/services/typeservice";
import Button from "@/utils/Button";
import ButtonIcon from "@/utils/ButtonIcon";
import Dialog from "@/utils/Dialog";
import ErrorNotification from "@/utils/ErrorNotification";
import ErrorPage from "@/utils/ErrorPage";
import { EditIcon, TrashIcon } from "@/utils/Icons";
import Loader from "@/utils/Loader";
import TextfieldDefault from "@/utils/TextFiledDefault";
import { useFormik } from "formik";
import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  symbol: Yup.string().required("Symbol is required"),
  code: Yup.string().required("Type is required"),
  rate: Yup.number().required("Rate is required"),
});
function TableType() {
  const api = useApi();
  const dispatch = useDispatch();
  const dialog = useAppSelector((state) => state.dialog);
  const typeHook = useGetType();
  const { handleDelete } = useHandleDelete();
  const { data, loading, error } = typeHook;
  const [dataEvents, setDataEvents] = useState({ action: "", data: {} });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

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
  const initialValues = {
    name: "",
    symbol: "",
    code: "",
    rate: "",
    ...dataEvents.data,
  };

  const formik: any = useFormik({
    initialValues: initialValues,
    validationSchema: dataEvents.action === "edit" ? "" : validationSchema,
    onSubmit: async (values) => {
      try {
        if (dataEvents.action === "edit") {
          const result = await api({
            url: `${LinkApi.types}/${(dataEvents.data as any)?.walletTypeId}`,
            method: "put",
            params: values,
          });
          if (result.status == 200 || result.response.data.status == 200) {
            typeHook.refreshData();
            handleClose();
            setShowSuccess(true);
          }

          toast.success("Edit type success");
          handleCancel();
        } else {
          const result = await api({
            url: LinkApi.types,
            method: "post",
            params: values,
          });
          if (result.status == 200) {
            setShowSuccess(true);
            typeHook.refreshData();
            handleClose();
          }
          toast.success("Add new type success");
        }
      } catch (error) {
        console.log(error);
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
  const handleUserDelete = async (typeId: string) => {
    try {
      const url = `${LinkApi.types}/${typeId}`;
      const deleteResult = await handleDelete(url);

      if (deleteResult.status === 200) {
        typeHook.refreshData();
        Swal.fire("Delete Successful!", "", "success");
      } else if (deleteResult.response.status === 500) {
        setShowError(true);
      }
    } catch (error) {
      toast.warning(`${error}`);
    }
  };

  const textFields = useMemo(() => {
    const defaultData: Record<string, any> = dataEvents.data;
    return [
      { type: "text", title: "Name", key: "name" },
      { type: "text", title: "Symbol", key: "symbol" },
      {
        type: "text",
        title: "Type",
        key: "code",
      },
      { type: "text", title: "Rate", key: "rate" },
    ].map((field) => {
      if (field.type === "text") {
        return (
          <div key={field.key}>
            <TextfieldDefault
              type={field.type}
              title={field.title}
              defaultValue={defaultData ? defaultData[field.key] : ""}
              onChange={(value: any) => handleChange(field.key, value)}
            />
            {formik.errors[field.key] && (
              <p className="text-sm text-red-600 dark:text-red-500">
                {formik.errors[field.key]}
              </p>
            )}
          </div>
        );
      }
      return null;
    });
  }, [formik, dataEvents.data]);

  if (loading) return <Loader />;
  if (error) return <ErrorPage />;
  return (
    <div>
      <h6 className="px-1 py-1 text-gray-800 font-bold">Manage type</h6>
      <div className="flex justify-end mb-2">
        <Button
          title="Add new"
          className="bg-info text-white rounded-lg px-1 ml-2 py-2"
          onClick={() =>
            dispatch(setIsOpen({ isOpen: true, status: "addType" }))
          }
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table text-sm">
          <thead>
            <tr>
              {typeColumns.map((column) => {
                return <th key={column}>{column}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((row, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{row.name}</td>
                  <td>{row.code}</td>
                  <td>{row.symbol}</td>
                  <td>{row.rate} $</td>
                  <td>{FormatDate(row.createdAt)}</td>
                  <td>
                    <div className="flex justify-end">
                      <ButtonIcon
                        style={{ marginLeft: "4px" }}
                        icon={<EditIcon size={18} />}
                        onClick={() => {
                          setDataEvents({ action: "edit", data: row });
                          dispatch(
                            setIsOpen({ isOpen: true, status: "addType" })
                          );
                        }}
                      />
                      <ButtonIcon
                        style={{ marginLeft: "4px" }}
                        icon={<TrashIcon size={18} />}
                        onClick={() => handleUserDelete(row.walletTypeId)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {dialog.isOpen && dialog.status === "addType" && (
        <Dialog
          titleClose="Cancel"
          titleSave="Save"
          isOpen={dialog.isOpen}
          onClose={handleClose}
          className="w-auto"
        >
          <form onSubmit={formik.handleSubmit}>
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
              {dataEvents.action ? "Edit Type" : "Add new user"}
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
        <ErrorNotification message="Delete type failed" timeout={5000} />
      )}
    </div>
  );
}

export default TableType;

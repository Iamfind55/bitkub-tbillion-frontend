// useHandleDelete.js
import { useState } from "react";
import { LinkApi } from "@/enum/linkapi";
import useApi from "@/services/api";
import Swal from "sweetalert2";

const useHandleDelete = () => {
  const api = useApi();
  
  const handleDelete = async (url: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure you want to delete?",
        showConfirmButton: true,
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Delete!",
        cancelButtonText: "Cancel",
        icon: "warning",
      });

      if (result.isConfirmed) {
        const response = await api({
          url: url,
          method: "delete",
          params: {},
        }); 
        return response;
      }
    } catch (error) {
      throw error;
    }
  };

  return { handleDelete };
};

export default useHandleDelete;

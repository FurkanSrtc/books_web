import React from "react";
import { toast } from "react-toastify";
import { TOAST_TYPES } from "./toastTypes";

export default function toastifyMessage(
  message: string, 
  type: TOAST_TYPES,
  autoClose: number = 3000, 
  title?: string) {

  const options = {
    position: "top-right",
    autoClose: autoClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  switch (type) {
  case TOAST_TYPES.SUCCESS:
    return (toast.success(message), options);
  case TOAST_TYPES.ERROR:
    return (toast.error(message), options);
  case TOAST_TYPES.WARNING:
    return (toast.warning(message), options);
  case TOAST_TYPES.INFO:
    return (toast.info(message), options);
  default:
    return (toast.info(message),  options);
  }
}

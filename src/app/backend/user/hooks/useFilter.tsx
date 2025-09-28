import React from "react";

const initialValues = {
  pageSize: 10,
  currentPage: 1,
  search: "",
  status: "",
  date: { startDate: "", endDate: "" },
  startDate: "",
  endDate: "",
};

const ACTION_TYPE = {
  PAGE_ROW: "page_row",
  PAGINATION: "pagination",
  SEARCH: "search",
  STATUS: "status",
  DATE: "date",
  START_DATE: "startDate",
  END_DATE: "endDate",
};
const reducer = (state: any, action: any) => {
  switch (action.type) {
    case ACTION_TYPE.PAGE_ROW:
      return {
        ...state,
        pageSize: action.payload || null,
        currentPage: 1,
      };
    case ACTION_TYPE.PAGINATION:
      return {
        ...state,
        currentPage: action.payload || null,
      };
    case ACTION_TYPE.SEARCH:
      return { ...state, search: action.payload ?? "null" };
    case ACTION_TYPE.STATUS:
      return { ...state, status: action.payload ?? "", currentPage: 1 };
    case ACTION_TYPE.DATE:
      return {
        ...state,
        date: {
          startDate: action.payload.startDate ?? "",
          endDate: action.payload.endDate ?? "",
        },
      };
    case ACTION_TYPE.START_DATE:
      return {
        ...state,
        startDate: action.payload ?? "",
        currentPage: 1,
      };
    case ACTION_TYPE.END_DATE:
      return {
        ...state,
        endDate: action.payload ?? "",
        currentPage: 1,
      };
    default:
      return;
  }
};
const useFilter = () => {
  const [state, dispatch] = React.useReducer(reducer, initialValues);
  const data = React.useMemo(() => {
    return {
      ...state,
    };
  }, [state]);

  return {
    state,
    data,
    dispatch,
    ACTION_TYPE,
  };
};
export default useFilter;

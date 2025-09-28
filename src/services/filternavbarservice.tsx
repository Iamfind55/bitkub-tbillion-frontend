import React from "react";

const initialValues = {
  pageSize: 5,
  currentPage: 1,
};

const ACTION_TYPE = {
  PAGE_ROW: "page_row",
};
const reducer = (state: any, action: any) => {
  switch (action.type) {
    case ACTION_TYPE.PAGE_ROW:
      return {
        ...state,
        pageSize: action.payload || null,
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

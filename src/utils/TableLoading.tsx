import React from "react";

function TableLoading({ props }: { props: number | 2 }) {
  const length = props;
  const columnArray = Array.from({ length }, (_, index) => index + 1);

  return (
    <table className="table animate-pulse ">
      <thead>
        <tr>
          {columnArray.map((columnIndex) => (
            <th key={columnIndex}>
              <div className="h-1 my-3 bg-slate-200 rounded col-span-1"></div>
            </th>
          ))}
        </tr>
      </thead>
            <tbody>
                 
        <tr>
          {columnArray.map((columnIndex) => (
            <td key={columnIndex}>
              <div className="h-1 my-3 bg-slate-200 rounded col-span-1"></div>
            </td>
          ))}
        </tr>
        <tr>
          {columnArray.map((columnIndex) => (
            <td key={columnIndex}>
              <div className="h-1 my-3 bg-slate-200 rounded col-span-1"></div>
            </td>
          ))}
        </tr>
        <tr>
          {columnArray.map((columnIndex) => (
            <td key={columnIndex}>
              <div className="h-1 my-3 bg-slate-200 rounded col-span-1"></div>
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

export default TableLoading;

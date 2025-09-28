import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@/utils/style.css";
function DatePicker({
  field,
  getValueForKey,
  handleChange,
  defaultValue,
}: {
  field: any;
  getValueForKey: any;
  handleChange: any;
  defaultValue: string;
}) {
  const selectedValue = getValueForKey(field.key);

  const hasSelectedValue =
    selectedValue !== undefined && selectedValue !== null && selectedValue;
  const updateValue = defaultValue ? new Date(defaultValue) : null;

  return (
    <div>
      <label>{field.title}</label>
      <ReactDatePicker
        selected={
          hasSelectedValue
            ? new Date(selectedValue)
            : defaultValue
            ? updateValue
            : null
        }
        onChange={(date) => handleChange(field.key, date)}
        dateFormat="yyyy-MM-dd"
        placeholderText="yyyy-mm-dd"
        className="border border-gray-400 rounded-lg px-4 py-2 w-full"
        wrapperClassName="custom-datepicker-wrapper"
        popperClassName="custom-popper"
      />
    </div>
  );
}

export default DatePicker;

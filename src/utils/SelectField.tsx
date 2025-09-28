// SelectField.tsx
import { ChangeEvent, FC, useEffect, useState } from "react";

interface Option {
  label: string;
  value: string;
}

interface SelectFieldProps {
  title: string;
  options?: Option[];
  value?: string;
  defaultValue?: string;
  onChange: (value: string) => void;
}

const SelectField: FC<SelectFieldProps> = ({
  title,
  options = [],
  value,
  defaultValue,
  onChange,
}) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    value || defaultValue
  );

  useEffect(() => {
    setSelectedValue(value || defaultValue);
  }, [value, defaultValue]);

  const handleChangeValue = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-900 dark:text-white">
        {title}
      </label>
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-1 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={selectedValue}
        onChange={handleChangeValue}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;

const Select = ({
  option,
  value,
  name,
  onChange,
  className,
  title,
  required,
}: {
  option: Array<{ label: string; value: string }>;
  value: any;
  name?: string | "select_name";
  onChange: (e: any) => void;
  className?: string | "";
  title?: string;
  required?: boolean | false;
}) => {
  return (
    <div className="block select-none">
      <span className="block text-sm font-medium text-info">
        {title} {required && <span className="text-pink-500">*</span>}
      </span>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`${className?className:" bg-gray-50 bordermin-w-[80px] border-primary text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary/90 block w-full py-1 px-3 dark:bg-info/60 dark:border-primary shadow-lg dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"}`}
      >
        {option.map((option: any) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;

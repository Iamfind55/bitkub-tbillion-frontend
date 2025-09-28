import { InputHTMLAttributes, KeyboardEvent } from "react";
import { SearchIcon } from "./Icons";

export default function SearchInput(
  props: InputHTMLAttributes<HTMLInputElement>
) {
  
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <SearchIcon size={18} color="grey" />
      </div>
      <input
        {...props}
        type="text"
        id="simple-search"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 pr-2.5 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search..."
        onKeyDown={props.onKeyDown}
      />
    </div>
  );
}

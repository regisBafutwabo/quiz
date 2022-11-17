import { SelectProps } from "./Select.types";

export const Select = ({
  label,
  options,
  onChange,
  defaultValue,
}: SelectProps) => {
  return (
    <div>
      <label className="mb-2 block text-base font-semibold text-white">
        {label}
      </label>
      <select
        className="block w-full rounded-lg  bg-gray-50 p-2.5 text-sm text-gray-900 focus-visible:outline-none max-sm:p-3"
        defaultValue={defaultValue}
        onChange={onChange}
      >
        {options.map((level) => (
          <option key={level.key} value={level.value}>
            {level.value}
          </option>
        ))}
      </select>
    </div>
  );
};

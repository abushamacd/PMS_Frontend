"use client";

import { useFormContext, Controller } from "react-hook-form";

export type SelectOptions = {
  label: string;
  value: boolean;
};

type SelectFieldProps = {
  options: SelectOptions[];
  name: string;
  required?: boolean;
  size?: "large" | "small";
  value?: string | string[] | undefined;
  placeholder?: string;
  label?: string;
  defaultValue?: SelectOptions;
  handleChange?: (el: string) => void;
};

const FormSelectField = ({
  name,
  size = "large",
  value,
  placeholder = "select",
  options,
  label,
  defaultValue,
  required,
  handleChange,
}: SelectFieldProps) => {
  const { control } = useFormContext();

  return (
    <>
      <h1 className="mb-1 text-light_text dark:text-dark_text font-medium text-sm">
        {label ? label : null}
        {required && label ? (
          <span
            style={{
              color: "red",
              marginLeft: "2px",
            }}
          >
            *
          </span>
        ) : null}
      </h1>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <select
            // @ts-ignore
            onChange={handleChange ? handleChange : onChange}
            // size={size}
            options={options}
            value={value}
            style={{ width: "100%" }}
            placeholder={placeholder}
            className="w-full bg-dark_text dark:text-dark_bg rounded-md border border-light_primary dark:border-dark_primary focus:ring-2 focus:ring-light_primary dark:focus:ring-dark_primary focus:border-light_primary dark:focus:border-dark_primary text-base outline-none px-3 leading-8 transition-colors duration-300 ease-in-out py-[6px]"
          >
            <option value="true">Running</option>
            <option value="false">Finished</option>
          </select>
        )}
      />
    </>
  );
};

export default FormSelectField;

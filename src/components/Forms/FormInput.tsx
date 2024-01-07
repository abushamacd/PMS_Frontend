"use client";

import { getErrorMessageByPropertyName } from "@/utils/schemaValidator";
import { TextField } from "@mui/material";
import { spawn } from "child_process";
import { useFormContext, Controller } from "react-hook-form";
interface IInput {
  name: string;
  type?: string;
  size?: "large" | "small";
  value?: string | string[] | undefined;
  id?: string;
  placeholder?: string;
  validation?: object;
  label?: string;
  required?: boolean;
  disabled?: boolean;
}

const FormInput = ({
  name,
  type,
  value,
  id,
  placeholder,
  validation,
  label,
  required,
  disabled,
}: IInput) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = getErrorMessageByPropertyName(errors, name);

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
        render={({ field }) =>
          type === "password" ? (
            <input
              {...field}
              disabled={disabled}
              placeholder={placeholder}
              value={value ? value : field.value}
              name={name}
              type="password"
              className="w-full bg-dark_text dark:text-dark_bg rounded-md border border-light_primary dark:border-dark_primary focus:ring-2 focus:ring-light_primary dark:focus:ring-dark_primary focus:border-light_primary dark:focus:border-dark_primary text-base outline-none py-0 px-3 leading-8 transition-colors duration-300 ease-in-out"
            />
          ) : (
            <input
              {...field}
              disabled={disabled}
              placeholder={placeholder}
              value={value ? value : field.value}
              name={name}
              type={type}
              className="w-full bg-dark_text dark:text-dark_bg rounded-md border border-light_primary dark:border-dark_primary focus:ring-2 focus:ring-light_primary dark:focus:ring-dark_primary focus:border-light_primary dark:focus:border-dark_primary text-base outline-none py-0 px-3 leading-8 transition-colors duration-300 ease-in-out"
            />
          )
        }
      />
      <small style={{ color: "red" }}>{errorMessage}</small>
    </>
  );
};

export default FormInput;

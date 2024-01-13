import { Controller, useFormContext } from "react-hook-form";

type TextAreaProps = {
  name: string;
  label?: string;
  rows?: number;
  value?: string;
  placeholder?: string;
  required?: boolean;
};

const FormTextArea = ({
  name,
  label,
  rows,
  value,
  placeholder,
  required,
}: TextAreaProps) => {
  const { control } = useFormContext();
  return (
    <div className={`flex flex-col  w-full`}>
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
        name={name}
        control={control}
        render={({ field }) => (
          //   <Input.TextArea
          //     rows={rows}
          //     placeholder={placeholder}
          //     {...field}
          //     defaultValue={value}
          //   />
          <textarea
            {...field}
            rows={rows}
            defaultValue={value}
            placeholder={placeholder}
            value={value ? value : field.value}
            name={name}
            className="w-full bg-dark_text dark:text-dark_bg rounded border border-light_primary dark:border-dark_primary focus:ring-2 focus:ring-light_primary dark:focus:ring-dark_primary focus:border-light_primary dark:focus:border-dark_primary text-base outline-none py-1 px-3 leading-8 transition-colors duration-300 ease-in-out"
          />
        )}
      />
    </div>
  );
};

export default FormTextArea;

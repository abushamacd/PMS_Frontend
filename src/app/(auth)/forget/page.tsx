"use client";
import Form from "@/components/Forms/Form";
import { SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgetPasswordSchema } from "@/schemas/forget";
import FormInput from "@/components/Forms/FormInput";
import Link from "next/link";

type FormValues = {
  email: string;
};

const ForgetPassword = () => {
  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    console.log(data);
  };

  return (
    <div className="md:w-[400px] w-[300px]">
      <h1 className="text-2xl mb-2 text-center text-light_primary dark:text-dark_primary">
        Forget Password
      </h1>
      <Form
        submitHandler={onSubmit}
        resolver={yupResolver(forgetPasswordSchema)}
      >
        <div className="my-[10px]">
          <FormInput
            name="email"
            type="email"
            placeholder="Type your email"
            label="Email"
            required
          />
        </div>
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="text-dark_text dark:text-dark_bg bg-light_primary dark:bg-dark_primary border-0 py-2 px-6  rounded text-lg hover:opacity-80 duration-300"
          >
            Reset
          </button>
          <Link
            className="text-light_text dark:text-dark_text"
            href={"/signin"}
          >
            Remember Password?
          </Link>
        </div>
      </Form>
    </div>
  );
};
export default ForgetPassword;

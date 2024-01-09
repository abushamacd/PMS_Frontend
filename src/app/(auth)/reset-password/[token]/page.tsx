/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  useActivationMutation,
  useResetPasswordMutation,
} from "@/redux/api/authApi";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { BsCheckCircle } from "react-icons/bs";
import toast from "react-hot-toast";
import Form from "@/components/Forms/Form";
import { SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPasswordSchema } from "@/schemas/user";
import FormInput from "@/components/Forms/FormInput";
import Link from "next/link";

type FormValues = {
  password: string;
  confirmPassword: string;
};

const ResetPassword = ({ params }: { params: any }) => {
  const { token } = params;
  const [resetPassword] = useResetPasswordMutation();
  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    if (data.password === data.confirmPassword) {
      delete data["confirmPassword"];
      try {
        await resetPassword({
          token,
          data: data,
        }).unwrap();
        toast.success("Password changed");
      } catch (err: any) {
        toast.error(`${err.data?.message}`);
      }
    } else {
      toast.error(`Password not match`);
    }
  };

  return (
    <>
      <div className="md:w-[400px] w-[300px]">
        <h1 className="text-2xl mb-2 text-center text-light_primary dark:text-dark_primary">
          Reset Password
        </h1>
        <Form
          submitHandler={onSubmit}
          resolver={yupResolver(resetPasswordSchema)}
        >
          <div className="my-[10px]">
            <FormInput
              name="password"
              type="password"
              placeholder="Type your password"
              label="New Password"
              required
            />
          </div>
          <div className="my-[10px]">
            <FormInput
              name="confirmPassword"
              type="password"
              placeholder="Type your password"
              label="Confirm Password"
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
    </>
  );
};

export default ResetPassword;

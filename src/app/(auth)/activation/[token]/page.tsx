/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useActivationMutation } from "@/redux/api/authApi";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { BsCheckCircle } from "react-icons/bs";
import toast from "react-hot-toast";

const Activation = ({ params }: { params: any }) => {
  const { token } = params;
  const router = useRouter();
  const [activation, { isLoading, isError, isSuccess }] =
    useActivationMutation();

  useEffect(() => {
    const onSubmit = async (token: any) => {
      try {
        const res = await activation(token).unwrap();
        toast.success("Activation successfully. Now sign in");
        router.push("/signin");
      } catch (err: any) {
        toast.error(`${err.data?.message}`);
      }
    };
    onSubmit(token);
  }, [token]);

  if (isSuccess) {
    return (
      <div className="text-light_primary dark:text-dark_primary flex justify-center items-center flex-col gap-3">
        <BsCheckCircle
          size="50"
          className="dark:text-dark_primary text-light_primary"
        />
        <h1 className="verifying text-4xl">Verified</h1>
      </div>
    );
  }

  return (
    <>
      <div className="text-light_primary dark:text-dark_primary flex justify-center items-center flex-col gap-3">
        <CircularProgress
          sx={{ color: "unset", height: "50px", width: "50px" }}
          className="text-light_primary dark:text-dark_primary"
        />
        <h1 className="verifying text-4xl">Verifying...</h1>
      </div>
    </>
  );
};

export default Activation;

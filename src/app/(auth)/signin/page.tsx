"use client";
import Form from "@/components/Forms/Form";
import { SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "@/schemas/user";
import FormInput from "@/components/Forms/FormInput";
import Link from "next/link";
import toast from "react-hot-toast";
import { useSignInMutation } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";
import { storeUserInfo } from "@/services/auth.service";
import Loading from "@/app/loading";

type FormValues = {
  email: string;
  password: string;
};

const SignIn = () => {
  const [signIn, { isLoading }] = useSignInMutation();
  const router = useRouter();
  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      const res = await signIn(data).unwrap();
      //@ts-ignore
      storeUserInfo({ accessToken: res?.accessToken });
      router.push("/dashboard");
      toast.success("Sign in successfully!");
    } catch (err: any) {
      toast.error(`${err.data?.message}`);
    }
  };

  const defaultValues = {
    email: process.env.NEXT_PUBLIC_SADMIN_EMAIL || "",
    password: process.env.NEXT_PUBLIC_SADMIN_PASS || "",
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-5">
        <Loading />
        <p className="text-dark_primary italic">
          Note: Site is hosted in free hosting, so it&apos;s maybe slow.
        </p>
      </div>
    );
  }

  return (
    <div className="md:w-[400px] w-[300px]">
      <h1 className="text-2xl mb-2 text-center text-light_primary dark:text-dark_primary">
        Sign In
      </h1>
      <Form
        submitHandler={onSubmit}
        defaultValues={defaultValues}
        // resolver={yupResolver(signInSchema)}
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
        <div className="my-[10px]">
          <FormInput
            name="password"
            type="password"
            placeholder="Type your password"
            label="Password"
            required
          />
        </div>
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="text-dark_text dark:text-dark_bg bg-light_primary dark:bg-dark_primary border-0 py-2 px-6  rounded text-lg hover:opacity-80 duration-300"
          >
            Sign In
          </button>
          <Link
            className="text-light_text dark:text-dark_text"
            href={"/forget-password"}
          >
            Forget Password?
          </Link>
        </div>
      </Form>
    </div>
  );
};
export default SignIn;

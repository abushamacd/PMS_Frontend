"use client";
import Form from "@/components/Forms/Form";
import { SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "@/schemas/signup";
import FormInput from "@/components/Forms/FormInput";
import Link from "next/link";
import { useSignUpMutation } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

const SingUp = () => {
  const [signUp] = useSignUpMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      const res = await signUp(data).unwrap();
      router.push("/signin");
      toast.success("Account activation link sent to your email");
    } catch (err: any) {
      toast.error(`${err.data?.message}`);
    }
  };

  return (
    <div className="md:w-[400px] w-[300px]">
      <h1 className="text-2xl mb-2 text-center text-light_primary dark:text-dark_primary">
        Sign Up
      </h1>
      <Form submitHandler={onSubmit} resolver={yupResolver(signUpSchema)}>
        <div className="my-[10px]">
          <FormInput
            name="name"
            type="text"
            placeholder="Type your name"
            label="Name"
            required
          />
        </div>
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
            name="phone"
            type="text"
            placeholder="Type your phone"
            label="Phone"
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
            Sign Up
          </button>
          <Link
            className="text-light_text dark:text-dark_text"
            href={"/signin"}
          >
            Have an account?
          </Link>
        </div>
      </Form>
    </div>
  );
};
export default SingUp;

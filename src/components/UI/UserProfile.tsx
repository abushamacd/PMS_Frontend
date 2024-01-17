import Loading from "@/app/loading";
import { authKey } from "@/constants/storageKey";
import { useGetUserProfileQuery } from "@/redux/api/userApi";
import { removeUserInfo } from "@/services/auth.service";
import { IconButton } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { FaRegCircleXmark } from "react-icons/fa6";

const UserProfile = ({
  toggle,
  setToggle,
}: {
  toggle: any;
  setToggle: any;
}) => {
  const router = useRouter();
  const logOut = () => {
    removeUserInfo(authKey);
    toast.success("Sign out");
    router.push("/");
  };

  const { data: userData, isLoading: userLoading } = useGetUserProfileQuery({});

  if (userLoading) {
    return <Loading />;
  }
  // @ts-ignore
  const { name, email, role, url } = userData?.response;

  return (
    <div className="nav-item absolute right-5 md:right-40 top-16 bg-light_secondary dark:bg-dark_secondary p-8 rounded-lg md:w-96 w-64 border dark:!border-dark_primary !border-light_primary">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg text-light_text dark:text-dark_text">
          User Profile
        </p>
        <IconButton
          onClick={() => {
            setToggle("");
          }}
        >
          <FaRegCircleXmark className="dark:text-dark_primary text-light_text hover:dark:text-dark_text hover:text-light_primary duration-300" />
        </IconButton>
      </div>
      <div className="flex flex-col md:flex-row gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <Image
          height={"94"}
          width={"94"}
          alt="user"
          className="rounded-full h-24 w-24"
          src={url}
        />
        <div className="md:text-start text-center">
          <p className="font-semibold text-xl dark:text-dark_primary text-light_text hover:dark:text-dark_text hover:text-light_primary duration-300">
            {name}
          </p>
          <p className="text-gray-500 text-sm text-light_text dark:text-dark_text">
            {role}
          </p>
          <p className="text-gray-500 text-sm font-semibold text-light_text dark:text-dark_text">
            {email}
          </p>
        </div>
      </div>
      {/* <div>
        {userProfileData.map((item, index) => (
          <div
            key={index}
            className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#070e36] rounded-lg"
          >
            <button
              type="button"
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className=" text-xl rounded-lg p-3 hover:bg-light-gray"
            >
              {item.icon}
            </button>

            <div>
              <p className="font-semibold dark:text-gray-200 ">{item.title}</p>
              <p className="text-gray-500 text-sm dark:text-gray-400">
                {" "}
                {item.desc}{" "}
              </p>
            </div>
          </div>
        ))}
      </div> */}
      <div className="mt-5 flex flex-col md:flex-row justify-between gap-2">
        <button
          onClick={logOut}
          className="text-dark_text dark:text-dark_bg bg-light_primary dark:bg-dark_primary border-0 py-2 px-6  rounded text-lg hover:opacity-80 duration-300"
        >
          Sign Out
        </button>
        <button
          onClick={() => {
            router.push("/signup");
          }}
          className="text-dark_text dark:text-dark_bg bg-light_primary dark:bg-dark_primary border-0 py-2 px-6  rounded text-lg hover:opacity-80 duration-300"
        >
          Add User
        </button>
      </div>
    </div>
  );
};

export default UserProfile;

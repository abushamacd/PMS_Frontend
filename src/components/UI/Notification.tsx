import { IconButton } from "@mui/material";
import React, { ReactNode } from "react";
import { FaRegCircleXmark } from "react-icons/fa6";

const Notification = ({
  toggle,
  setToggle,
}: {
  toggle: any;
  setToggle: any;
}) => {
  return (
    <div className="nav-item absolute right-5 md:right-40 top-16 bg-light_secondary dark:bg-dark_secondary p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <p className="font-semibold text-lg text-light_text dark:text-dark_text">
            Notifications
          </p>
        </div>

        <IconButton
          onClick={() => {
            setToggle("");
          }}
        >
          <FaRegCircleXmark className="dark:text-dark_primary text-light_text hover:dark:text-dark_text hover:text-light_primary duration-300" />
        </IconButton>
      </div>
      <div className="mt-5 ">
        {/* {chatData?.map((item, index) => (
          <div
            key={index}
            className="flex items-center leading-8 gap-5 border-b-1 border-color p-3"
          >
            <img
              className="rounded-full h-10 w-10"
              src={item.image}
              alt={item.message}
            />
            <div>
              <p className="font-semibold dark:text-gray-200">{item.message}</p>
              <p className="text-gray-500 text-sm dark:text-gray-400">
                {" "}
                {item.desc}{" "}
              </p>
            </div>
          </div>
        ))} */}
        <div className="mt-5">
          {/* <Button
            color="white"
            bgColor={currentColor}
            text="See all notifications"
            borderRadius="10px"
            width="full"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Notification;

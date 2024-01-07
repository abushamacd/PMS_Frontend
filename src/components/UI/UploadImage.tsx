"use client";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { BiUpload } from "react-icons/bi";
import Image from "next/image";
import toast from "react-hot-toast";
import { useState } from "react";
import { useUpdatePhotoMutation } from "@/redux/api/userApi";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function UploadImage() {
  const [updatePhoto] = useUpdatePhotoMutation();
  const [loadImage, setLoadImage] = useState();

  const imagehandler = async (e: any) => {
    if (e.target.files.length !== 0) {
      const file = e.target.files[0];
      const reader: any = new FileReader();
      reader.onload = async () => {
        setLoadImage(reader.result);
        const base64 = await reader.result;
        try {
          const res = await updatePhoto({ photo: base64 }).unwrap();
          toast.success("Update photo");
        } catch (err: any) {
          toast.error(`${err.data?.message}`);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="">
      <Image
        className="rounded-full mx-auto mb-4"
        width={150}
        height={150}
        src={loadImage || "https://i.ibb.co/MgsTCcv/avater.jpg"}
        alt="profile"
      />
      <Button
        className="text-dark_text dark:text-dark_text !bg-light_primary dark:!bg-dark_bg border-0 py-2 px-6  rounded text-lg hover:opacity-80 duration-300"
        component="label"
        variant="contained"
        startIcon={<BiUpload />}
      >
        Upload Photo
        <VisuallyHiddenInput
          name="file"
          id="avater"
          onChange={imagehandler}
          type="file"
        />
      </Button>
    </div>
  );
}

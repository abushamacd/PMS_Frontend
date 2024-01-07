"use client";

import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { BiUpload } from "react-icons/bi";
import Image from "next/image";
import { useFormContext } from "react-hook-form";

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

export default function FormFile({ name }: { name: string }) {
  const { setValue } = useFormContext();
  const [loadImage, setLoadImage] = React.useState("");

  const imagehandler = (e: any) => {
    if (e.target.files.length !== 0) {
      const file = e.target.files[0];
      const reader: any = new FileReader();
      reader.onload = () => {
        setLoadImage(reader.result);
        setValue(name, e.target.files[0]);
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
        Upload file
        <VisuallyHiddenInput
          name={name}
          id={name}
          onChange={imagehandler}
          type="file"
        />
      </Button>
    </div>
  );
}

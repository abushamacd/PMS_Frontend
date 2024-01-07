"use client";

import { Box } from "@mui/material";
import { useTheme } from "next-themes";
import light_auth from "@/assets/light_auth.png";
import dark_auth from "@/assets/dark_auth.png";
import Image from "next/image";
import Link from "next/link";

const Authlayout = ({ children }: { children: React.ReactNode }) => {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <div className="flex flex-col md:flex-row justify-center items-center h-screen gap-10">
        <Link href={"/"}>
          <div className="image md:block hidden">
            {theme === "light" ? (
              <Image
                className="h-[500px] w-[500px]"
                alt="hero"
                src={light_auth}
              />
            ) : (
              <Image
                className="h-[500px] w-[500px]"
                alt="hero"
                src={dark_auth}
              />
            )}
          </div>
          <div className="image block md:hidden">
            {/* {theme === "light" ? (
              <Image
                className="h-[100px] w-[200px]"
                alt="hero"
                src={light_logo}
              />
            ) : (
              <Image
                className="h-[100px] w-[200px]"
                alt="hero"
                src={dark_logo}
              />
            )} */}
          </div>
        </Link>
        <div className="">{children}</div>
      </div>
    </>
  );
};

export default Authlayout;

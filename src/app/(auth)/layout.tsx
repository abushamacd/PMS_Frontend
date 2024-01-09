"use client";

import { useTheme } from "next-themes";
import light_logo from "@/assets/light_logo.png";
import dark_logo from "@/assets/dark_logo.png";
import Image from "next/image";
import Link from "next/link";

const Authlayout = ({ children }: { children: React.ReactNode }) => {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <div className="flex flex-col md:flex-row justify-evenly items-center h-screen">
        <Link href={"/"}>
          <div className="image md:block hidden">
            {theme === "light" ? (
              <Image
                className="h-[250px] w-[250px]"
                alt="hero"
                src={light_logo}
              />
            ) : (
              <Image
                className="h-[250px] w-[250px]"
                alt="hero"
                src={dark_logo}
              />
            )}
          </div>
          <div className="image block md:hidden">
            {theme === "light" ? (
              <Image
                className="h-[200px] w-[200px]"
                alt="hero"
                src={light_logo}
              />
            ) : (
              <Image
                className="h-[200px] w-[200px]"
                alt="hero"
                src={dark_logo}
              />
            )}
          </div>
        </Link>
        <div className="">{children}</div>
      </div>
    </>
  );
};

export default Authlayout;

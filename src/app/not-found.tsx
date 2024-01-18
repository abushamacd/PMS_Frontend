"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import dark_error from "@/assets/dark_error.svg";
import light_error from "@/assets/light_error.svg";

const NotFoundPage = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex justify-center items-center h-screen">
      <Link href={`/`}>
        {theme === "light" ? (
          <Image className="" alt="hero" src={light_error} />
        ) : (
          <Image className="" alt="hero" src={dark_error} />
        )}
      </Link>
    </div>
  );
};

export default NotFoundPage;

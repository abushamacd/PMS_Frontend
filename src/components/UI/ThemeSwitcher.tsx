"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { BiSun } from "react-icons/bi";
import { FaMoon } from "react-icons/fa";

const ThemeSwitcher = ({ layout }: { layout?: string }) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return (
    <div>
      {theme === "light" ? (
        <BiSun
          className="cursor-pointer md:text-[unset] !text-light_text hover:!text-light_primary duration-300 text-[24px]"
          onClick={() => setTheme("dark")}
        />
      ) : (
        <FaMoon
          className={`cursor-pointer text-dark_bg md:text-dark_text hover:text-dark_text md:hover:text-dark_bg duration-300 md:text-[24px] mt-[2px] ${
            layout === "admin" &&
            `dark:text-dark_primary text-light_text hover:dark:text-dark_text hover:text-light_primary duration-300`
          } `}
          size={20}
          onClick={() => setTheme("light")}
        />
      )}
    </div>
  );
};

export default ThemeSwitcher;

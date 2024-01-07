"use client";

import React, { useState } from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";
import { FiSearch, FiUser } from "react-icons/fi";
import { PiPhoneCallFill } from "react-icons/pi";
import { AiFillTwitterCircle } from "react-icons/ai";
import { BsPinterest, BsFacebook } from "react-icons/bs";
import Link from "next/link";
import ThemeSwitcher from "../components/UI/ThemeSwitcher";
import Image from "next/image";
import { useTheme } from "next-themes";
import light_logo from "./../../public/light_logo.png";
import dark_logo from "./../../public/dark_logo.png";
import light_text_logo from "./../../public/light_text_logo.png";
import dark_text_logo from "./../../public/dark_text_logo.png";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { authKey } from "@/constants/storageKey";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const handleSignout = () => {
    removeUserInfo(authKey);
    router.push("/signin");
  };

  // @ts-ignore
  const { role } = getUserInfo();

  const menu_items = [
    {
      link: "/",
      title: "Home",
    },
    {
      link: "/profile",
      title: "Profile",
    },
    {
      link: "/about",
      title: "About Us",
    },
  ];

  // const handleSubmit = (e: any) => {
  //   e.preventDefault();
  // };

  const closeSearch = () => {
    setOpenSearch(!openSearch);
  };

  return (
    <header className={`w-full layout z-[999]`}>
      {/* Search bar */}
      <div
        id="serach_bar"
        className={`serach_bar ${
          openSearch && "active"
        } md:px-[70px] px-[20px] md:h-[130px] h-[75px] flex justify-between items-center absolute bg-[#000000cc] z-[990] left-0 top-0 w-full`}
      >
        <form
          className="flex flex-row-reverse justify-between gap-5  md:w-[950px] w-[250px]"
          // onSubmit={(e) => handleSubmit(e)}
        >
          <input
            type="text"
            className="text-[25px] border-0 rounded-md p-1 focus:outline-none text-gray-500 md:w-[1060px] w-[260px]"
            name="searchTerm"
            id="searchTerm"
            placeholder="Search our store"
          />
          <button type="submit" className="md:mr-[50px] mr-[30px]">
            <Link href={`/products`}>
              <FiSearch size="20" color="#fff" />
            </Link>
          </button>
        </form>
        <RxCross1 size="20" onClick={closeSearch} color="#fff" />
      </div>

      <div className="header_top dark:bg-dark_bg bg-light_bg dark:before:bg-dark_bg before:bg-light_bg hidden md:block">
        <div className={`layout`}>
          <div className="flex justify-between">
            <div className="w-1/2 dark:text-dark_text text-light_text flex gap-2 dark:before:bg-dark_secondary before:bg-light_secondary header_top_left">
              <h4>Need Help?</h4>
              <PiPhoneCallFill size="20" />
              <p>Call: +321 123 45 978</p>
            </div>
            <div className="w-1/2 dark:text-dark_text text-light_text flex justify-end items-center gap-2 dark:before:bg-dark_secondary before:bg-light_secondary header_top_right">
              <ThemeSwitcher />
              <BsFacebook
                size="20"
                className="dark:text-dark_text text-light_text hover:dark:text-dark_bg hover:text-light_primary duration-300"
              />
              <BsPinterest
                size="20"
                className="dark:text-dark_text text-light_text hover:dark:text-dark_bg hover:text-light_primary duration-300"
              />
              <AiFillTwitterCircle
                size="24"
                className="dark:text-dark_text text-light_text hover:dark:text-dark_bg hover:text-light_primary duration-300"
              />
              {(role === "admin" || role === "super_admin") && (
                <Link
                  className="dark:text-dark_bg text-light_text hover:dark:text-dark_text hover:text-light_primary duration-300 border px-1 dark:border-dark_bg hover:dark:border-dark_text rounded-md"
                  href="/"
                >
                  Dashboard
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="header_middle dark:bg-dark_bg bg-light_bg py-2">
          <div className="layout px-[20px]">
            <div className="flex items-center justify-between gap-[20px]">
              <div className="logo md:w-[15%] flex justify-start">
                <Link
                  href="/"
                  className="dark:text-dark_primary text-light_primary hover:dark:text-dark_text hover:text-light_text duration-300 text-2xl hidden md:block"
                >
                  {theme === "light" ? (
                    <Image className="h-[70px]" alt="hero" src={light_logo} />
                  ) : (
                    <Image className="h-[70px]" alt="hero" src={dark_logo} />
                  )}
                </Link>
                <Link
                  href="/"
                  className="dark:text-dark_primary text-light_primary hover:dark:text-dark_text hover:text-light_text duration-300 text-2xl md:hidden block"
                >
                  {theme === "light" ? (
                    <Image
                      className="h-[50px] w-[70%]"
                      alt="hero"
                      src={light_text_logo}
                    />
                  ) : (
                    <Image
                      className="h-[50px] w-[70%]"
                      alt="hero"
                      src={dark_text_logo}
                    />
                  )}
                </Link>
              </div>
              {/* menu */}
              <div className="hidden menu_area my-1 md:flex justify-between md:justify-center items-center ">
                <div className="mainmenu md:flex items-center gap-[10px]">
                  <div className="flex flex-wrap md:justify-start justify-center items-center gap-[15px] ">
                    {menu_items?.map((item, i) => (
                      <Link
                        className="dark:text-dark_text text-light_text hover:dark:text-dark_primary hover:text-light_primary duration-300 !text-[15px]"
                        key={i}
                        href={item.link}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              {/* action */}
              <div className="action_area md:w-[15%] flex justify-end md:gap-[20px] gap-[5px]">
                <div className="myaccount relative flex flex-col items-center justify-center text-white duration-300 text-light_text hover:text-light_primary dark:text-dark_text dark:hover:text-dark_primary">
                  <FiUser size="20" />
                  <p className="text-[13px] hidden md:block">My Account</p>
                  <div className="user_button bg-light_secondary dark:bg-dark_secondary absolute  z-50 top-[56px] w-[120px] py-[5px] px-[10px] rounded-md ">
                    <ul className="text-center">
                      {role === undefined ? (
                        <>
                          <Link href="signin">
                            <li className="text-light_primary dark:text-dark_bg border-b border-[transparent] hover:border-b hover:border-light_primary dark:hover:border-dark_bg duration-300 py-2">
                              Sign In
                            </li>
                          </Link>
                          <Link href="signup">
                            <li className="text-light_primary dark:text-dark_bg border-b border-[transparent] hover:border-b hover:border-light_primary dark:hover:border-dark_bg  duration-300 py-2">
                              Sign Up
                            </li>
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link href="profile">
                            <li className="text-light_primary dark:text-dark_bg border-b border-[transparent] hover:border-b hover:border-light_primary dark:hover:border-dark_bg duration-300 py-2">
                              My Profile
                            </li>
                          </Link>
                          <a onClick={handleSignout}>
                            <li className="text-light_primary dark:text-dark_bg border-b border-[transparent] hover:border-b hover:border-light_primary dark:hover:border-dark_bg duration-300 py-2">
                              Sign Out
                            </li>
                          </a>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
                <div
                  onClick={() => setOpenSearch(!openSearch)}
                  className="serach flex flex-col items-center justify-center text-white duration-300 text-light_text hover:text-light_primary dark:text-dark_text dark:hover:text-dark_primary"
                >
                  <FiSearch size="20" />
                  <p className="text-[13px] hidden md:block">Search</p>
                </div>
                <div className="block md:hidden">
                  <HiMenuAlt1
                    onClick={() => {
                      setIsOpen(!isOpen);
                    }}
                    className=""
                    size="20"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {isOpen && (
          <div
            style={{ height: `calc(100vh - ${75}px)` }}
            className={`bg-light_secondary dark:bg-dark_secondary z-[990] mobile_menu w-full absolute !text-[20px] ${
              isOpen ? "active" : ""
            } `}
          >
            <RxCross1
              onClick={() => {
                setIsOpen(!isOpen);
              }}
              className="text-light_bg dark:text-dark_primary bg-light_primary dark:bg-dark_bg z-[999] p-1 rounded-full duration-300 absolute hover:text-white top-2 left-2"
              size="24"
            />
            <div className="relative text-white flex justify-center p-[30px] ">
              <div className="menu h-[300px] overflow-y-auto">
                <ul className="text-center">
                  {menu_items?.map((item, i) => (
                    <li
                      key={i}
                      className="mb-3 duration-300 text-light_primary dark:text-dark_bg hover:text-light_text dark:hover:text-dark_text border-b border-transparent hover:border-light_text dark:hover:border-dark_text uppercase"
                    >
                      <Link href={item.link}>{item.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="relative flex justify-center pt-[15px] ">
              {(role === "admin" || role === "super_admin") && (
                <Link
                  className="text-white duration-300 text-light_primary dark:text-dark_bg hover:text-light_text dark:hover:text-dark_text border px-2 dark:border-dark_bg hover:dark:border-dark_text rounded-md text-2xl"
                  href="/"
                >
                  Dashboard
                </Link>
              )}
            </div>
            <div className="relative flex justify-center p-[30px] ">
              <div className="text-white flex justify-center gap-2">
                <ThemeSwitcher />
                <BsFacebook
                  size="24"
                  className="text-white duration-300 text-light_primary dark:text-dark_bg hover:text-light_text dark:hover:text-dark_text"
                />
                <BsPinterest
                  size="24"
                  className="text-white duration-300 text-light_primary dark:text-dark_bg hover:text-light_text dark:hover:text-dark_text"
                />
                <AiFillTwitterCircle
                  size="28"
                  className="text-white duration-300 text-light_primary dark:text-dark_bg hover:text-light_text dark:hover:text-dark_text"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

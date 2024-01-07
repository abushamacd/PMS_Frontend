import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import light_logo from "./../../public/light_logo.png";
import dark_logo from "./../../public/dark_logo.png";

const Footer = () => {
  const { theme, setTheme } = useTheme();
  return (
    <footer className="bg-light_secondary dark:bg-dark_secondary text-dark_bg dark:text-dark_bg">
      <div className="relative mx-auto px-4 py-12">
        <div className="lg:flex lg:items-end lg:justify-between">
          <div>
            <div className="flex justify-center text-teal-600 lg:justify-start">
              <Link
                href="/"
                className="dark:text-dark_primary text-light_primary hover:dark:text-dark_text hover:text-light_text duration-300 text-2xl "
              >
                {theme === "light" ? (
                  <Image
                    className="h-[70px] mx-auto max-w-[200px]"
                    alt="hero"
                    src={light_logo}
                  />
                ) : (
                  <Image
                    className="h-[70px] mx-auto max-w-[200px]"
                    alt="hero"
                    src={dark_logo}
                  />
                )}
              </Link>
              {/* <Link
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
              </Link> */}
            </div>

            <p className="mx-auto mt-6 max-w-md text-center leading-relaxed lg:text-left text-dark_bg dark:text-dark_bg mb-4">
              Since 2020, we have launched 30+ courses about technology field.
              More then 20k+ trust us and give positive feedback. Find your
              desire courses from them.
            </p>
          </div>

          <div className="">
            <div className="flex flex-col gap-2 mb-4 w-full md:justify-start justify-end md:items-end">
              <div className="relative w-full ">
                <input
                  type="text"
                  id="hero-field"
                  name="hero-field"
                  placeholder="Newsletter"
                  className="w-full bg-dark_text dark:text-dark_bg rounded border border-light_primary dark:border-dark_primary focus:ring-2 focus:ring-light_primary dark:focus:ring-dark_primary focus:border-light_primary dark:focus:border-dark_primary text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <button className="text-dark_text dark:text-dark_primary bg-light_primary dark:bg-dark_bg border-0 py-2 px-6  rounded text-lg hover:opacity-80 duration-300">
                Subscribe
              </button>
            </div>
            <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-12">
              <li>
                <a
                  className="text-gray-700 transition hover:text-gray-700/75"
                  href="/"
                >
                  About
                </a>
              </li>

              <li>
                <a
                  className="text-gray-700 transition hover:text-gray-700/75"
                  href="/"
                >
                  Services
                </a>
              </li>

              <li>
                <a
                  className="text-gray-700 transition hover:text-gray-700/75"
                  href="/"
                >
                  Projects
                </a>
              </li>

              <li>
                <a
                  className="text-gray-700 transition hover:text-gray-700/75"
                  href="/"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-12 text-center text-sm ">
          Copyright &copy; {new Date().getFullYear()}. All rights reserved.
          Design and Developed by{" "}
          <Link className="underline italic" href="https://www.imshama.com">
            Abu Shama.
          </Link>
        </p>
      </div>
    </footer>
  );
};
export default Footer;

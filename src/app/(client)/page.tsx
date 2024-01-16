"use client";

import { isLoggedIn } from "@/services/auth.service";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const userLoggedIn = isLoggedIn();

  const router = useRouter();
  return (
    <div className="text-center">
      <h2 className="md:text-7xl text-3xl mb-4 text-light_primary dark:text-dark_primary">
        Welcome to <span className="italic">Infinity</span>
      </h2>
      <p className="text-light_text dark:text-dark_text text-xl">
        Have a good day
      </p>
      <div className="flex justify-center mt-5">
        {userLoggedIn ? (
          <button
            onClick={() => {
              router.push("/dashboard");
            }}
            className="text-dark_text dark:text-dark_bg bg-light_primary dark:bg-dark_primary border-0 py-2 px-6  rounded text-lg hover:opacity-80 duration-300 flex gap-2 items-center"
          >
            Dashboard
          </button>
        ) : (
          <button
            onClick={() => {
              router.push("/signin");
            }}
            className="text-dark_text dark:text-dark_bg bg-light_primary dark:bg-dark_primary border-0 py-2 px-6  rounded text-lg hover:opacity-80 duration-300 flex gap-2 items-center"
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default HomePage;

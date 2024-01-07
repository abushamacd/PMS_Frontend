"use client";

import Loading from "@/app/loading";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const userLoggedIn = isLoggedIn();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //@ts-ignore
  const { role } = getUserInfo();

  useEffect(() => {
    if (!userLoggedIn) {
      router.push("/signin");
    } else {
      if (role === "admin" || role === "super_admin") {
        router.push("/dashboard");
      } else {
        router.push("/profile");
      }
    }
    setIsLoading(true);
  }, [router, userLoggedIn, role, isLoading]);

  if (!isLoading) {
    return <Loading />;
  }
  return <div>{children}</div>;
};

export default ProtectedRoute;

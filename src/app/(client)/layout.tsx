"use client";

import Footer from "@/sections/Footer";
import Header from "@/sections/Header";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="layout">
      <Header />
      <div className={``}>{children}</div>
      <Footer />
    </div>
  );
};

export default ClientLayout;

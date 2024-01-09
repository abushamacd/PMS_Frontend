"use client";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="layout">
      <div className={``}>{children}</div>
    </div>
  );
};

export default ClientLayout;

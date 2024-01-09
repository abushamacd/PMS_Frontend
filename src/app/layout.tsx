import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/lib/ThemeProviders";
import Providers from "@/lib/Providers";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Welcome to Infinity",
  description: "Project management system for organization or small agency",
  keywords: "PMS, Project Management System, project management system.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <body className="mx-auto relative bg-[#ffffff] dark:bg-[#050B2F] layout">
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            {children}
            <Toaster position="top-right" reverseOrder={false} />
          </ThemeProvider>
        </body>
      </html>
    </Providers>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/lib/ThemeProviders";
import Providers from "@/lib/Providers";
import { Toaster } from "react-hot-toast";
import "react-quill/dist/quill.snow.css";

export const metadata: Metadata = {
  title: "Welcome to E-School",
  description: "A online learning platform. Which help to you quality learning",
  keywords:
    "E-Learning, elearning, e-learning, online learning, lms, learning management system, MREN, Web Development ",
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

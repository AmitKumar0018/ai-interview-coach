import "./globals.css";
import Navbar from "@/components/Navbar";
import { Inter, Manrope } from "next/font/google";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata = {
  title: "InterviewAI | AI-powered career preparation",
  description: " InterviewAI | AI-powered career preparation",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} bg-slate-50 text-gray-900`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: "12px",
              padding: "14px",
            },
          }}
        />
      </body>
    </html>
  );
}

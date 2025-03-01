import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "Sarašas",
  description: "Prekiu sarašas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ToastContainer />
        <AuthProvider>
          <div >{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, Noto_Sans_Thai } from "next/font/google";
import "./globals.scss";
import "react-toastify/dist/ReactToastify.css";
import { ReduxProvider } from "@/redux/provider";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });
const Noto_Sans = Noto_Sans_Thai({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "thtrading.net",
  description: "thtrading.net",
  keywords: [
    "thtrading.net",
    "bitkubnek",
    "trade",
    "bitcoin",
    "coin",
    "thailand",
    "best web trade",
    "good website in thailand",
    "money thailand",
    "change money in thailand",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-dark ${Noto_Sans.className}`}>
        <div className="text-white h-screen">
          <ReduxProvider>{children}</ReduxProvider>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
}

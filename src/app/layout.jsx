import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/redux/blogStore";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ziya's Blog",
  description: "Blog Made By Ziya Özgül",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ReduxProvider>
        <body className={inter.className}>
          <Navbar />
          <section>{children}</section>
          <Footer />
        </body>
      </ReduxProvider>
    </html>
  );
}

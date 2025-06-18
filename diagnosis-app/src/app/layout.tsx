import { DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import Banner from "@/components/Layout/Banner";
import { ThemeProvider } from "next-themes";
import ScrollToTop from "@/components/ScrollToTop";
import Aoscompo from "@/utils/aos";
const font = DM_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${font.className} bg-white text-deepSlate dark:bg-darkmode dark:text-grey`}>

        <ThemeProvider
          attribute="class"
          enableSystem={true}
          defaultTheme="light"
        >
          <Aoscompo>
            <Header />
           
            {children}
           
            
            <Footer />
          </Aoscompo>
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}

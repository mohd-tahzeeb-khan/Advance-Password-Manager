import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider} from '@clerk/nextjs'
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer";
import { UserProvider } from "@/context/userContext";
import { Toaster } from "@/components/ui/toaster";
import { dark, shadesOfPurple } from "@clerk/themes";
import Head from "next/head";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "SafePass - Safe your Passwords",
  description: "SafePass is a secure and user-friendly password management application that allows users to store and manage their passwords, UPI IDs, and other sensitive credentials safely in one place. With modern encryption, user authentication, and a clean interface, SafePass ensures your private data stays protected and easily accessible.",
};

export default function RootLayout({ children }) {  //={children:React.ReactNode}
  return (
    <ClerkProvider appearance={{
      baseTheme: dark,
      signIn: { baseTheme: shadesOfPurple },
    }}>
      <UserProvider>
      <html lang="en">
        <body>
        <ThemeProvider
            attribute="class"
            defaultTheme="system">
          
          <Navbar />
          {children}
          <Toaster />
          <Footer />
          </ThemeProvider>
        </body>
      </html>
      </UserProvider>
    </ClerkProvider>
    
  );
}

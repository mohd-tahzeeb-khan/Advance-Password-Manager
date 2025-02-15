import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer";
import { UserProvider } from "@/context/userContext";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }={children:React.ReactNode}) {
  return (
    <ClerkProvider>
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

'use client';
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className="w-full bg-gradient-to-tr to-purple-900 from-blue-900  border-border py-6 md:py-8 transition-colors">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo and Text */}
          <div className="text-center md:text-left">
            <h2 className="text-lg font-bold">SafePass</h2>
            <p className="text-sm text-muted-foreground">Store, Use, Safe Precious Passwords</p>
          </div>

          {/* Social Media Icons */}
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary  hover:scale-110"><FaFacebook size={20} /></a>
            <a href="#" className="hover:text-primary"><FaTwitter size={20} /></a>
            <a href="#" className="hover:text-primary"><FaInstagram size={20} /></a>
            <a href="#" className="hover:text-primary"><FaLinkedin size={20} /></a>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} SafePass. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

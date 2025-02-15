// 'use client'
// import { Moon, MoonStar, Sun } from 'lucide-react'
// import { useTheme } from 'next-themes'
// import React from 'react';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Button } from './ui/button'
// import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/nextjs';
// import { useUserContext } from '@/context/userContext';

// // -----------------------------------------------------------------------------------------------
// const navbar = () => {
//   const { userdata }=useUserContext();
//   const { setTheme } = useTheme();
//   return (
//     <>
//       <nav className='flex justify-between px-8 h-24 bg-yellow-400 items-center backdrop-brightness-50'>
//         <div>
//           <h1 className='font-bold text-2xl text-pretty'><span className='text-gray-600'>S</span>afe<span className='text-gray-600'>P</span>ass</h1>
//           <p>Your <span className='text-slate-500'>P</span>assword Manager</p>

//         </div>
//         <ul className='flex flex-row gap-3 text-xl'>
//           <li>Home</li>
//           <li>About</li>
//           <li>{userdata.name}{userdata.email}</li>
//         </ul>

        
//         <div>
          
//         <SignedOut>
//             <SignInButton />
//           </SignedOut>
//           <SignedIn>
//             <UserButton />
//           </SignedIn>
          
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline" size="icon">
//                 <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
//                 <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
//                 <span className="sr-only">Toggle theme</span>
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <DropdownMenuItem onClick={() => setTheme("light")}>
//                 Light
//               </DropdownMenuItem>
//               <DropdownMenuItem onClick={() => setTheme("dark")}>
//                 Dark
//               </DropdownMenuItem>
//               <DropdownMenuItem onClick={() => setTheme("system")}>
//                 System
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
        
//       </nav>
//     </>
//   )
// }

// export default navbar
"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { useUserContext } from "@/context/userContext";

const Navbar = () => {
  const { userdata } = useUserContext();
  const { setTheme } = useTheme();

  return (
    <nav className="flex justify-between px-8 h-24 bg-yellow-400 items-center backdrop-brightness-50">
      <div>
        <h1 className="font-bold text-2xl text-pretty">
          <span className="text-gray-600">S</span>afe
          <span className="text-gray-600">P</span>ass
        </h1>
        <p>
          Your <span className="text-slate-500">P</span>assword Manager
        </p>
      </div>

      <ul className="flex flex-row gap-3 text-xl">
        <li>Home</li>
        <li>About</li>
        <li>
          {userdata ? `${userdata.name} (${userdata.email})` : "Loading..."}
        </li>
      </ul>

      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;

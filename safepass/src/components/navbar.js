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
import { SignedIn, SignedOut, SignInButton, UserButton, SignUpButton } from "@clerk/nextjs";
import { useUserContext } from "@/context/userContext";

const Navbar = () => {
  const { userdata } = useUserContext();
  const { setTheme } = useTheme();

  return (<>
    {/* // ------------------------------------------------- */}
    <nav className="p-6 flex justify-between items-center bg-gradient-to-tr to-purple-900 from-blue-900 border-b-2">
      <h1 className="text-2xl font-bold">
        <span className="text-slate-300">S</span>afe
        <span className="text-slate-300">P</span>ass
      </h1>
      <div className="flex space-x-4">
      <SignedOut>
          <SignInButton className="bg-accent text-accent-foreground hover:bg-accent/80 py-3 px-6 rounded-lg" />
          <SignUpButton className="bg-accent text-accent-foreground hover:bg-accent/80 py-3 px-6 rounded-lg"  />
        </SignedOut>
        <SignedIn>
          <UserButton showName={true} />
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


    {/* // ------------------------------------------------- */}


    </>
  );
};

export default Navbar;

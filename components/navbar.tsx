import { ActivityIcon } from "lucide-react";
import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";
import HeaderAuth from "@/components/header-auth";

export const Navbar = () => {
  return (
    <nav className="w-full max-w-7xl flex justify-center border-b border-b-foreground/10 min-h-16">
      <div className="w-full flex flex-col  justify-between items-center px-5 text-sm font-semibold">
        <Link href="/" className="flex items-center">
          <ActivityIcon />
          Sensor Analytics
        </Link>

        <div className="flex gap-2 items-center">
          <HeaderAuth />
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
};

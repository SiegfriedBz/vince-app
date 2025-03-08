import { ActivityIcon } from "lucide-react";
import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";
import HeaderAuth from "@/components/header-auth";

export const Navbar = () => {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
        <div className="flex gap-5 items-center font-semibold">
          <Link href="/" className="flex items-center gap-3">
            <ActivityIcon />
            Sensor Analytics
          </Link>
        </div>
        <div className="flex gap-8 items-center">
          <HeaderAuth />
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
};

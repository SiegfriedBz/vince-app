import { ActivityIcon } from "lucide-react";
import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";
import HeaderAuth from "@/components/header-auth";

export const Navbar = () => {
  return (
    <nav className="relative px-4 sm:px-8 w-full max-w-7xl flex justify-between border-b border-b-foreground/10 h-16">
      <Link href="/" className="flex items-center gap-x-2">
        <ActivityIcon />
        <span className="max-[375px]:hidden">Sensor Analytics</span>
      </Link>

      <div className="flex gap-2 items-center">
        <HeaderAuth />
        <ThemeSwitcher />
      </div>
    </nav>
  );
};

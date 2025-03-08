import { ActivityIcon } from "lucide-react";

export default function Header() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <div className="flex gap-8 justify-center items-center">
        <span className="border-l rotate-45 h-6" />
      </div>
      <h1 className="sr-only">
        Solutions intelligentes de surveillance de la qualite de l'eau.
      </h1>
      <div className="flex flex-col items-center gap-6">
        <ActivityIcon size={48} />
        <h2 className="text-4xl lg:text-5xl font-semibold !leading-tight mx-auto max-w-2xl text-center">
          Solutions intelligentes de surveillance de la qualite de l'eau.
        </h2>
      </div>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}

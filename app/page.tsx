import Hero from "@/components/hero";
import { Button } from "@/components/ui/button";
import { ActivityIcon, MoveRightIcon } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <Hero />
      <main className="flex-1 flex flex-col">
        <h2 className="font-medium text-center text-xl">
          Fournisseur leader de solutions innovantes pour la surveillance de
          l'environnement, la gestion de la qualite de l'eau et l'efficacite
          energetique.
        </h2>

        <div className="flex my-4">
          <Button asChild className="ms-auto group">
            <Link
              href="/protected/dashboard"
              className="flex gap-4 items-center"
            >
              <span>Dashboard</span>
              <MoveRightIcon className="group-hover:translate-x-1 transition duration-300" />
            </Link>
          </Button>
        </div>
      </main>
    </>
  );
}

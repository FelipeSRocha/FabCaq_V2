"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  className?: string;
}

const Navbar = ({ className }: NavbarProps) => {
  return (
    <nav className={`sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border ${className || ""}`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/home" className="flex items-center group">
            <h1 className="text-2xl font-bold text-primary group-hover:text-primary/80 transition-colors">
              FabricAqui
            </h1>
          </Link>

          {/* Navigation Items */}
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="default">
                Entrar
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="cta" size="default">
                Cadastrar Empresa
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

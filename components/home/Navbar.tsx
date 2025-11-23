"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { LogOut, User } from "lucide-react";

interface NavbarProps {
  className?: string;
}

const Navbar = ({ className }: NavbarProps) => {
  const { isAuthenticated, user, signOut, isLoading } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/";
  };

  return (
    <nav className={`sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border ${className || ""}`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <h1 className="text-2xl font-bold text-primary group-hover:text-primary/80 transition-colors">
              FabriCaqui
            </h1>
          </Link>

          {/* Navigation Items */}
          <div className="flex items-center gap-4">
            {!isLoading && (
              <>
                <Link href="/register">
                  <Button variant="cta" size="default">
                    Cadastrar Empresa
                  </Button>
                </Link>
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span className="hidden sm:inline">{user?.email}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="default"
                      onClick={handleSignOut}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sair
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <Button variant="ghost" size="default">
                        Entrar
                      </Button>
                    </Link>
                    
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

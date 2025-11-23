"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface HeroProps {
  className?: string;
  onSearch?: (query: string) => void;
}

const Hero = ({ className, onSearch }: HeroProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className={`relative bg-gradient-to-b from-background via-background to-secondary py-20 md:py-32 ${className || ""}`}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight">
            Conecte-se aos melhores fornecedores do Brasil
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            A vitrine digital para pequenas e médias empresas. Simples, rápido e gratuito.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative flex items-center gap-2 bg-background rounded-full shadow-lg border-2 border-border p-2 hover:border-primary transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
              <Input
                type="text"
                placeholder="O que você procura? (Ex: Embalagens, Peças, Serviços)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base bg-transparent"
              />
              <Button 
                variant="cta" 
                size="lg" 
                className="rounded-full"
                onClick={handleSearch}
              >
                <Search className="h-5 w-5" />
                <span className="hidden sm:inline">Buscar</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

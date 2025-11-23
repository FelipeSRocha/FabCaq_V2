"use client";

import { MapPin, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface Company {
  id: number | string;
  name: string;
  category: string;
  location: string;
  logo: string;
  phone?: string;
}

interface RecentCompaniesProps {
  className?: string;
  title?: string;
  subtitle?: string;
  companies?: Company[];
  onCompanyClick?: (company: Company) => void;
  onViewAllClick?: () => void;
}

const defaultCompanies: Company[] = [
  {
    id: 1,
    name: "Embalagens Prime",
    category: "Embalagens & Distribuição",
    location: "São Paulo, SP",
    logo: "EP",
  },
  {
    id: 2,
    name: "TecnoFix Manutenção",
    category: "Serviços Industriais",
    location: "Belo Horizonte, MG",
    logo: "TF",
  },
  {
    id: 3,
    name: "LogFast Transportes",
    category: "Logística",
    location: "Rio de Janeiro, RJ",
    logo: "LF",
  },
];

const RecentCompanies = ({ 
  className,
  title = "Empresas Recém-Cadastradas",
  subtitle = "Conheça alguns dos fornecedores na nossa plataforma",
  companies = defaultCompanies,
  onCompanyClick,
  onViewAllClick
}: RecentCompaniesProps) => {
  const handlePhoneClick = (company: Company) => {
    if (onCompanyClick) {
      onCompanyClick(company);
    }
  };

  return (
    <section className={`py-16 md:py-24 bg-background ${className || ""}`}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {title}
          </h2>
          <p className="text-muted-foreground text-lg">
            {subtitle}
          </p>
        </div>

        {/* Companies Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {companies.map((company) => (
            <Card 
              key={company.id} 
              className="rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border-2 border-border hover:border-primary"
            >
              <CardContent className="p-6 space-y-4">
                {/* Logo Placeholder */}
                <div className="flex items-center justify-center w-20 h-20 mx-auto rounded-full bg-primary text-primary-foreground text-2xl font-bold shadow-lg">
                  {company.logo}
                </div>

                {/* Company Info */}
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-bold text-primary">
                    {company.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {company.category}
                  </p>
                  <div className="flex items-center justify-center gap-1 text-muted-foreground text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>{company.location}</span>
                  </div>
                </div>

                {/* CTA Button */}
                <Button 
                  variant="outline" 
                  className="w-full hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => handlePhoneClick(company)}
                >
                  <Phone className="h-4 w-4" />
                  Ver Telefone
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View More Link */}
        {onViewAllClick && (
          <div className="text-center mt-12">
            <Button 
              variant="cta" 
              size="lg"
              onClick={onViewAllClick}
            >
              Ver Todas as Empresas
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentCompanies;

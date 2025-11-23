"use client";

import { Eye, MessageCircle, CheckCircle, LucideIcon } from "lucide-react";

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface ValuePropositionProps {
  className?: string;
  title?: string;
  features?: Feature[];
}

const defaultFeatures: Feature[] = [
  {
    icon: Eye,
    title: "Vitrine Gratuita",
    description: "Exponha seus produtos e serviços sem custo. Alcance milhares de potenciais clientes.",
  },
  {
    icon: MessageCircle,
    title: "Conexão Direta",
    description: "Integração com WhatsApp para contato imediato. Negocie direto com seus clientes.",
  },
  {
    icon: CheckCircle,
    title: "Sem Burocracia",
    description: "Cadastro simples com CNPJ. Comece a vender em poucos minutos.",
  },
];

const ValueProposition = ({ 
  className,
  title = "Por que escolher FabricAqui?",
  features = defaultFeatures 
}: ValuePropositionProps) => {
  return (
    <section className={`py-16 md:py-24 bg-secondary ${className || ""}`}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {title}
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div 
                key={feature.title} 
                className="text-center space-y-4 group"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary shadow-lg group-hover:bg-accent transition-colors duration-300">
                  <Icon className="h-10 w-10 text-primary-foreground" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-primary">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;

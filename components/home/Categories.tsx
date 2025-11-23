"use client";

import { Factory, Truck, Box, Wrench, Shirt, Package, Hammer, Lightbulb, LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export interface Category {
  name: string;
  icon: LucideIcon;
  slug?: string;
}

interface CategoriesProps {
  className?: string;
  categories?: Category[];
  onCategoryClick?: (category: Category) => void;
}

const defaultCategories: Category[] = [
  { name: "Indústria", icon: Factory, slug: "industria" },
  { name: "Logística", icon: Truck, slug: "logistica" },
  { name: "Embalagens", icon: Box, slug: "embalagens" },
  { name: "Manutenção", icon: Wrench, slug: "manutencao" },
  { name: "Têxtil", icon: Shirt, slug: "textil" },
  { name: "Distribuição", icon: Package, slug: "distribuicao" },
  { name: "Construção", icon: Hammer, slug: "construcao" },
  { name: "Elétrica", icon: Lightbulb, slug: "eletrica" },
];

const Categories = ({ 
  className, 
  categories = defaultCategories,
  onCategoryClick 
}: CategoriesProps) => {
  const handleCategoryClick = (category: Category) => {
    if (onCategoryClick) {
      onCategoryClick(category);
    }
  };

  return (
    <section className={`py-16 md:py-24 bg-background ${className || ""}`}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Explore por Categoria
          </h2>
          <p className="text-muted-foreground text-lg">
            Encontre rapidamente o que sua empresa precisa
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.slug || category.name}
                className="border-2 border-border hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer group rounded-xl"
                onClick={() => handleCategoryClick(category)}
              >
                <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                    <Icon className="h-8 w-8 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-primary text-center group-hover:text-primary/90 transition-colors">
                    {category.name}
                  </h3>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;

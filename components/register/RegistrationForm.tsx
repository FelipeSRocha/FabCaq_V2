"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Mail, Phone, MapPin, Hash, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { FormInput } from "./FormInput";
import { FormTextarea } from "./FormTextarea";

interface CompanyFormData {
  companyName: string;
  cnpj: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  description: string;
}

interface RegistrationFormProps {
  initialEmail: string;
}

const formatCNPJ = (value: string) => {
  const numbers = value.replace(/\D/g, "");
  if (numbers.length <= 14) {
    return numbers
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  }
  return value;
};

const formatZipCode = (value: string) => {
  const numbers = value.replace(/\D/g, "");
  if (numbers.length <= 8) {
    return numbers.replace(/^(\d{5})(\d)/, "$1-$2");
  }
  return value;
};

const formatPhone = (value: string) => {
  const numbers = value.replace(/\D/g, "");
  if (numbers.length <= 11) {
    return numbers
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");
  }
  return value;
};

export const RegistrationForm = ({ initialEmail }: RegistrationFormProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CompanyFormData>({
    companyName: "",
    cnpj: "",
    email: initialEmail,
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    description: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCNPJChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCNPJ(e.target.value);
    setFormData(prev => ({ ...prev, cnpj: formatted }));
  };

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatZipCode(e.target.value);
    setFormData(prev => ({ ...prev, zipCode: formatted }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setFormData(prev => ({ ...prev, phone: formatted }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!formData.companyName || !formData.cnpj || !formData.email) {
        toast({
          title: "Campos obrigatórios",
          description: "Por favor, preencha todos os campos obrigatórios.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      console.log("Form data:", formData);

      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Sua empresa foi registrada. Redirecionando...",
      });

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error("Error registering company:", error);
      toast({
        title: "Erro ao cadastrar empresa",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-2 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl text-primary">Informações da Empresa</CardTitle>
        <CardDescription>
          Todos os campos marcados com * são obrigatórios
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Company Name */}
          <FormInput
            id="companyName"
            name="companyName"
            label="Nome da Empresa"
            placeholder="Ex: Têxtil Brasil Ltda"
            value={formData.companyName}
            onChange={handleInputChange}
            icon={Building2}
            required
          />

          {/* CNPJ */}
          <FormInput
            id="cnpj"
            name="cnpj"
            label="CNPJ"
            placeholder="00.000.000/0000-00"
            value={formData.cnpj}
            onChange={handleCNPJChange}
            icon={Hash}
            required
          />

          {/* Email and Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              id="email"
              name="email"
              label="Email Corporativo"
              type="email"
              placeholder="contato@empresa.com.br"
              value={formData.email}
              onChange={handleInputChange}
              icon={Mail}
              required
            />

            <FormInput
              id="phone"
              name="phone"
              label="Telefone"
              placeholder="(00) 00000-0000"
              value={formData.phone}
              onChange={handlePhoneChange}
              icon={Phone}
              required
            />
          </div>

          {/* Address */}
          <FormInput
            id="address"
            name="address"
            label="Endereço"
            placeholder="Rua, Número, Complemento"
            value={formData.address}
            onChange={handleInputChange}
            icon={MapPin}
            required
          />

          {/* City, State, and Zip Code */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <FormInput
                id="city"
                name="city"
                label="Cidade"
                placeholder="São Paulo"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <FormInput
                id="state"
                name="state"
                label="Estado"
                placeholder="SP"
                value={formData.state}
                onChange={handleInputChange}
                required
              />
              {/* <Label htmlFor="state" className="text-base font-semibold">
                Estado
              </Label>
              <Input
                id="state"
                name="state"
                placeholder="SP"
                maxLength={2}
                value={formData.state}
                onChange={handleInputChange}
                className="h-12 border-2 focus:border-primary uppercase"
              /> */}
            </div>

            <div className="space-y-2">
              <FormInput
                id="zipCode"
                name="zipCode"
                label="CEP"
                placeholder="00000-000"
                value={formData.zipCode}
                onChange={handleInputChange}
                required
              />
              {/* <Label htmlFor="zipCode" className="text-base font-semibold">
                CEP
              </Label>
              <Input
                id="zipCode"
                name="zipCode"
                placeholder="00000-000"
                value={formData.zipCode}
                onChange={handleZipCodeChange}
                className="h-12 border-2 focus:border-primary"
              /> */}
            </div>
          </div>

          {/* Description */}
          <FormTextarea
            id="description"
            name="description"
            label="Descrição da Empresa"
            placeholder="Conte-nos sobre sua empresa, produtos e serviços..."
            value={formData.description}
            onChange={handleInputChange}
            icon={FileText}
          />

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              size="lg"
              className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Cadastrando...
                </>
              ) : (
                "Cadastrar Empresa"
              )}
            </Button>
          </div>

          {/* Terms */}
          <p className="text-center text-sm text-muted-foreground">
            Ao cadastrar sua empresa, você concorda com nossos{" "}
            <a href="#" className="text-primary hover:underline">
              Termos de Serviço
            </a>{" "}
            e{" "}
            <a href="#" className="text-primary hover:underline">
              Política de Privacidade
            </a>
            .
          </p>
        </form>
      </CardContent>
    </Card>
  );
};
import { Building2 } from "lucide-react";

interface RegistrationHeaderProps {
  userEmail: string;
}

export const RegistrationHeader = ({ userEmail }: RegistrationHeaderProps) => {
  return (
    <div className="text-center mb-8">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <Building2 className="h-8 w-8 text-primary" />
      </div>
      <h1 className="text-4xl font-bold text-primary mb-2">
        Cadastro de Empresa
      </h1>
      <p className="text-muted-foreground text-lg">
        Preencha os dados da sua empresa para começar a vender no FabricAqui
      </p>
      <p className="text-sm text-muted-foreground mt-2">
        Logado como: <span className="font-medium text-foreground">{userEmail}</span>
      </p>
    </div>
  );
};
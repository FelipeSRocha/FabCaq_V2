import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Chrome, Building2 } from "lucide-react";

interface LoginPromptProps {
  onGoogleLogin: () => void;
  onMicrosoftLogin: () => void;
  isLoading: boolean;
}

export const LoginPrompt = ({
  onGoogleLogin,
  onMicrosoftLogin,
  isLoading,
}: LoginPromptProps) => {
  return (
    <Card className="w-full max-w-md border-2 shadow-lg">
      <CardHeader className="space-y-1 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Building2 className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-3xl font-bold text-primary">
          Cadastre sua Empresa
        </CardTitle>
        <CardDescription className="text-base">
          Para cadastrar sua empresa no FabricAqui, você precisa fazer login primeiro
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          variant="outline"
          size="lg"
          className="w-full hover:bg-primary/5 hover:border-primary transition-all"
          onClick={onGoogleLogin}
          disabled={isLoading}
        >
          <Chrome className="mr-2 h-5 w-5" />
          Entrar com Google
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="w-full hover:bg-primary/5 hover:border-primary transition-all"
          onClick={onMicrosoftLogin}
          disabled={isLoading}
        >
          <svg
            className="mr-2 h-5 w-5"
            viewBox="0 0 23 23"
            fill="currentColor"
          >
            <path d="M0 0h10.931v10.931H0zM12.069 0H23v10.931H12.069zM0 12.069h10.931V23H0zM12.069 12.069H23V23H12.069z" />
          </svg>
          Entrar com Microsoft
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          Ao continuar, você concorda com nossos Termos de Serviço e Política de Privacidade.
        </p>
      </CardContent>
    </Card>
  );
};
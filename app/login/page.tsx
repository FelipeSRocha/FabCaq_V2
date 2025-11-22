"use client";

import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Chrome, UserCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const handleOAuthLogin = async (provider: "google" | "azure") => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.error("Error during OAuth login:", error);
        alert("Erro ao fazer login. Tente novamente.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Erro ao fazer login. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold">
            FabCaq Marketplace
          </CardTitle>
          <CardDescription className="text-base">
            Entre com sua conta para acessar o marketplace B2B
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => handleOAuthLogin("google")}
            disabled={isLoading}
          >
            <Chrome className="mr-2 h-5 w-5" />
            Entrar com Google
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => handleOAuthLogin("azure")}
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
            Ao continuar, você concorda com nossos Termos de Serviço e Política
            de Privacidade.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
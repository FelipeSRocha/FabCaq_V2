"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import Navbar from "@/components/home/Navbar";
import { LoginPrompt } from "@/components/register/LoginPrompt";
import { RegistrationHeader } from "@/components/register/RegistrationHeader";
import { RegistrationForm } from "@/components/register/RegistrationForm";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { user, isLoading: isCheckingAuth, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const supabase = createClient();

  const handleOAuthLogin = async (provider: "google" | "azure") => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=/register`,
        },
      });

      if (error) {
        console.error("Error during OAuth login:", error);
        toast({
          title: "Erro ao fazer login",
          description: "Tente novamente.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Erro ao fazer login",
        description: "Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex min-h-[calc(100vh-80px)] items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Verificando autenticação...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex min-h-[calc(100vh-80px)] items-center justify-center p-4">
          <LoginPrompt
            onGoogleLogin={() => handleOAuthLogin("google")}
            onMicrosoftLogin={() => handleOAuthLogin("azure")}
            isLoading={isLoading}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <RegistrationHeader userEmail={user?.email || ""} />
          <RegistrationForm initialEmail={user?.email || ""} />
        </div>
      </div>
    </div>
  );
}
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogOut } from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            Dashboard - FabCaq Marketplace
          </CardTitle>
          <CardDescription>
            Bem-vindo ao marketplace B2B de fornecedores
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm font-medium text-muted-foreground">
              Usuário conectado:
            </p>
            <p className="text-lg font-semibold">{user.email}</p>
          </div>

          <div className="rounded-lg border bg-muted/50 p-4">
            <p className="text-sm text-muted-foreground">
              🎉 Autenticação configurada com sucesso!
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Próximos passos: Implementar funcionalidades do marketplace.
            </p>
          </div>

          <form action="/auth/signout" method="post" className="w-full">
            <Button
              type="submit"
              variant="outline"
              size="lg"
              className="w-full"
            >
              <LogOut className="mr-2 h-5 w-5" />
              Sair
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
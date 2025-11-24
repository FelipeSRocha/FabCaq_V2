"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export interface CompanyData {
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

export interface ActionResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

export async function createCompany(companyData: CompanyData): Promise<ActionResponse> {
  try {
    const supabase = await createClient();

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        success: false,
        message: "Usuário não autenticado",
        error: authError?.message || "User not found",
      };
    }

    // Validate required fields
    if (!companyData.companyName || !companyData.cnpj || !companyData.email) {
      return {
        success: false,
        message: "Campos obrigatórios não preenchidos",
        error: "Missing required fields",
      };
    }

    // Remove formatting from CNPJ for storage
    const cleanCnpj = companyData.cnpj.replace(/\D/g, "");

    // Insert company data
    const { data, error } = await supabase
      .from("companies")
      .insert({
        owners: user.id,
        company_name: companyData.companyName,
        cnpj: cleanCnpj,
        email: companyData.email,
        phone: companyData.phone,
        address: companyData.address,
        city: companyData.city,
        state: companyData.state,
        zip_code: companyData.zipCode.replace(/\D/g, ""),
        description: companyData.description,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating company:", error);
      return {
        success: false,
        message: "Erro ao cadastrar empresa",
        error: error.message,
      };
    }

    // Revalidate paths that might display company data
    revalidatePath("/");
    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Empresa cadastrada com sucesso!",
      data,
    };
  } catch (error) {
    console.error("Unexpected error:", error);
    return {
      success: false,
      message: "Erro inesperado ao cadastrar empresa",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function getCompany(companyId: string): Promise<ActionResponse> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("companies")
      .select("*")
      .eq("id", companyId)
      .single();

    if (error) {
      return {
        success: false,
        message: "Erro ao buscar empresa",
        error: error.message,
      };
    }

    return {
      success: true,
      message: "Empresa encontrada",
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: "Erro inesperado ao buscar empresa",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function updateCompany(
  companyId: string,
  companyData: Partial<CompanyData>
): Promise<ActionResponse> {
  try {
    const supabase = await createClient();

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        success: false,
        message: "Usuário não autenticado",
        error: authError?.message || "User not found",
      };
    }

    // Prepare update data
    const updateData: any = {
      updated_at: new Date().toISOString(),
    };

    if (companyData.companyName) updateData.company_name = companyData.companyName;
    if (companyData.cnpj) updateData.cnpj = companyData.cnpj.replace(/\D/g, "");
    if (companyData.email) updateData.email = companyData.email;
    if (companyData.phone) updateData.phone = companyData.phone;
    if (companyData.address) updateData.address = companyData.address;
    if (companyData.city) updateData.city = companyData.city;
    if (companyData.state) updateData.state = companyData.state;
    if (companyData.zipCode) updateData.zip_code = companyData.zipCode.replace(/\D/g, "");
    if (companyData.description !== undefined) updateData.description = companyData.description;

    // Update company data
    const { data, error } = await supabase
      .from("companies")
      .update(updateData)
      .eq("id", companyId)
      .eq("owners", user.id) // Ensure user owns the company
      .select()
      .single();

    if (error) {
      return {
        success: false,
        message: "Erro ao atualizar empresa",
        error: error.message,
      };
    }

    // Revalidate paths
    revalidatePath("/");
    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Empresa atualizada com sucesso!",
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: "Erro inesperado ao atualizar empresa",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function deleteCompany(companyId: string): Promise<ActionResponse> {
  try {
    const supabase = await createClient();

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        success: false,
        message: "Usuário não autenticado",
        error: authError?.message || "User not found",
      };
    }

    // Delete company
    const { error } = await supabase
      .from("companies")
      .delete()
      .eq("id", companyId)
      .eq("owners", user.id); // Ensure user owns the company

    if (error) {
      return {
        success: false,
        message: "Erro ao deletar empresa",
        error: error.message,
      };
    }

    // Revalidate paths
    revalidatePath("/");
    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Empresa deletada com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      message: "Erro inesperado ao deletar empresa",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function getUserCompanies(): Promise<ActionResponse> {
  try {
    const supabase = await createClient();

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        success: false,
        message: "Usuário não autenticado",
        error: authError?.message || "User not found",
      };
    }

    // Get all companies for the user
    const { data, error } = await supabase
      .from("companies")
      .select("*")
      .eq("owners", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      return {
        success: false,
        message: "Erro ao buscar empresas",
        error: error.message,
      };
    }

    return {
      success: true,
      message: "Empresas encontradas",
      data: data || [],
    };
  } catch (error) {
    return {
      success: false,
      message: "Erro inesperado ao buscar empresas",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
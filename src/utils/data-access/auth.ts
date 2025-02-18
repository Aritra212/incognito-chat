"use server";

import { ILogin } from "@/components/forms/schemas/login-form-schema";
import { IRegister } from "@/components/forms/schemas/register-form-schema";
import { env } from "@/lib/env";
import { createClient } from "@/utils/supabase/server";
import { LogoutProps } from "@/common/common.interface";
import { redirect } from "next/navigation";
import { cache } from "react";

export const register = async (formData: IRegister) => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        name: formData.name,
        userName: formData.username,
      },
      emailRedirectTo: env.META_URL,
    },
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
};

export const login = async (formData: ILogin) => {
  const supabase = await createClient();

  const {
    error,
    data: { session },
  } = await supabase.auth.signInWithPassword(formData);
  if (error || !session)
    return { error: error?.message ?? "Invalid login credentials" };

  return { success: true };
};

export const logout = async ({ noredirect = false }: LogoutProps) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  await supabase
    .from("notifications")
    .update({ is_active: false })
    .eq("user_id", user?.id);

  const { error } = await supabase.auth.signOut();

  if (error) return { error: error.message };

  if (!noredirect) redirect("/login");
};

export const getCurrentUserCache = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return redirect("/login");
  return user;
};

export const getCurrentUser = cache(getCurrentUserCache);

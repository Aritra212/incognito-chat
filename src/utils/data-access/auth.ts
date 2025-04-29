"use server";

import { ILogin } from "@/components/forms/schemas/login-form-schema";
import { IRegister } from "@/components/forms/schemas/register-form-schema";
import { env } from "@/lib/env";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { cache } from "react";
import { User } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

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

export const logout = async () => {
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
  return { success: true };
};

export const getCurrentUserCache = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return redirect("/login");

  return user as User;
};

export const getCurrentUser = cache(getCurrentUserCache);

export async function updateOwnPassword(password: string) {
  const supabase = await createClient();

  const user = await supabase.auth.getUser();

  if (!user) return { error: "User not found" };

  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) return { error: error.message };

  revalidatePath("/settings");

  return {
    success: "Password updated successfully",
  };
}

export const redirectIfSession = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) return redirect("/");

  return;
};

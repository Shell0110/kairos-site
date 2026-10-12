"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, checkPassword, createSessionToken, isAdminConfigured } from "@/lib/admin/auth";

export type LoginState = { error?: "wrongPassword" | "notConfigured" };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  if (!isAdminConfigured()) return { error: "notConfigured" };

  if (!checkPassword(String(formData.get("password") ?? ""))) {
    // Petit délai pour ralentir les tentatives de mot de passe en rafale
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { error: "wrongPassword" };
  }

  const { token, maxAge } = createSessionToken();
  (await cookies()).set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/admin",
    maxAge,
  });
  redirect("/admin");
}

export async function logout() {
  (await cookies()).delete({ name: ADMIN_COOKIE, path: "/admin" });
  redirect("/admin");
}

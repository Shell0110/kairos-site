import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Session admin minimaliste : un cookie signé (HMAC) avec une date d'expiration.
 * La clé de signature est ADMIN_PASSWORD : changer le mot de passe déconnecte toutes les sessions.
 */
export const ADMIN_COOKIE = "kairos_admin";
const SESSION_DAYS = 7;

function password() {
  return process.env.ADMIN_PASSWORD ?? "";
}

export function isAdminConfigured() {
  return password().length > 0;
}

function sign(payload: string) {
  return createHmac("sha256", password()).update(`kairos-admin:${payload}`).digest("hex");
}

function safeEqual(a: string, b: string) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
}

/** Vérifie le mot de passe saisi (comparaison à temps constant). */
export function checkPassword(input: string) {
  return isAdminConfigured() && safeEqual(input, password());
}

export function createSessionToken() {
  const expiresAt = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
  return { token: `${expiresAt}.${sign(String(expiresAt))}`, maxAge: SESSION_DAYS * 24 * 60 * 60 };
}

function isValidToken(token: string | undefined) {
  if (!token || !isAdminConfigured()) return false;
  const [expiresAt, signature] = token.split(".");
  if (!expiresAt || !signature || Number(expiresAt) < Date.now()) return false;
  return safeEqual(signature, sign(expiresAt));
}

/** true si la requête en cours vient d'un admin connecté. */
export async function isAdmin() {
  const store = await cookies();
  return isValidToken(store.get(ADMIN_COOKIE)?.value);
}

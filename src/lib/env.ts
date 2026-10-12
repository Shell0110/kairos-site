import "server-only";

/** Lit une variable d'environnement obligatoire côté serveur (erreur claire si elle manque). */
export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Variable d'environnement manquante : ${name} (voir .env.example)`);
  }
  return value;
}

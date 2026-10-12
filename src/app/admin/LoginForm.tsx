"use client";

import { useActionState } from "react";
import { getDictionary } from "@/i18n";
import { login, type LoginState } from "./actions";

const t = getDictionary().admin;

export function LoginForm() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(login, {});

  return (
    <form action={formAction} className="card card-border mx-auto w-full max-w-sm bg-base-100">
      <div className="card-body">
        <h1 className="card-title font-display text-xl">{t.loginTitle}</h1>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">
            <label htmlFor="password">{t.passwordLabel}</label>
          </legend>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            autoFocus
            className={`input w-full ${state.error === "wrongPassword" ? "input-error" : ""}`}
          />
        </fieldset>
        {state.error && (
          <p role="alert" className="text-sm text-error">
            {t[state.error]}
          </p>
        )}
        <button type="submit" disabled={pending} className="btn btn-neutral mt-2">
          {pending ? t.loggingIn : t.login}
        </button>
      </div>
    </form>
  );
}

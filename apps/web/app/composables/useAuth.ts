import type { AuthSessionToken } from "@accounting/types";
import {
  AUTH_SESSION_COOKIE_NAME,
  AUTH_SESSION_MAX_AGE_SEC,
} from "@accounting/utils";

/**
 * Vue/Nuxt composable: tarayici cookie + yonlendirme icin Vue/Nuxt API'leri gerekir;
 * bu yuzden apps/web icinde kalir. Sabitler ve tipler @accounting/* paketlerindedir.
 */
export function useAuth() {
  const session = useCookie<AuthSessionToken>(AUTH_SESSION_COOKIE_NAME, {
    default: () => null,
    maxAge: AUTH_SESSION_MAX_AGE_SEC,
    sameSite: "lax",
    path: "/",
    secure: import.meta.env.PROD,
  });

  const isLoggedIn = computed(() => Boolean(session.value));

  function login() {
    session.value = "session";
  }

  function logout() {
    session.value = null;
  }

  return { session, isLoggedIn, login, logout };
}

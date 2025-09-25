"use client";

import React, { ReactNode, createContext, useCallback, useContext, useMemo } from "react";
import type { SessionUser } from "@/lib/authTypes";

type AuthContextValue = {
  user: SessionUser | null;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
  user: SessionUser | null;
};

export function AuthProvider({ children, user }: AuthProviderProps) {
  const logout = useCallback(() => {
    if (typeof window !== "undefined") {
      window.location.href = "/logout";
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, logout }),
    [logout, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}

export default AuthContext;

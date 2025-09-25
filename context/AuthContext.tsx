"use client";

import React, { createContext, useContext } from "react";

type SessionUser = {
  id: string;
  email: string;
  name: string | null;
  role?: any;
  type?: string;
};

type AuthContextValue = {
  user: SessionUser | null;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children, user }: { children: React.ReactNode; user: SessionUser | null }) {
  // Minimal logout that just navigates to server action; components may call a client action.
  const logout = () => {
    // navigate to /api/logout or call server action - keep minimal here
    // We trigger a full redirect to / which will clear session via server action if used.
    if (typeof window !== "undefined") {
      window.location.href = "/logout";
    }
  };

  return <AuthContext.Provider value={{ user, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}

export default AuthContext;

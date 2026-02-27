import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export type AuthUser = {
  id: string;
  email: string;
  displayName: string;
  avatar?: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (payload: { user: AuthUser; token: string }) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = useCallback((payload: { user: AuthUser; token: string }) => {
    console.log("[AuthContext] login called with:", payload);
    setUser(payload.user);
    setToken(payload.token);
  }, []);

  const logout = useCallback(() => {
    console.log("[AuthContext] logout called");
    setUser(null);
    setToken(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: !!user && !!token,
      login,
      logout,
    }),
    [user, token, login, logout]
  );

  console.log("[AuthContext] render, state:", { user, hasToken: !!token });

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}


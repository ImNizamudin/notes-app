import { create } from "zustand";
import apiClient from "../api/client";

interface UserInfo {
  id?: string | number;
  username?: string;
  fullname?: string;
  [k: string]: any;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: UserInfo | null;
  loading: boolean;
  error: string | null;

  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  loadFromStorage: () => void;
  setUser: (user: UserInfo) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: localStorage.getItem("ACCESS_TOKEN"),
  refreshToken: localStorage.getItem("REFRESH_TOKEN"),
  user: localStorage.getItem("USER")
    ? JSON.parse(localStorage.getItem("USER")!)
    : null,
  loading: false,
  error: null,

  loadFromStorage() {
    set({
      accessToken: localStorage.getItem("ACCESS_TOKEN"),
      refreshToken: localStorage.getItem("REFRESH_TOKEN"),
      user: localStorage.getItem("USER")
        ? JSON.parse(localStorage.getItem("USER")!)
        : null,
    });
  },

  setUser(user) {
    localStorage.setItem("USER", JSON.stringify(user));
    set({ user });
  },

  async login(email, password) {
    set({ loading: true, error: null });
    try {
      const data: any = await apiClient("/auths/login", "POST", {
        email,
        password,
      });

      const accessToken = data?.accessToken ?? data?.access_token ?? null;
      const refreshToken = data?.refreshToken ?? data?.refresh_token ?? null;

      if (!accessToken) {
        const errorMessage = data?.meta?.message || "Login failed: No access token";
        throw new Error(errorMessage);
      }

      localStorage.setItem("ACCESS_TOKEN", accessToken);
      if (refreshToken) localStorage.setItem("REFRESH_TOKEN", refreshToken);

      const userData = data.user ? data.user : { email };

      set({ accessToken, refreshToken, loading: false, user: userData, error: null });
    } catch (err: any) {
      let errorMessage = "Login failed";

      if (err.response) {
        errorMessage = err.response.meta?.message || errorMessage;
      } else if (err.message) {
        errorMessage = err.message;
      }

      set({ error: errorMessage, loading: false });
      throw err;
    }
  },

  logout() {
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("REFRESH_TOKEN");
    localStorage.removeItem("USER");
    set({ accessToken: null, refreshToken: null, user: null });
  },
}));

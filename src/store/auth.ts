// src/store/auth.ts
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

  async login(username, password) {
    set({ loading: true, error: null });
    try {
      const data: any = await apiClient("/authentications", "POST", {
        username,
        password,
      });
      const accessToken = data?.accessToken ?? data?.access_token ?? null;
      const refreshToken = data?.refreshToken ?? data?.refresh_token ?? null;

      if (!accessToken) throw new Error("Access token not found");

      localStorage.setItem("ACCESS_TOKEN", accessToken);
      if (refreshToken) localStorage.setItem("REFRESH_TOKEN", refreshToken);

      set({ accessToken, refreshToken, loading: false, user: { username } });
    } catch (err: any) {
      set({ error: err.message || "Login failed", loading: false });
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

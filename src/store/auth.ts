import { create } from "zustand";
import apiClient from "../api/client";

interface UserInfo {
  id?: string | number;
  username?: string;
  fullname?: string;
  email?: string;
  created_at?: string;
  updated_at?: string;
  email_verified_at?: string;
  province_id?: number | null;
  city_id?: number | null;
  [k: string]: any;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: UserInfo | null;
  loading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullname: string) => Promise<{ success: boolean; message: any; data: any; }>;
  logout: () => void;
  loadFromStorage: () => void;
  setUser: (user: UserInfo) => void;
  fetchUserProfile: () => Promise<void>;
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
      localStorage.setItem("USER", JSON.stringify(userData));
      localStorage.removeItem("USER_EMAIL");

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

  async register(email, password, fullname) {
    set({ loading: true, error: null });
    try {
      const data: any = await apiClient("/auths/register", "POST", {
        email,
        password,
        fullname
      });

      // Handle response dari register
      // Biasanya register tidak langsung login, jadi tidak set token di sini
      const successMessage = data?.meta?.message || "Registration successful";
      
      set({ loading: false, error: null });
      
      // Return data untuk bisa digunakan di component
      return { success: true, message: successMessage, data };
    } catch (err: any) {
      let errorMessage = "Registration failed";

      if (err.response) {
        errorMessage = err.response.meta?.message || errorMessage;
      } else if (err.message) {
        errorMessage = err.message;
      }

      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  async logout() {
    await apiClient("/auths/logout", "DELETE")

    // Hapus semua item localStorage terkait auth
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("REFRESH_TOKEN");
    localStorage.removeItem("USER");
    localStorage.removeItem("USER_EMAIL");
      
    // Reset state ke null
    set({ 
      accessToken: null, 
      refreshToken: null, 
      user: null,
      error: null,
      loading: false 
    });

      
    // Redirect ke halaman login setelah logout
    if (window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
    
  },

  async fetchUserProfile() {
    set({ loading: true, error: null });
    try {
      const data:any = await apiClient("/auths/get_me", "GET");

      const userData = data.auth ? data.auth : null;

      if (!userData) {
        throw new Error("User data not found in response");
      }

      localStorage.setItem("USER", JSON.stringify(userData));
      set({ user: userData, loading: false, error: null });
    } catch (err: any) {
      console.error("Error fetching user profile:", err);
      
      // Jika error 401 (Unauthorized), logout user
      if (err.response?.status === 401 || err.message?.includes("Unauthorized")) {
        useAuthStore.getState().logout();
      } else {
        set({ loading: false, error: err.message || "Failed to fetch user profile" });
      }
    }
  },
}));
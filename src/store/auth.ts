import { create } from "zustand";
import apiClient from "../api/client";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseConfig, urlBackend } from "../../env.firebase-fe";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

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
  oauthLoading: boolean;
  oauthError: string | null;
  refreshInterval?: NodeJS.Timeout | null;
  loginTimestamp: string | null;

  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullname: string) => Promise<{ success: boolean; message: any; data: any; }>;
  loginWithGoogle: () => Promise<void>;
  registerWithGoogle: () => Promise<void>;
  logout: () => void;
  loadFromStorage: () => void;
  setUser: (user: UserInfo) => void;
  fetchUserProfile: () => Promise<void>;
  clearOAuthError: () => void;
  handleOAuthResponse: (data: any) => Promise<void>;
  handleOAuthRegisterResponse: (data: any) => Promise<void>;
  getOAuthErrorMessage: (error: any) => string;
  startAutoRefresh: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: localStorage.getItem("ACCESS_TOKEN"),
  refreshToken: localStorage.getItem("REFRESH_TOKEN"),
  user: localStorage.getItem("USER")
    ? JSON.parse(localStorage.getItem("USER")!)
    : null,
  loading: false,
  error: null,
  oauthLoading: false,
  oauthError: null,
  loginTimestamp: localStorage.getItem("LOGIN_TIMESTAMP"),
  refreshInterval: null,

  loadFromStorage() {
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    const refreshToken = localStorage.getItem("REFRESH_TOKEN");
    const user = localStorage.getItem("USER");
    const loginTimestamp = localStorage.getItem("LOGIN_TIMESTAMP");

    console.log("Loading from storage:", {
      hasAccessToken: !!accessToken,
      hasRefreshToken: !!refreshToken,
      hasUser: !!user,
      loginTimestamp
    });

    set({
      accessToken,
      refreshToken,
      user: user ? JSON.parse(user) : null,
      loginTimestamp,
    });
  },

  setUser(user) {
    localStorage.setItem("USER", JSON.stringify(user));
    set({ user });
  },

  setLoginTimestamp(timestamp: string) {
    localStorage.setItem("LOGIN_TIMESTAMP", timestamp);
    set({ loginTimestamp: timestamp });
    console.log("Login timestamp set:", timestamp);
  },

  clearOAuthError() {
    set({ oauthError: null });
  },

  async loginWithGoogle() {
    set({ oauthLoading: true, oauthError: null });
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope('email');
      provider.addScope('profile');
      auth.useDeviceLanguage();

      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      // console.log("Google OAuth successful, ID Token:", idToken);

      const response = await fetch(`${urlBackend}/auths/login/oauth2`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${idToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idToken: idToken })
      });

      if (response.ok) {
        const data = await response.json();
        await get().handleOAuthResponse(data);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || errorData.meta?.message || 'Failed to login with backend');
      }

    } catch (error: any) {
      console.error("Google OAuth login error:", error);
      const errorMessage = get().getOAuthErrorMessage(error);
      set({ oauthError: errorMessage, oauthLoading: false });
      throw error;
    }
  },

  async registerWithGoogle() {
    set({ oauthLoading: true, oauthError: null });
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope('email');
      provider.addScope('profile');
      auth.useDeviceLanguage();

      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      const user = result.user;

      const userData: UserInfo = {
        email: user.email ?? undefined,
        fullname: user.displayName ?? undefined,
        photoURL: user.photoURL ?? undefined
      };

      set({
        user: userData
      })


      // console.log("Google OAuth successful, ID Token:", idToken);

      const response = await fetch(`${urlBackend}/auths/register/oauth2`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${idToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idToken: idToken })
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Backend register response:", data);
        
        await get().handleOAuthRegisterResponse(data);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || errorData.meta?.message || 'Failed to register with backend');
      }

    } catch (error: any) {
      console.error("Google OAuth register error:", error);
      const errorMessage = get().getOAuthErrorMessage(error);
      set({ oauthError: errorMessage, oauthLoading: false });
      throw error;
    }
  },

  async handleOAuthResponse(data: any) {
    if (data.data) {
      const accessToken = data.data.access_token ?? data.data.accessToken ?? data.access_token ?? data.accessToken;
      const refreshToken = data.data.refresh_token ?? data.data.refreshToken ?? data.refresh_token ?? data.refreshToken;

      if (accessToken) {
        localStorage.setItem("ACCESS_TOKEN", accessToken);
        if (refreshToken) {
          localStorage.setItem("REFRESH_TOKEN", refreshToken);
        }

        const userData = data.data.user || data.user || {
          email: data.data.email,
          fullname: data.data.fullname
        };

        console.log(data)

        localStorage.setItem("USER", JSON.stringify(userData));

        // Set login timestamp
        const timestamp = new Date().toISOString();
        localStorage.setItem("LOGIN_TIMESTAMP", timestamp);

        set({ 
          accessToken, 
          refreshToken: refreshToken || null,
          // user: userData,
          loginTimestamp: timestamp,
          loading: false,
          oauthLoading: false,
          error: null,
          oauthError: null 
        });

        // Start token refresh system jika ada refresh token
        if (refreshToken) {
          get().startAutoRefresh();
        }
      }
    } else {
      throw new Error('Invalid response format from backend');
    }
  },

  async handleOAuthRegisterResponse(data: any) {
    if (data.data && data.data.auth_oauth2) {
      const oauthData = data.data.auth_oauth2;
      const claims = oauthData.claims;
      
      const userData = {
        id: claims.user_id,
        email: claims.email,
        fullname: claims.name,
        email_verified: claims.email_verified,
        picture: claims.picture,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      console.log("Processed user data:", userData);

      localStorage.setItem("USER", JSON.stringify(userData));
      localStorage.setItem("ACCESS_TOKEN", oauthData.id_token);
      localStorage.removeItem("REFRESH_TOKEN");

      // Set login timestamp untuk OAuth juga
      const timestamp = new Date().toISOString();
      localStorage.setItem("LOGIN_TIMESTAMP", timestamp);

      set({ 
        accessToken: oauthData.id_token,
        refreshToken: null,
        user: userData,
        loginTimestamp: timestamp,
        loading: false,
        oauthLoading: false,
        error: null,
        oauthError: null
      });

      // Untuk OAuth, tidak perlu start token refresh karena tidak ada refresh token
      console.log("OAuth login successful, no token refresh needed");

    } else {
      throw new Error('Invalid response format from backend');
    }
  },

  getOAuthErrorMessage(error: any): string {
    if (error.code === 'auth/popup-closed-by-user') {
      return 'Popup login ditutup oleh pengguna';
    } else if (error.code === 'auth/popup-blocked') {
      return 'Popup diblokir oleh browser. Izinkan popup untuk situs ini.';
    } else if (error.code === 'auth/cancelled-popup-request') {
      return 'Permintaan login dibatalkan';
    } else if (error.code === 'auth/account-exists-with-different-credential') {
      return 'Akun sudah terdaftar dengan metode login yang berbeda';
    } else {
      return error.message || 'Terjadi kesalahan saat login dengan Google';
    }
  },

  async login(email, password) {
    set({ loading: true, error: null });
    try {
      const data: any = await apiClient("/auths/login", "POST", {
        email,
        password,
      });

      // PERBAIKAN: handle berbagai format response
      const accessToken = data?.access_token ?? data?.accessToken ?? data?.data?.access_token ?? null;
      const refreshToken = data?.refresh_token ?? data?.refreshToken ?? data?.data?.refresh_token ?? null;

      if (!accessToken) {
        const errorMessage = data?.meta?.message || "Login failed: No access token";
        throw new Error(errorMessage);
      }

      localStorage.setItem("ACCESS_TOKEN", accessToken);
      if (refreshToken) {
        localStorage.setItem("REFRESH_TOKEN", refreshToken);
      }

      const timestamp = new Date().toISOString();
      localStorage.setItem("LOGIN_TIMESTAMP", timestamp);

      const userData = data.user ?? data.data?.user ?? { email };
      localStorage.setItem("USER", JSON.stringify(userData));
      localStorage.removeItem("USER_EMAIL");

      set({ 
        accessToken, 
        refreshToken, 
        loginTimestamp: timestamp,
        loading: false, 
        user: userData, 
        error: null 
      });

      get().startAutoRefresh();

    } catch (err: any) {
      console.error("Login error:", err);
      
      let errorMessage = "Login failed";
      if (err.response) {
        errorMessage = err.response.meta?.message || err.response.data?.message || errorMessage;
        console.error("Login error response:", err.response);
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

      const successMessage = data?.meta?.message || "Registration successful";
      
      set({ loading: false, error: null });
      
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
    try {
      await apiClient("/auths/logout", "DELETE");
    } catch (error) {
      console.error("Error during logout API call:", error);
    }

    // Hapus semua data dari localStorage
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("REFRESH_TOKEN");
    localStorage.removeItem("USER");
    localStorage.removeItem("USER_EMAIL");
    localStorage.removeItem("LOGIN_TIMESTAMP");
      
    set({ 
      accessToken: null, 
      refreshToken: null, 
      user: null,
      loginTimestamp: null,
      error: null,
      loading: false,
      oauthError: null,
      oauthLoading: false
    });

    console.log("Logged out successfully");

    if (window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
  },

  async fetchUserProfile() {
    set({ loading: true, error: null });
    try {
      const data:any = await apiClient("/auths/get_me", "GET");

      const userData = data.auth ?? data.data?.auth ?? null;

      if (!userData) {
        throw new Error("User data not found in response");
      }

      localStorage.setItem("USER", JSON.stringify(userData));
      set({ user: userData, loading: false, error: null });
    } catch (err: any) {
      console.error("Error fetching user profile:", err);
      
      if (err.response?.status === 401 || err.message?.includes("Unauthorized")) {
        get().logout();
      } else {
        set({ loading: false, error: err.message || "Failed to fetch user profile" });
      }
    }
  },

  startAutoRefresh() {
    // Hentikan interval sebelumnya jika ada
    const existingInterval = (window as any).refreshTokenInterval;
    if (existingInterval) {
      clearInterval(existingInterval);
    }

    // Set interval untuk refresh token
    const interval = setInterval(async () => {
      const refreshToken = localStorage.getItem("REFRESH_TOKEN");
      if (!refreshToken) {
        clearInterval(interval);
        return;
      }

      try {
        console.log("Auto refreshing token...");

        const BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

        const response = await fetch(`${BASE_URL}/auths/refresh_token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${refreshToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const newAccessToken = data?.data?.access_token;
        const newRefreshToken = data?.data?.refresh_token;

        if (newAccessToken) {
          localStorage.setItem("ACCESS_TOKEN", newAccessToken);
          if (newRefreshToken) {
            localStorage.setItem("REFRESH_TOKEN", newRefreshToken);
          }
          localStorage.setItem("LOGIN_TIMESTAMP", new Date().toISOString());

          set({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken || refreshToken,
          });

          console.log("Token auto-refreshed successfully");
        }
      } catch (err: any) {
        console.error("Auto refresh failed:", err);

        if (err.response?.status === 401) {
          console.log("Refresh token expired, logging out...");
          get().logout();
        }
      }
    }, 58 * 60 * 1000);

    (window as any).refreshTokenInterval = interval;
  },
}));

// Auto initialize refresh system jika ada token
const refreshToken = localStorage.getItem("REFRESH_TOKEN");
if (refreshToken) {
  // Tunggu sedikit agar store sudah ter-init
  setTimeout(() => {
    useAuthStore.getState().startAutoRefresh();
  }, 1000);
}
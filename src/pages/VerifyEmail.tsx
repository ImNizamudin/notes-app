import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { apiClient } from "../api/client";
import { useAuthStore } from "../store/auth";

const VerifyEmail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState<string>("");
  const setUser = useAuthStore((s) => s.setUser);
  const fetchUserProfile = useAuthStore((s) => s.fetchUserProfile);

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Token verifikasi tidak ditemukan");
        return;
      }

      try {
        // Gunakan apiClient untuk konsistensi dan error handling yang baik
        const response: any = await apiClient("/auths/verify_email", "PUT", { token });

        // Handle response berdasarkan struktur API
        const successMessage = response?.meta?.message || "Email berhasil diverifikasi!";
        
        // Simpan token jika ada di response
        if (response.data?.access_token) {
          localStorage.setItem("ACCESS_TOKEN", response.data.access_token);
          
          if (response.data.refresh_token) {
            localStorage.setItem("REFRESH_TOKEN", response.data.refresh_token);
          }

          // Update auth store
          useAuthStore.getState().loadFromStorage();
          
          // Fetch user profile untuk mendapatkan data user terbaru
          try {
            await fetchUserProfile();
          } catch (profileError) {
            console.warn("Failed to fetch user profile:", profileError);
            // Lanjutkan meskipun gagal fetch profile
          }
        }

        setStatus("success");
        setMessage(successMessage);
        
        // Redirect ke halaman sukses setelah 3 detik
        setTimeout(() => {
          navigate("/email-verified", { 
            state: { 
              message: successMessage,
              hasToken: !!response.data?.access_token
            } 
          });
        }, 3000);

      } catch (error: any) {
        console.error("Email verification error:", error);
        
        let errorMessage = "Gagal verifikasi email. Token tidak valid atau sudah kedaluwarsa.";
        
        // Extract error message dari response API
        if (error.response) {
          errorMessage = error.response.meta?.message || 
                         error.response.message || 
                         errorMessage;
        } else if (error.message) {
          errorMessage = error.message;
        }

        setStatus("error");
        setMessage(errorMessage);
      }
    };

    verifyEmail();
  }, [token, navigate, setUser, fetchUserProfile]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center">
          {status === "loading" && (
            <>
              <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-100 mb-2">Memverifikasi Email</h2>
              <p className="text-gray-400">Sedang memverifikasi email Anda...</p>
            </>
          )}
          
          {status === "success" && (
            <>
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-green-400 mb-2">Verifikasi Berhasil!</h2>
              <p className="text-gray-300 mb-4">{message}</p>
              <p className="text-gray-400 text-sm">Anda akan diarahkan ke halaman sukses...</p>
            </>
          )}
          
          {status === "error" && (
            <>
              <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-red-400 mb-2">Verifikasi Gagal</h2>
              <p className="text-gray-300 mb-4">{message}</p>
              <div className="mt-6">
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
                >
                  Kembali ke Login
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
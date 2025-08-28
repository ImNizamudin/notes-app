// src/pages/Login.tsx
import { useState } from "react";
import { apiClient } from "../api/client";
import { useAuthStore } from "../store/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const { setUser, loadFromStorage } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const data: any = await apiClient("/authentications", "POST", {
        username,
        password,
      });
      const accessToken = data?.accessToken ?? data?.access_token;
      const refreshToken = data?.refreshToken ?? data?.refresh_token;
      if (!accessToken) throw new Error("Token tidak diterima dari server");

      localStorage.setItem("ACCESS_TOKEN", accessToken);
      if (refreshToken) localStorage.setItem("REFRESH_TOKEN", refreshToken);

      loadFromStorage();
      setUser({ username });
      navigate("/");
    } catch (e: any) {
      setErr(e.message || "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow p-6 rounded w-80 flex flex-col gap-3"
      >
        <h1 className="text-xl font-bold">Login</h1>
        <input
          type="text"
          placeholder="Username"
          className="border p-2 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {err && <p className="text-sm text-red-600">{err}</p>}
        <button
          className="bg-blue-600 text-white rounded p-2"
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </button>
        <p className="text-sm text-center">
          Belum punya akun?{" "}
          <Link to="/register" className="text-blue-600 underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

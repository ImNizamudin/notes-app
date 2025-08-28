// src/pages/Register.tsx
import { useState } from "react";
import { apiClient } from "../api/client";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
    fullname: "",
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await apiClient("/users", "POST", form);
      navigate("/login");
    } catch (e: any) {
      setErr(e.message || "Registrasi gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gray-50">
      <form
        onSubmit={onSubmit}
        className="bg-white shadow p-6 rounded w-80 flex flex-col gap-3"
      >
        <h1 className="text-xl font-bold text-center">Register</h1>
        <input
          name="fullname"
          type="text"
          placeholder="Full name"
          className="border p-2 rounded"
          value={form.fullname}
          onChange={onChange}
          required
        />
        <input
          name="username"
          type="text"
          placeholder="Username"
          className="border p-2 rounded"
          value={form.username}
          onChange={onChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={form.password}
          onChange={onChange}
          required
        />
        {err && <p className="text-sm text-red-600">{err}</p>}
        <button
          disabled={loading}
          className="bg-blue-600 text-white rounded p-2 disabled:opacity-50"
        >
          {loading ? "Mendaftar..." : "Daftar"}
        </button>
        <p className="text-sm text-center">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-blue-600 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

import { useState } from "react";
import { apiClient } from "../api/client";
import { Link, useNavigate } from "react-router-dom";
import { User, Lock, UserPlus, Eye, EyeOff, Mail } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "", // Ganti username menjadi email
    password: "",
    fullname: "",
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      // Kirim ke endpoint baru dengan struktur data yang benar
      await apiClient("/auths/register", "POST", {
        email: form.email,
        password: form.password,
        fullname: form.fullname
      });
      navigate(`/verify-email?email=${encodeURIComponent(form.email)}`);
    } catch (e: any) {
      setErr(e.message || "Registrasi gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.1) 2px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Register Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-green-500 rounded-2xl mb-4 shadow-lg">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent mb-2">
              Create Account
            </h1>
            <p className="text-gray-400 text-sm">
              Join us and start organizing your notes
            </p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Full Name Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  name="fullname"
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600 text-gray-100 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all placeholder-gray-400"
                  value={form.fullname}
                  onChange={onChange}
                  required
                />
              </div>
            </div>

            {/* Email Field (menggantikan username) */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600 text-gray-100 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all placeholder-gray-400"
                  value={form.email}
                  onChange={onChange}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a secure password"
                  className="w-full pl-12 pr-12 py-3 bg-gray-700/50 border border-gray-600 text-gray-100 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all placeholder-gray-400"
                  value={form.password}
                  onChange={onChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Password Requirements */}
            <div className="text-xs text-gray-400">
              <p>Password should be at least 8 characters long</p>
            </div>

            {/* Error Message */}
            {err && (
              <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-xl">
                <p className="text-sm">{err}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl hover:from-green-700 hover:to-green-600 transition-all duration-200 shadow-lg hover:shadow-green-500/25 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  <span>Create Account</span>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{" "}
              <Link 
                to="/login" 
                className="text-green-400 hover:text-green-300 font-medium transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-green-500/20 rounded-full blur-xl"></div>
        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>
      </div>
    </div>
  );
}
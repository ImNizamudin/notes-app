import { useState } from "react";
import { useAuthStore } from "../store/auth";
import { Link, useNavigate } from "react-router-dom";
import { User, Lock, UserPlus, Eye, EyeOff, Mail } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const { register, registerWithGoogle, loading, error, oauthLoading, oauthError } = useAuthStore();
  const [form, setForm] = useState({
    email: "",
    password: "",
    fullname: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(form.email, form.password, form.fullname);
      navigate('/verify-email/notification');
    } catch (e: any) {
      console.error("Registration error:", e);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await registerWithGoogle();
      navigate('/');
    } catch (e: any) {
      console.error("Google OAuth error:", e);
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

            {/* Email Field */}
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
                  minLength={8}
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
            {error && (
              <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-xl">
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* OAuth Error Message */}
            {oauthError && (
              <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-xl">
                <p className="text-sm">{oauthError}</p>
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

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-600"></div>
            <span className="px-3 text-gray-400 text-sm">OR</span>
            <div className="flex-1 border-t border-gray-600"></div>
          </div>

          {/* Google OAuth Button */}
          <button
            type="button"
            onClick={handleGoogleRegister}
            disabled={oauthLoading || loading}
            className="w-full flex items-center justify-center space-x-3 px-6 py-3 bg-white text-gray-800 rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-white/25 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 border border-gray-300"
          >
            {oauthLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600"></div>
                <span className="font-medium">Connecting to Google...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="font-medium">Continue with Google</span>
              </>
            )}
          </button>

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
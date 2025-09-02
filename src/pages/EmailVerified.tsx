import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle, Mail, LogIn } from "lucide-react";

export default function EmailVerified() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect otomatis setelah 5 detik
    const timer = setTimeout(() => {
      navigate("/login");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.1) 2px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Success Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl p-8 text-center">
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-600 to-green-500 rounded-2xl mb-6 shadow-lg">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent mb-4">
            Email Verified!
          </h1>

          {/* Message */}
          <p className="text-gray-300 mb-2">
            Your email has been successfully verified.
          </p>
          <p className="text-gray-400 text-sm mb-6">
            You will be redirected to login page in 5 seconds...
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
            <div className="bg-green-500 h-2 rounded-full animate-progress"></div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              to="/login"
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl hover:from-green-700 hover:to-green-600 transition-all duration-200 shadow-lg hover:shadow-green-500/25"
            >
              <LogIn className="w-5 h-5" />
              <span>Go to Login</span>
            </Link>

            <Link
              to="/"
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 text-gray-400 hover:text-gray-200 hover:bg-gray-700/50 rounded-xl transition-all duration-200"
            >
              <Mail className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-green-500/20 rounded-full blur-xl"></div>
        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>
      </div>

      {/* Progress Bar Animation */}
      <style>
        {`
          @keyframes progress {
            from { width: 0%; }
            to { width: 100%; }
          }
          .animate-progress {
            animation: progress 5s linear forwards;
          }
        `}
      </style>
    </div>
  );
}
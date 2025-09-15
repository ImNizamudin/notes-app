import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Mail, Clock, ArrowLeft, CheckCircle } from "lucide-react";

export default function VerifyEmailNotification() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleResendEmail = () => {
    // Logic untuk resend email verification
    console.log("Resending verification email to:", email);
    setCountdown(60);
    setCanResend(false);
    // TODO: Implement API call untuk resend verification email

    // const accessToken = localStorage.getItem("ACCESS_TOKEN");
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

      {/* Verify Email Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl mb-4 shadow-lg">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent mb-2">
              Verify Your Email
            </h1>
            <p className="text-gray-400 text-sm">
              We've sent a verification link to your email
            </p>
          </div>

          {/* Email Address */}
          {email && (
            <div className="bg-blue-900/20 border border-blue-700/50 rounded-xl p-4 mb-6">
              <p className="text-blue-300 text-center font-medium">
                {email}
              </p>
            </div>
          )}

          {/* Instructions */}
          <div className="space-y-4 mb-6">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-gray-200 font-medium">Check your inbox</p>
                <p className="text-gray-400 text-sm">Look for an email from ModernNotes</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-gray-200 font-medium">Click the verification link</p>
                <p className="text-gray-400 text-sm">This will confirm your email address</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-gray-200 font-medium">Start using your account</p>
                <p className="text-gray-400 text-sm">You'll be redirected to login automatically</p>
              </div>
            </div>
          </div>

          {/* Resend Email */}
          <div className="bg-gray-700/50 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300 text-sm">
                  {canResend ? "Ready to resend?" : `Resend in ${countdown}s`}
                </span>
              </div>
              
              <button
                onClick={handleResendEmail}
                disabled={!canResend}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Resend
              </button>
            </div>
          </div>

          {/* Support Text */}
          <div className="text-center mb-6">
            <p className="text-gray-400 text-sm">
              Didn't receive the email? Check your spam folder or{" "}
              {/* <button
                onClick={handleResendEmail}
                disabled={!canResend}
                className="text-blue-400 hover:text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                resend verification email
              </button> */}
            </p>
          </div>

          {/* Back to Login */}
          <div className="text-center">
            <Link 
              to="/login" 
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Logout
            </Link>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-500/20 rounded-full blur-xl"></div>
        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"></div>
      </div>
    </div>
  );
}
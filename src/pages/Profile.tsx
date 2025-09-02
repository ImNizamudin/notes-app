import { useState, useEffect } from "react";
import { useAuthStore } from "../store/auth";
import { User, Mail, Calendar, Edit, Save, X } from "lucide-react";

export default function Profile() {
  const { user, loading, error, fetchUserProfile } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    username: "",
    fullname: ""
  });

  useEffect(() => {
    // Fetch profile data jika belum ada atau perlu refresh
    if (!user || !user.id) {
      fetchUserProfile();
    } else {
      setEditForm({
        username: user.username || "",
        fullname: user.fullname || ""
      });
    }
  }, [user, fetchUserProfile]);

//   const handleSave = async () => {
//     try {
//       await updateUserProfile({
//         username: editForm.username,
//         fullname: editForm.fullname
//       });
//       setIsEditing(false);
//     } catch (err) {
//       // Error sudah dihandle oleh store
//     }
//   };

  const handleCancel = () => {
    setEditForm({
      username: user?.username || "",
      fullname: user?.fullname || ""
    });
    setIsEditing(false);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Unknown";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  if (loading && !user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-lg mb-4">Error: {error}</div>
          <button
            onClick={fetchUserProfile}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-100">Profile</h1>
              <p className="text-gray-400">Manage your account information</p>
            </div>
            
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                //   onClick={handleSave}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors"
                  disabled={loading}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center px-4 py-2 text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-xl overflow-hidden">
          {/* Profile Info */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-100">
                  {user?.fullname || user?.username || "User"}
                </h2>
                <p className="text-gray-400">{user?.email}</p>
                {user?.email_verified_at ? (
                  <span className="text-green-400 text-sm">✓ Email verified</span>
                ) : (
                  <span className="text-yellow-400 text-sm">⚠ Email not verified</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* User ID */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  User ID
                </label>
                <div className="bg-gray-700 border border-gray-600 text-gray-100 rounded-lg px-4 py-3 font-mono text-sm">
                  {user?.id || "N/A"}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <div className="bg-gray-700 border border-gray-600 text-gray-100 rounded-lg px-4 py-3 flex items-center">
                  <Mail className="w-4 h-4 text-gray-400 mr-2" />
                  {user?.email}
                </div>
              </div>

              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Username
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.username}
                    onChange={(e) => setEditForm(prev => ({ ...prev, username: e.target.value }))}
                    className="w-full bg-gray-700 border border-gray-600 text-gray-100 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter username"
                  />
                ) : (
                  <div className="bg-gray-700 border border-gray-600 text-gray-100 rounded-lg px-4 py-3">
                    {user?.username || "Not set"}
                  </div>
                )}
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.fullname}
                    onChange={(e) => setEditForm(prev => ({ ...prev, fullname: e.target.value }))}
                    className="w-full bg-gray-700 border border-gray-600 text-gray-100 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter full name"
                  />
                ) : (
                  <div className="bg-gray-700 border border-gray-600 text-gray-100 rounded-lg px-4 py-3">
                    {user?.fullname || "Not set"}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Account Metadata */}
          <div className="p-6 bg-gray-700/30">
            <h3 className="text-lg font-medium text-gray-300 mb-4">Account Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Member since</p>
                  <p className="text-gray-200">{formatDate(user?.created_at)}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Last updated</p>
                  <p className="text-gray-200">{formatDate(user?.updated_at)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-6 p-4 bg-red-900/50 border border-red-700 rounded-xl">
            <p className="text-red-200">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
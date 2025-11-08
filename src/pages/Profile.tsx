import { useState, useEffect } from "react";
import { useAuthStore } from "../store/auth";
import { User, Mail, Calendar, Edit, Save, X, Phone, CheckCircle, XCircle, Plus } from "lucide-react";
import { apiClient } from "../api/client";

// Modal untuk integrasi WhatsApp
interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

function WhatsAppModal({ isOpen, onClose, onSuccess }: WhatsAppModalProps) {
  const [formData, setFormData] = useState({
    phone: "",
    study_field_id: 1,
    semester: 1
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const studyFields = [
    { id: 1, name: "Sistem Informasi" }
    // Tambahkan field studi lainnya jika ada
  ];

  const semesterOptions = Array.from({ length: 8 }, (_, i) => i + 1); // Semester 1-8

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await apiClient("/auths/integrate_wabot", "PUT", formData);
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.response?.meta?.message || "Failed to integrate WhatsApp");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl w-full max-w-md">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-gray-100">Integrate WhatsApp</h2>
          <p className="text-gray-400 text-sm mt-1">Connect your WhatsApp account</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg">
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          {/* Phone Number */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              WhatsApp Number
            </label>
            <div className="relative">
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full bg-gray-700 border border-gray-600 text-gray-100 rounded-lg px-4 py-3 pl-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="085727908675"
                required
              />
              <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>

          {/* Study Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Study Field
            </label>
            <select
              value={formData.study_field_id}
              onChange={(e) => setFormData(prev => ({ ...prev, study_field_id: parseInt(e.target.value) }))}
              className="w-full bg-gray-700 border border-gray-600 text-gray-100 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {studyFields.map(field => (
                <option key={field.id} value={field.id}>
                  {field.name}
                </option>
              ))}
            </select>
          </div>

          {/* Semester */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Semester
            </label>
            <select
              value={formData.semester}
              onChange={(e) => setFormData(prev => ({ ...prev, semester: parseInt(e.target.value) }))}
              className="w-full bg-gray-700 border border-gray-600 text-gray-100 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {semesterOptions.map(semester => (
                <option key={semester} value={semester}>
                  Semester {semester}
                </option>
              ))}
            </select>
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Connecting..." : "Connect"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Profile() {
  const { user, loading, error, fetchUserProfile } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [editForm, setEditForm] = useState({
    username: "",
    fullname: "",
    whatsapp: ""
  });

  useEffect(() => {
    // Fetch profile data jika belum ada atau perlu refresh
    if (!user || !user.id) {
      fetchUserProfile();
    } else {
      setEditForm({
        username: user.username || "",
        fullname: user.fullname || "",
        whatsapp: user.whatsapp || ""
      });
    }
  }, [user, fetchUserProfile]);

  const handleCancel = () => {
    setEditForm({
      username: user?.username || "",
      fullname: user?.fullname || "",
      whatsapp: user?.whatsapp || ""
    });
    setIsEditing(false);
  };

  const handleWhatsAppSuccess = () => {
    // Refresh profile data setelah berhasil integrasi
    fetchUserProfile();
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
                <div className="flex items-center space-x-4 mt-1">
                  {user?.email_verified_at ? (
                    <span className="text-green-400 text-sm flex items-center">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Email verified
                    </span>
                  ) : (
                    <span className="text-yellow-400 text-sm flex items-center">
                      <XCircle className="w-3 h-3 mr-1" />
                      Email not verified
                    </span>
                  )}
                  
                  {user?.phone && (
                    <span className={`text-sm flex items-center ${
                      user?.is_integrated_wabot ? 'text-green-400' : 'text-yellow-400'
                    }`}>
                      {user?.is_integrated_wabot ? (
                        <CheckCircle className="w-3 h-3 mr-1" />
                      ) : (
                        <XCircle className="w-3 h-3 mr-1" />
                      )}
                      WhatsApp {user?.is_integrated_wabot ? 'verified' : 'not verified'}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              {/* WhatsApp Number */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {user?.is_integrated_wabot ? 'WhatsApp Number' : 'WhatsApp Number (Not Verified)'}
                  {user?.phone && (
                    <span className={`ml-2 inline-flex items-center ${
                      user?.is_integrated_wabot ? 'text-green-400' : 'text-yellow-400'
                    }`}>
                      {user?.is_integrated_wabot ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <XCircle className="w-3 h-3" />
                      )}
                    </span>
                  )}
                </label>
                {isEditing ? (
                  <div className="relative">
                    <input
                      type="tel"
                      value={editForm.whatsapp}
                      onChange={(e) => setEditForm(prev => ({ ...prev, whatsapp: e.target.value }))}
                      className="w-full bg-gray-700 border border-gray-600 text-gray-100 rounded-lg px-4 py-3 pl-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter WhatsApp number"
                    />
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                ) : (
                  <div>
                    {user?.phone ? (
                      <div className="bg-gray-700 border border-gray-600 text-gray-100 rounded-lg px-4 py-3 flex items-center">
                        <Phone className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="flex items-center justify-between w-full">
                          <span>{user?.phone}</span>
                          {user?.is_integrated_wabot ? (
                            <span className="text-green-400 text-sm flex items-center">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Verified
                            </span>
                          ) : (
                            <span className="text-yellow-400 text-sm flex items-center">
                              <XCircle className="w-3 h-3 mr-1" />
                              Not Verified
                            </span>
                          )}
                        </span>
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowWhatsAppModal(true)}
                        className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Data</span>
                      </button>
                    )}
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

      {/* WhatsApp Integration Modal */}
      <WhatsAppModal
        isOpen={showWhatsAppModal}
        onClose={() => setShowWhatsAppModal(false)}
        onSuccess={handleWhatsAppSuccess}
      />
    </div>
  );
}
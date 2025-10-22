import { User, Phone, Mail, Edit2 } from "lucide-react";
import { useProfile } from "../hooks/useProfile";

const UserDetailsForm = () => {
  const {
    formData,
    isEditing,
    loading,
    handleChange,
    handleEdit,
    handleSave,
    handleCancel,
  } = useProfile();

  return (
    <div className="min-h-screen p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="w-full max-w-5xl mx-auto">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-700 to-blue-900 border-4 border-white shadow-lg rounded-full flex items-center justify-center flex-shrink-0">
                <User className="text-white text-xl sm:text-2xl" />
              </div>
              <div className="flex-1 sm:flex-initial">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-700 mb-0.5 sm:mb-1">
                  Profile Information
                </h1>
                <p className="text-sm sm:text-base text-gray-500">
                  View and update your personal info
                </p>
              </div>
            </div>
            {!isEditing && (
              <button
                onClick={handleEdit}
                className="p-2.5 sm:p-3 bg-blue-100 hover:bg-blue-200 rounded-full transition-all duration-300"
              >
                <Edit2 className="text-blue-800 text-lg sm:text-xl" />
              </button>
            )}
          </div>

          {/* Form */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-sm sm:text-base text-gray-700 font-semibold mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-3 py-2.5 border-2 border-black/30 rounded-lg focus:outline-none focus:border-blue-700 disabled:bg-gray-50 disabled:text-gray-600"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm sm:text-base text-gray-700 font-semibold mb-2">
                <Phone className="text-blue-700 w-4 h-4 sm:w-5 sm:h-5" />
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-3 py-2.5 border-2 border-black/30 rounded-lg focus:outline-none focus:border-blue-700 disabled:bg-gray-50 disabled:text-gray-600"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm sm:text-base text-gray-700 font-semibold mb-2">
                <Mail className="text-blue-700 w-4 h-4 sm:w-5 sm:h-5" />
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="w-full px-3 py-2.5 border-2 border-black/30 rounded-lg bg-gray-50 text-gray-600 pr-16"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs sm:text-sm text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                  Locked
                </span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          {!isEditing ? (
            <p className="text-center text-sm sm:text-base text-gray-700 mt-8">
              Click the edit button to update your information
            </p>
          ) : (
            <div className="flex items-center justify-center flex-col sm:flex-row gap-4 mt-8">
              <button
                onClick={handleSave}
                disabled={loading}
                className="w-full sm:w-auto px-7 py-3 bg-gradient-to-r from-blue-800 to-blue-900 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={handleCancel}
                className="w-full sm:w-auto px-10 py-3 bg-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
            </div>
          )}

          <div className="mt-8 h-1 bg-gradient-to-r from-blue-400 via-blue-700 to-blue-400 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsForm;

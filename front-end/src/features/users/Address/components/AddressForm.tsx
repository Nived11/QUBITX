import { useState, type ChangeEvent } from "react";
import { X } from "lucide-react";
import type { AddressFormData } from "@/types/address";

interface AddressFormProps {
  onSave: (address: AddressFormData) => void;
  onCancel: () => void;
  initialData?: Partial<AddressFormData>;
  isEditing?: boolean;
  loading?: boolean;
}

const AddressForm = ({ onSave, onCancel, initialData, isEditing = false , loading = false, }: AddressFormProps) => {
  const [formData, setFormData] = useState<AddressFormData>({
    fullName: initialData?.fullName || "",
    phone: initialData?.phone || "",
    addressLine1: initialData?.addressLine1 || "",
    addressLine2: initialData?.addressLine2 || "",
    city: initialData?.city || "",
    state: initialData?.state || "",
    pincode: initialData?.pincode || "",
    country: initialData?.country || "India",
    landmark: initialData?.landmark || "",
    isDefault: initialData?.isDefault || false,
    addressType: initialData?.addressType || "Home",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }
    if (!formData.addressLine1.trim()) newErrors.addressLine1 = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Pincode must be 6 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2">
      <div className="relative bg-white rounded-lg p-4 sm:p-6 w-full max-w-3xl max-h-[95vh] overflow-y-auto">
        <button
          onClick={onCancel}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close"
        >
          <X size={22} />
        </button>

        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-800">
          {isEditing ? "Edit Address" : "Add New Address"}
        </h2>

        <div className="space-y-4">
          <Input
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="e.g., John Doe"
            required
            error={errors.fullName}
          />

          <Input
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="10 digit mobile number"
            required
            error={errors.phone}
            maxLength={10}
          />

          <Input
            label="Address Line 1"
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleInputChange}
            placeholder="House no., Building name"
            required
            error={errors.addressLine1}
          />

          <Input
            label="Address Line 2"
            name="addressLine2"
            value={formData.addressLine2 || ""} // ✅ Fix: Ensure string
            onChange={handleInputChange}
            placeholder="Road name, Area, Colony"
          />

          <Input
            label="Landmark"
            name="landmark"
            value={formData.landmark || ""} // ✅ Fix: Ensure string
            onChange={handleInputChange}
            placeholder="Nearby landmark"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="City"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="City"
              required
              error={errors.city}
            />
            <Input
              label="State"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              placeholder="State"
              required
              error={errors.state}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="PIN Code"
              name="pincode"
              value={formData.pincode}
              onChange={handleInputChange}
              placeholder="6 digit PIN code"
              required
              error={errors.pincode}
              maxLength={6}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address Type <span className="text-red-500">*</span>
              </label>
              <select
                name="addressType"
                value={formData.addressType}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
              >
                <option value="Home">Home</option>
                <option value="Work">Work</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleInputChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="text-sm text-gray-700">Set as default address</label>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">

<button
  onClick={handleSubmit}
  disabled={loading}
  className={`w-full sm:flex-1 flex items-center justify-center gap-2 
    bg-gradient-to-br from-blue-600 to-blue-900 
    hover:from-blue-700 hover:to-blue-950 
    text-white py-2 rounded-lg text-sm sm:text-base font-medium
    transition-all ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
>
  {loading && (
    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
  )}
  {loading
    ? isEditing
      ? "Updating..."
      : "Saving..."
    : isEditing
    ? "Update Address"
    : "Save Address"}
</button>
       <button
  onClick={onCancel}
  disabled={loading}
  className={`w-full sm:flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg text-sm sm:text-base font-medium ${
    loading ? "opacity-50 cursor-not-allowed" : ""
  }`}
>
  Cancel
</button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface InputProps {
  label: string;
  name: string;
  value: string; // ✅ Always string (no undefined)
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
  maxLength?: number;
}

const Input = ({ 
  label, 
  name, 
  value, 
  placeholder, 
  onChange, 
  required, 
  error,
  maxLength 
}: InputProps) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      maxLength={maxLength}
      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm ${
        error ? "border-red-500" : "border-gray-300"
      }`}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default AddressForm;
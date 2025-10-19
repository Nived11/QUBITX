import { useState, type ChangeEvent } from "react";
import { X } from "lucide-react";
import { type Address } from "../data";

interface AddressFormProps {
  onSave: (address: Omit<Address, "id">) => void;
  onCancel: () => void;
}

const AddressForm = ({ onSave, onCancel }: AddressFormProps) => {
  const [formData, setFormData] = useState<Omit<Address, "id">>({
    title: "",
    line1: "",
    line2: "",
    landmark: "",
    city: "",
    state: "",
    pin: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (formData.title && formData.line1) {
      onSave(formData);
      onCancel();
      setFormData({
        title: "",
        line1: "",
        line2: "",
        landmark: "",
        city: "",
        state: "",
        pin: "",
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2">
      <div className="relative bg-white rounded-lg p-4 sm:p-6 w-full max-w-3xl max-h-[95vh] overflow-y-auto">
        {/* ❌ Close Icon */}
        <button
          onClick={onCancel}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close"
        >
          <X size={22} />
        </button>

        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-800">
          Add New Address
        </h2>

        <div className="space-y-4">
          <Input
            label="Address Title *"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="e.g., Home, Office"
            required
          />
          <Input
            label="Address Line 1 *"
            name="line1"
            value={formData.line1}
            onChange={handleInputChange}
            placeholder="Street address"
            required
          />
          <Input
            label="Address Line 2"
            name="line2"
            value={formData.line2}
            onChange={handleInputChange}
            placeholder="Apartment, suite, etc."
          />
          <Input
            label="Landmark"
            name="landmark"
            value={formData.landmark}
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
            />
            <Input
              label="State"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              placeholder="State"
            />
          </div>

          <Input
            label="PIN Code"
            name="pin"
            value={formData.pin}
            onChange={handleInputChange}
            placeholder="PIN Code"
          />

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              onClick={handleSubmit}
              className="w-full sm:flex-1 bg-gradient-to-br from-blue-600 to-blue-900 hover:from-blue-700 hover:to-blue-950 text-white py-2 rounded-lg text-sm sm:text-base font-medium"
            >
              Save Address
            </button>
            <button
              onClick={onCancel}
              className="w-full sm:flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg text-sm sm:text-base font-medium"
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
  value: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const Input = ({ label, name, value, placeholder, onChange, required }: InputProps) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*required</span>}
    </label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
    />
  </div>
);

export default AddressForm;
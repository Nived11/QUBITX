import { Trash2, MapPin, Star, Edit2, } from "lucide-react";
import type { Address } from "@/types/address";

interface AddressListProps {
  addresses: Address[];
  selectedAddress?: Address | null;
  onSelect?: (address: Address) => void;
  onSetDefault: (addressId: string) => void;
  onEdit?: (address: Address) => void;
  onDelete: (addressId: string) => void;
  actionLoading: boolean;
  selectionMode?: boolean;
}

const AddressList = ({
  addresses,
  selectedAddress,
  onSelect,
  onSetDefault,
  onEdit,
  onDelete,
  actionLoading,
  selectionMode = false,
}: AddressListProps) => {
  const handleCardClick = (address: Address) => {
    if (selectionMode && onSelect) {
      onSelect(address);
    }
  };

  return (
    <div className="space-y-4 max-h-[100vh] overflow-y-auto scrollbar-hide">
      {addresses.length === 0 ? (
        <div className="rounded-lg p-12 text-center text-gray-500 bg-gray-50 border-2 border-dashed border-gray-300">
          <MapPin size={48} className="mx-auto mb-4 opacity-30" />
          <p className="text-lg font-medium">No addresses saved yet</p>
          <p className="text-sm mt-2">Click "Add New" to create your first address</p>
        </div>
      ) : (
        addresses.map((address) => {
          const isSelected =
            selectionMode && selectedAddress?._id === address._id;

          return (
            <div
              key={address._id}
              onClick={() => handleCardClick(address)}
              className={`bg-white rounded-lg p-4 sm:p-6 border-2 transition relative ${
                selectionMode
                  ? isSelected
                    ? "border-blue-600 bg-blue-50/30 shadow-md cursor-pointer"
                    : "border-gray-200 hover:shadow-sm cursor-pointer"
                  : "border-gray-200 hover:shadow-sm"
              }`}
            >
              {/* REAL RADIO BUTTON */}
              {selectionMode && (
                <label
                  className="absolute top-4 left-4 flex items-center cursor-pointer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    type="radio"
                    name="addressSelect"
                    checked={isSelected}
                    onChange={() => onSelect && onSelect(address)}
                    className="sr-only"
                  />
                  <span
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected
                        ? "border-blue-600 bg-blue-600"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {isSelected && (
                      <span className="w-2.5 h-2.5 rounded-full bg-white"></span>
                    )}
                  </span>
                </label>
              )}

              {/* Default Badge */}
              {address.isDefault && (
                <div className="absolute top-3 right-3 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <Star size={12} fill="currentColor" />
                  Default
                </div>
              )}

              {/* Content */}
              <div className={selectionMode ? "pl-10" : ""}>
                {/* Address Type + Selected */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                      {address.addressType}
                    </span>
                    {selectionMode && isSelected && (
                      <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Selected
                      </span>
                    )}
                  </div>
                </div>

                {/* Name + Phone */}
                <h3 className="text-lg font-bold text-gray-800">
                  {address.fullName}
                </h3>
                <p className="text-sm text-gray-600">
                  Phone: <span className="font-medium">{address.phone}</span>
                </p>

                {/* Address Details */}
                <div className="text-gray-700 text-sm space-y-1 mb-4">
                  <p className="font-medium">{address.addressLine1}</p>
                  {address.addressLine2 && <p>{address.addressLine2}</p>}
                  {address.landmark && (
                    <p className="text-gray-500">
                      <span className="font-medium">Landmark:</span>{" "}
                      {address.landmark}
                    </p>
                  )}
                  <p>
                    {address.city}, {address.state} - {address.pincode}
                  </p>
                  <p className="text-gray-500">{address.country}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-3 border-t border-gray-200">
                  {!address.isDefault && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSetDefault(address._id);
                      }}
                      disabled={actionLoading}
                      className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium disabled:opacity-50 transition"
                    >
                      Set as Default
                    </button>
                  )}

                  {onEdit && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(address);
                      }}
                      disabled={actionLoading}
                      className="bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded text-xs sm:text-sm text-blue-800 font-medium disabled:opacity-50 flex items-center gap-1 transition"
                    >
                      <Edit2 size={14} />
                      Edit
                    </button>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(address._id);
                    }}
                    disabled={actionLoading}
                    className="text-xs sm:text-sm text-red-500 hover:text-red-700 font-medium flex items-center gap-1 ml-auto disabled:opacity-50 transition"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default AddressList;

import { useState } from "react";
import { Plus } from "lucide-react";
import { type Address, addressList, AddressForm, AddressList } from "../../features/users/Address";

const UserAddress = () => {
  const [addresses, setAddresses] = useState<Address[]>(addressList);
  const [showForm, setShowForm] = useState(false);

  const handleDelete = (id: number) =>
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));

  const handleAddAddress = (newAddress: Omit<Address, "id">) =>
    setAddresses((prev) => [...prev, { id: Date.now(), ...newAddress }]);

  return (
    <div className="bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex   justify-between items-center gap-4 mb-8">
          <h1 className="text-lg font-semibold text-blue-700">My Addresses</h1>

          <button
            onClick={() => setShowForm(true)}
            className="h-[40px] w-[120px] sm:w-auto bg-gradient-to-br from-blue-600 to-blue-900 hover:from-blue-700 hover:to-blue-950 text-white px-3  rounded-lg flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <Plus size={20} />
            <span className="text-xs sm:text-sm font-medium">Add Address</span>
          </button>
        </div>

        {/* Address Form Modal */}
        {showForm && (
          <AddressForm
            onSave={handleAddAddress}
            onCancel={() => setShowForm(false)}
          />
        )}

        {/* Address List */}
        <AddressList addresses={addresses} handleDelete={handleDelete} />
      </div>
    </div>
  );
};

export default UserAddress;

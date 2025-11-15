// src/features/checkout/components/AddressStep.tsx
import { Plus } from "lucide-react";
import { AddressForm, AddressList } from "@/features/users/Address";

interface AddressStepProps {
  checkout: any; // Use the return type of useCheckout
}

 const AddressStep = ({ checkout }: AddressStepProps) => {
  const { addressHook, showAddressForm, setShowAddressForm } = checkout;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Select Delivery Address</h2>
        <button
          onClick={() => setShowAddressForm(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
        >
          <Plus size={16} />
          Add New
        </button>
      </div>

      <AddressList
        addresses={addressHook.addresses}
        selectedAddress={addressHook.selectedAddress}
        onSelect={addressHook.selectAddress}
        onSetDefault={addressHook.setDefault}
        onEdit={() => {
          // Handle edit if needed in future
        }}
        onDelete={addressHook.deleteAddress}
        actionLoading={addressHook.actionLoading}
        selectionMode={true}
      />

      {showAddressForm && (
        <AddressForm
          onSave={async (data) => {
            await addressHook.addAddress(data);
            setShowAddressForm(false);
          }}
          onCancel={() => setShowAddressForm(false)}
          loading={addressHook.actionLoading}
        />
      )}
    </div>
  );
};

export default AddressStep;
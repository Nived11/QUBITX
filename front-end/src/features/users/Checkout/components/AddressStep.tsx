import { Plus } from "lucide-react";
import { useState } from "react";
import type { Address } from "@/types/address";
import { AddressForm, AddressList } from "@/features/users/Address";

interface AddressStepProps {
  checkout: any; 
}

 const AddressStep = ({ checkout }: AddressStepProps) => {
  const { addressHook, showAddressForm, setShowAddressForm } = checkout;
   const [editAddress, setEditAddress] = useState<Address | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Select Delivery Address</h2>
        <button
          onClick={() => {
            setEditAddress(null); 
            setShowAddressForm(true);
          }}
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
         onEdit={(addr) => {
          setEditAddress(addr);       
          setShowAddressForm(true);    
        }}
        onDelete={addressHook.deleteAddress}
        actionLoading={addressHook.actionLoading}
        selectionMode={true}
      />

      {showAddressForm && (
        <AddressForm
          initialData={editAddress || undefined}  

          onSave={async (data) => {
            if (editAddress) {
              await addressHook.updateAddress(editAddress._id, data);
            } else {
              await addressHook.addAddress(data);
            }

            setEditAddress(null);
            setShowAddressForm(false);
          }}

          onCancel={() => {
            setEditAddress(null);
            setShowAddressForm(false);
          }}

          loading={addressHook.actionLoading}
        />
      )}
    </div>
  );
};

export default AddressStep;
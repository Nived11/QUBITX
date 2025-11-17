import { Plus } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import type { Address } from "@/types/address";
import { AddressForm, AddressList } from "@/features/users/Address";

interface AddressStepProps {
  checkout: any; 
}

const AddressStep = ({ checkout }: AddressStepProps) => {
  const { addressHook, showAddressForm, setShowAddressForm } = checkout;
  const [editAddress, setEditAddress] = useState<Address | null>(null);

  return (
    <div className="flex flex-col lg:flex-row gap-6 
            lg:h-[100vh]
            lg:max-w-[90%] lg:mx-auto w-full">

      {/* Address List Section - Left Side */}
      <div className="flex-1 lg:overflow-hidden pb-4 lg:pb-0">
        <div className="flex items-center justify-between mb-4 gap-2">
          <h2 className="text-base sm:text-xl font-bold text-gray-800 truncate">
            Select Delivery Address
          </h2>
          <button
            onClick={() => {
              setEditAddress(null); 
              setShowAddressForm(true);
            }}
            className="flex items-center gap-1 sm:gap-2 bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 text-xs sm:text-sm whitespace-nowrap flex-shrink-0"
          >
            <Plus size={14} className="sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Add New</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>

        <div className="mb-24 lg:mb-0 lg:h-[calc(100%-60px)] lg:overflow-y-auto lg:pr-2 scrollbar-hide">
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
        </div>

       {showAddressForm && createPortal(
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
          />,
           document.body
        )}
      </div>
    </div>
  );
};

export default AddressStep;
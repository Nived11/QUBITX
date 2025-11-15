import { useState } from "react";
import { Plus } from "lucide-react";
import { AddressForm, AddressList , AddressSkeleton} from "@/features/users/Address";
import { useAddress } from "@/features/users/Address/hooks/useAddress";
import type { Address, AddressFormData } from "@/types/address";
import DeleteConfirmModal from "@/components/common/DeleteConfirmModal";

const UserAddress = () => {
  const {
    addresses,
    loading,
    actionLoading,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefault,
  } = useAddress();

  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);

const handleSaveAddress = async (addressData: AddressFormData) => {
  try {
    if (editingAddress) {
      const result = await updateAddress(editingAddress._id, addressData);
      if (result) {
        setEditingAddress(null);
        setShowForm(false);
      }
    } else {
      const result = await addAddress(addressData);
      if (result) {
        setShowForm(false);
      }
    }
  } catch (error) {
    console.error("Address save failed:", error);
  }
};

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingAddress(null);
  };

    const handleDeleteClick = (id: string) => {
    setSelectedDeleteId(id);
    setIsDeleteModalOpen(true);
  };

    const handleConfirmDelete = async () => {
    if (selectedDeleteId) {
      await deleteAddress(selectedDeleteId);
      setIsDeleteModalOpen(false);
      setSelectedDeleteId(null);
    }
  };

 if (loading) {
  return <AddressSkeleton />;
}

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto px-2 lg:px-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              My Addresses
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage your delivery addresses
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-br from-blue-600 to-blue-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:from-blue-700 hover:to-blue-950 transition shadow-sm font-medium text-sm sm:text-"
          >
            <Plus size={20} />
            <span className="hidden sm:inline">Add Address</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>

        <AddressList
          addresses={addresses}
          onSetDefault={setDefault}
          onEdit={handleEdit}
          onDelete={handleDeleteClick} 
          actionLoading={actionLoading}
          selectionMode={false} 
        />

        {showForm && (
          <AddressForm
            onSave={handleSaveAddress}
            onCancel={handleCancel}
            initialData={editingAddress || undefined}
            isEditing={!!editingAddress}
            loading={actionLoading}
          />
        )}

        <DeleteConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
          title="Delete Address"
          message="Are you sure you want to delete this address? "
        />
      </div>
    </div>
  );
};

export default UserAddress;
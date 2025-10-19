import { Trash2 } from "lucide-react";
import {type  Address } from "../data";

interface AddressListProps {
  addresses: Address[];
  handleDelete: (id: number) => void;
}

const AddressList = ({ addresses, handleDelete }: AddressListProps) => {
  return (
    <div className="space-y-4">
      {addresses.length === 0 ? (
        <div className="rounded-lg p-12 text-center text-gray-500">
          <p className="text-lg">No addresses saved yet</p>
          <p className="text-sm mt-2">Click "Add Address" to create one</p>
        </div>
      ) : (
        addresses.map((address) => (
          <div
            key={address.id}
            className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition relative"
          >
            <button
              onClick={() => handleDelete(address.id)}
              className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition"
            >
              <Trash2 size={20} />
            </button>

            <h3 className="text-lg font-semibold text-blue-600 mb-2">
              {address.title}
            </h3>

            <div className="text-gray-700 text-sm space-y-1">
              <p>{address.line1}</p>
              {address.line2 && <p>{address.line2}</p>}
              {address.landmark && <p>Landmark: {address.landmark}</p>}
              {(address.city || address.state) && (
                <p>
                  {address.city}
                  {address.city && address.state && ", "}
                  {address.state}
                </p>
              )}
              {address.pin && <p>PIN: {address.pin}</p>}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AddressList;
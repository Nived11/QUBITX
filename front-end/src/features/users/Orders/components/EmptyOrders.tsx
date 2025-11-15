import { Package } from 'lucide-react';

interface EmptyOrdersProps {
  onStartShopping: () => void;
}

 const EmptyOrders = ({ onStartShopping }: EmptyOrdersProps) => {
  return (
    <div className="  p-12 text-center text-gray-500">
      <Package className="w-16 h-16 mx-auto mb-4 text-blue-700" />
      <p className="text-lg font-semibold">No orders yet</p>
      <p className="text-sm mt-2">Your order history will appear here</p>
      <button
        onClick={onStartShopping}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Start Shopping
      </button>
    </div>
  );
};

export default EmptyOrders;
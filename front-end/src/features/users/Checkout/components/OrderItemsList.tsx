import type { CartItem } from "@/types/cart";

interface OrderItemsListProps {
  items: CartItem[];
}

export const OrderItemsList = ({ items }: OrderItemsListProps) => {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-gray-800">Items ({items.length})</h3>
      {items.map((item, index) => (
        <div key={index} className="flex gap-4 bg-white border rounded-lg p-3">
          <img
            src={item.images[0] || item.product.images[0]}
            alt={item.product.name}
            className="w-20 h-20 object-cover rounded"
          />
          <div className="flex-1">
            <p className="text-xs text-gray-500">{item.product.brand}</p>
            <h4 className="font-semibold text-gray-800 text-sm line-clamp-2">
              {item.product.name}
            </h4>
            {item.color && (
              <p className="text-xs text-gray-600">Color: {item.color}</p>
            )}
            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-bold text-blue-800">
                ₹{(item.product.discountedPrice * item.quantity).toLocaleString()}
              </span>
              <span className="text-xs line-through text-gray-500">
                ₹{(item.product.actualPrice * item.quantity).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
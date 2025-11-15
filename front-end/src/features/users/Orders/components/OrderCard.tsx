import { ChevronDown, ChevronUp } from 'lucide-react';
import type { Order } from '@/types/order';
import { useOrders } from '../hooks/useOrders';
import StatusTracker from './StatusTracker';

interface OrderCardProps {
  order: Order;
  onCancelClick: (orderId: string) => void;
  cancellingOrderId: string | null;
}

const OrderCard = ({ order, onCancelClick, cancellingOrderId }: OrderCardProps) => {
  const {
    expandedOrders,
    toggleOrderExpansion,
    canCancelOrder,
    formatDate,
    navigateToProduct
  } = useOrders();

  const isExpanded = expandedOrders.includes(order._id);
  const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);
  const isCancelling = cancellingOrderId === order._id;

  return (
    <div className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="p-4 sm:p-5 md:p-6">
        {/* Header Row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex-1">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
              Order #{order._id.slice(-8).toUpperCase()}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600">
              {formatDate(order.createdAt)} • {order.paymentMethod}
            </p>
          </div>
        </div>

        {/* Status Tracker */}
        <StatusTracker status={order.orderStatus} />

        {/* First Item Preview */}
        <div className="flex gap-3 sm:gap-4 mb-4">
          <img
            src={order.items[0].product.images[0]}
            alt={order.items[0].product.name}
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover rounded-md flex-shrink-0 cursor-pointer"
            onClick={() => navigateToProduct(order.items[0].product._id)}
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500">{order.items[0].product.brand}</p>
            <p className="text-xs sm:text-sm md:text-base text-gray-700 line-clamp-2 mb-1">
              {order.items[0].product.name}
            </p>
            {order.items[0].color && (
              <p className="text-xs text-gray-500">Color: {order.items[0].color}</p>
            )}
            <p className="text-xs text-gray-500">Qty: {order.items[0].quantity}</p>
            <p className="text-sm font-semibold text-gray-900 mt-1">
              ₹{order.items[0].price.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Show More Items Button */}
        {order.items.length > 1 && (
          <button
            onClick={() => toggleOrderExpansion(order._id)}
            className="w-full mb-4 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-medium text-gray-700 flex items-center justify-between transition"
          >
            <span>
              {isExpanded ? 'Hide' : 'Show'} {order.items.length - 1} more item{order.items.length - 1 > 1 ? 's' : ''}
            </span>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        )}

        {/* Expanded Items */}
        {isExpanded && order.items.length > 1 && (
          <div className="space-y-3 mb-4 p-3 bg-gray-50 rounded-lg">
            {order.items.slice(1).map((item, index) => (
              <div key={index} className="flex gap-3">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-md flex-shrink-0 cursor-pointer"
                  onClick={() => navigateToProduct(item.product._id)}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500">{item.product.brand}</p>
                  <p className="text-xs sm:text-sm text-gray-700 line-clamp-2 mb-1">
                    {item.product.name}
                  </p>
                  {item.color && (
                    <p className="text-xs text-gray-500">Color: {item.color}</p>
                  )}
                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  <p className="text-sm font-semibold text-gray-900 mt-1">
                    ₹{item.price.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Delivery Address */}
        <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-xs font-semibold text-gray-700 mb-1">Delivery Address</p>
          <p className="text-sm text-gray-800">
            {order.address.fullName} • {order.address.phone}
          </p>
          <p className="text-xs text-gray-600">
            {order.address.addressLine1}, {order.address.city}, {order.address.state} - {order.address.pincode}
          </p>
        </div>

        {/* Price Breakdown */}
        <div className="mb-4 p-3 bg-gray-50 rounded-lg space-y-1">
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-semibold">₹{order.subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-xs sm:text-sm text-green-600">
            <span>Discount:</span>
            <span className="font-semibold">-₹{order.discount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-gray-600">Shipping:</span>
            <span className="font-semibold">
              {order.shipping === 0 ? 'FREE' : `₹${order.shipping}`}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 pt-4 border-t border-gray-200">
          <div className="flex-1">
            <p className="text-xs sm:text-sm text-gray-600 mb-1">
              Total Amount ({totalItems} items)
            </p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600">
              ₹{order.total.toLocaleString()}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 sm:gap-3">
            {canCancelOrder(order.orderStatus) && (
              <button
                onClick={() => onCancelClick(order._id)}
                disabled={isCancelling}
                className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCancelling ? 'Cancelling...' : 'Cancel Order'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
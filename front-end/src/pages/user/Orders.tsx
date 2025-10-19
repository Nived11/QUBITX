import { useState } from 'react';

const Orders = () => {
  const [orders] = useState([
    {
      id: 'cef42d4a2dd188',
      productName: 'boAt Rockerz 430 w/ 40mm Drivers, Beast Mode w/ 40ms Latency, 40hrs Playback, ENx 1ech, Voice Assistant, B1v5.4, Adaptive Fit & Easy Access Controls, Bluetooth Over Ear...',
      productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
      orderedOn: 'October 5, 2025',
      total: 1299
    },
    {
      id: 'abc123def456',
      productName: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones, 30hr Battery, Multipoint Connectivity, Premium Sound Quality',
      productImage: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=100&h=100&fit=crop',
      orderedOn: 'September 28, 2025',
      total: 2499
    },
    {
      id: 'xyz789ghi012',
      productName: 'Apple AirPods Pro (2nd Generation) with MagSafe Charging Case, Active Noise Cancellation, Adaptive Audio',
      productImage: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=100&h=100&fit=crop',
      orderedOn: 'September 15, 2025',
      total: 3999
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-lg md:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
            My Orders
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Review your order history
          </p>
        </div>

        {/* Orders List */}
        <div className="space-y-4 sm:space-y-5">
          {orders.length === 0 ? (
            <div className="bg-white rounded-lg p-12 text-center text-gray-500 shadow-sm">
              <p className="text-lg">No orders yet</p>
              <p className="text-sm mt-2">Your order history will appear here</p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Order ID */}
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                  Order #{order.id}
                </h3>

                {/* Product Info */}
                <div className="flex gap-3 sm:gap-4 mb-4 sm:mb-5">
                  <img
                    src={order.productImage}
                    alt="Product"
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover rounded-md flex-shrink-0"
                  />
                  <p className="text-xs sm:text-sm md:text-base text-gray-700 line-clamp-3">
                    {order.productName}
                  </p>
                </div>

                {/* Order Details */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4 pt-3 sm:pt-4 border-t border-gray-100">
                  <p className="text-xs sm:text-sm text-gray-600">
                    Ordered on: {order.orderedOn}
                  </p>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600">
                    Total: ₹{order.total}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
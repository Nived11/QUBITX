import { useOrders } from '../hooks/useOrders';
import OrderCard from './OrderCard';
import EmptyOrders from './EmptyOrders';
import OrdersSkeleton from './OrdersSkeleton';
import CancelOrderModal from './CancelOrderModal';

const OrdersContainer = () => {
  const { 
    orders, 
    loading, 
    navigateToHome,
    showCancelModal,
    closeCancelModal,
    handleCancelOrder,
    cancellingOrder,
    openCancelModal  
  } = useOrders();

  if (loading) {
    return <OrdersSkeleton />;
  }

  if (orders.length === 0) {
    return (
      <div className="max-h-screen bg-gray-50 p-3 sm:p-4 md:p-6 lg:p-8 overflow-y-auto scrollbar-hide">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 md:mb-8">
            <h1 className="text-lg md:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
              My Orders
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Review your order history and track deliveries
            </p>
          </div>
          <EmptyOrders onStartShopping={navigateToHome} />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-h-screen bg-gray-50 p-3 sm:p-4 md:p-6 lg:p-8 overflow-y-auto scrollbar-hide">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 md:mb-8">
            <h1 className="text-lg md:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
              My Orders
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Review your order history and track deliveries
            </p>
          </div>

          <div className="space-y-4 sm:space-y-5">
            {orders.map((order) => (
              <OrderCard 
                key={order._id} 
                order={order}
                onCancelClick={openCancelModal}
                cancellingOrderId={cancellingOrder}
              />
            ))}
          </div>
        </div>
      </div>

      <CancelOrderModal 
        isOpen={showCancelModal}
        onClose={closeCancelModal}
        onConfirm={handleCancelOrder}
        isLoading={!!cancellingOrder}
      />
    </>
  );
};

export default OrdersContainer;
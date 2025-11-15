import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import api from '@/api/axios';
import { toast } from 'sonner';
import type { Order } from '@/types/order';
import type { RootState, AppDispatch } from '@/store';
import { 
  setOrders, 
  setOrdersLoading, 
  setOrdersError, 
  updateOrderStatus 
} from '@/slices/orderSlice';

export const useOrders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  const { orders, loading } = useSelector((state: RootState) => state.orders);
  
  const [expandedOrders, setExpandedOrders] = useState<string[]>([]);
  const [cancellingOrder, setCancellingOrder] = useState<string | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState<string | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true); // ✅ Track initial load locally

  // Fetch Orders
  const fetchOrders = async () => {
    try {
      dispatch(setOrdersLoading(true));
      dispatch(setOrdersError(null));

      const response = await api.get('/orders');
      const data = response.data.orders || response.data.data || [];

      dispatch(setOrders(data));
    } catch (error: any) {
      console.error('Failed to fetch orders:', error);

      const errorMsg = error.response?.data?.message || 'Failed to fetch orders';
      dispatch(setOrdersError(errorMsg));
      
      if (error.response?.status !== 401 && error.response?.status !== 403) {
        toast.error(errorMsg);
      }
    } finally {
      setIsInitialLoad(false); // ✅ Mark initial load as complete
    }
  };

  // Cancel Order
  const openCancelModal = (orderId: string) => {
    setOrderToCancel(orderId);
    setShowCancelModal(true);
  };

  const closeCancelModal = () => {
    if (!cancellingOrder) {
      setShowCancelModal(false);
      setOrderToCancel(null);
    }
  };

  const handleCancelOrder = async () => {
    if (!orderToCancel) return;

    try {
      setCancellingOrder(orderToCancel);

      const response = await api.patch(`/orders/${orderToCancel}/cancel`);

      dispatch(updateOrderStatus({ 
        orderId: orderToCancel, 
        status: 'cancelled' 
      }));

      toast.success(response.data.message || 'Order cancelled successfully');

      closeCancelModal();

      await fetchOrders();
    } catch (error: any) {
      console.error('Failed to cancel order:', error);
      
      if (error.response?.status !== 401 && error.response?.status !== 403) {
        toast.error(error.response?.data?.message || 'Failed to cancel order');
      }
    } finally {
      setCancellingOrder(null);
    }
  };

  // Helpers
  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrders(prev =>
      prev.includes(orderId)
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const getStatusStep = (status: Order['orderStatus']) => {
    const steps = ['pending', 'confirmed', 'shipped', 'delivered'];
    return steps.indexOf(status) + 1;
  };

  const canCancelOrder = (status: Order['orderStatus']) => {
    return status === 'pending' || status === 'confirmed';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const navigateToProduct = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const navigateToHome = () => {
    navigate('/');
  };

  // Load Orders on Mount
  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    loading: isInitialLoad || loading, // ✅ Show loading during initial load OR when fetching
    expandedOrders,
    cancellingOrder,
    showCancelModal,
    fetchOrders,
    openCancelModal,
    closeCancelModal,
    handleCancelOrder,
    toggleOrderExpansion,
    getStatusStep,
    canCancelOrder,
    formatDate,
    navigateToProduct,
    navigateToHome,
  };
};
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import api from "@/api/axios";
import { toast } from "sonner";
import type { RootState, AppDispatch } from "@/store";
import type { Order } from "@/types/order";
import {
  setOrders,
  setOrdersLoading,
  setOrdersError,
  updateOrderStatus,
  setLoadedOnce,
} from "@/slices/orderSlice";

export const useOrders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { orders, loading, loadedOnce } = useSelector(
    (state: RootState) => state.orders
  );

  const [expandedOrders, setExpandedOrders] = useState<string[]>([]);
  const [cancellingOrder, setCancellingOrder] = useState<string | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState<string | null>(null);
  const [forceLoading, setForceLoading] = useState(false);


  const location = useLocation();
const orderSuccess = location.state?.orderSuccess;

  // Fetch Orders
 const fetchOrders = async (force = false) => {
  if (loadedOnce && !force) return;

  if (force) setForceLoading(true);

  try {
    dispatch(setOrdersLoading(true));
    dispatch(setOrdersError(null));

    const res = await api.get("/orders");
    const data = res.data.orders || res.data.data || [];

    dispatch(setOrders(data));
  } catch (error: any) {
    console.error("Failed to fetch orders:", error);
    const msg = error.response?.data?.message || "Failed to fetch orders";
    dispatch(setOrdersError(msg));
    if (![401, 403].includes(error.response?.status)) toast.error(msg);
  } finally {
    dispatch(setLoadedOnce());
    if (force) setForceLoading(false);
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

      const res = await api.patch(`/orders/${orderToCancel}/cancel`);

      dispatch(
        updateOrderStatus({
          orderId: orderToCancel,
          status: "cancelled",
        })
      );

      toast.success(res.data.message || "Order cancelled successfully");

      closeCancelModal();

      await fetchOrders(true); 
    } catch (error: any) {
      console.error("Cancel order error:", error);
      if (![401, 403].includes(error.response?.status)) {
        toast.error(error.response?.data?.message || "Failed to cancel order");
      }
    } finally {
      setCancellingOrder(null);
    }
  };

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const getStatusStep = (status: Order["orderStatus"]) => {
    const steps = ["pending", "confirmed", "shipped", "delivered"];
    return steps.indexOf(status) + 1;
  };

  const canCancelOrder = (status: Order["orderStatus"]) =>
    status === "pending" || status === "confirmed";

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const navigateToProduct = (productId: string) => navigate(`/product/${productId}`);

  const navigateToHome = () => navigate("/");

useEffect(() => {
  if (orderSuccess) {
    fetchOrders(true);
    navigate(location.pathname, { replace: true, state: {} });
  } else {
    fetchOrders();
  }
}, [orderSuccess]);



  return {
    orders,
    loading,
    loadedOnce,
    forceLoading,
    expandedOrders,
    cancellingOrder,
    showCancelModal,
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

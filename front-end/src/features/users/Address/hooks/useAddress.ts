    import { useEffect } from "react";
    import { useDispatch, useSelector } from "react-redux";
    import { toast } from "sonner";
    import api from "@/api/axios";
    import type { RootState, AppDispatch } from "@/store";
    import type { Address, AddressFormData } from "@/types/address";
    import {
    setAddressLoading,
    setActionLoading,
    setAddressError,
    setAddresses,
    addAddress as addAddressAction,
    updateAddress as updateAddressAction,
    removeAddress as removeAddressAction,
    setSelectedAddress,
    setDefaultAddress as setDefaultAddressAction,
    clearAddresses,
    } from "@/slices/addressSlice";

    export const useAddress = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { addresses, selectedAddress, loading, actionLoading, error } = useSelector(
        (state: RootState) => state.address
    );

    // Fetch all addresses
    const fetchAddresses = async () => {
        try {
        dispatch(setAddressLoading(true));
        const res = await api.get("/addresses");
        dispatch(setAddresses(res.data.addresses || []));
        
        // Auto-select default address if none selected
        if (!selectedAddress && res.data.addresses?.length > 0) {
            const defaultAddr = res.data.addresses.find((addr: Address) => addr.isDefault);
            if (defaultAddr) {
            dispatch(setSelectedAddress(defaultAddr));
            }
        }
        } catch (error: any) {
        console.error("Fetch addresses error:", error);
        dispatch(setAddressError(error.response?.data?.message || "Failed to fetch addresses"));
        if (error.response?.status !== 401) {
            toast.error(error.response?.data?.message || "Failed to fetch addresses");
        }
        } finally {
        dispatch(setAddressLoading(false));
        }
    };

    // Get single address
    const getAddress = async (addressId: string) => {
        try {
        const res = await api.get(`/addresses/${addressId}`);
        return res.data.address;
        } catch (error: any) {
        console.error("Get address error:", error);
        toast.error(error.response?.data?.message || "Failed to fetch address");
        return null;
        }
    };

    // Get default address
    const getDefaultAddress = async () => {
        try {
        const res = await api.get("/addresses/default");
        return res.data.address;
        } catch (error: any) {
        if (error.response?.status === 404) {
            return null; // No default address
        }
        console.error("Get default address error:", error);
        return null;
        }
    };

    // Add new address
    const addAddress = async (addressData: AddressFormData) => {
        try {
        dispatch(setActionLoading(true));
        const res = await api.post("/addresses/add", addressData);
        dispatch(addAddressAction(res.data.address));
        
        // Update full list
        dispatch(setAddresses(res.data.addresses || []));
        
        // If it's default, select it
        if (res.data.address.isDefault) {
            dispatch(setSelectedAddress(res.data.address));
        }
        
        toast.success("Address added successfully");
        return res.data.address;
        } catch (error: any) {
        console.error("Add address error:", error);
        toast.error(error.response?.data?.message || "Failed to add address");
        return null;
        }
        finally {
        dispatch(setActionLoading(false));
        }
    };

    // Update address
    const updateAddress = async (
        addressId: string,
        addressData: Partial<AddressFormData>
    ) => {
        dispatch(setActionLoading(true));
        try {
        const res = await api.put(`/addresses/update/${addressId}`, addressData);
        dispatch(updateAddressAction(res.data.address));
        
        // Update full list
        dispatch(setAddresses(res.data.addresses || []));
        
        // Update selected if it's the same address
        if (selectedAddress?._id === addressId) {
            dispatch(setSelectedAddress(res.data.address));
        }
        
        toast.success("Address updated successfully");
        return res.data.address;
        } catch (error: any) {
        console.error("Update address error:", error);
        toast.error(error.response?.data?.message || "Failed to update address");
        return null;
        }
        finally {
        dispatch(setActionLoading(false));
        }
    };

    // Delete address
    const deleteAddress = async (addressId: string) => {
        try {
        dispatch(setActionLoading(true));
        const res = await api.delete(`/addresses/delete/${addressId}`);
        dispatch(removeAddressAction(addressId));
        
        // Update full list
        dispatch(setAddresses(res.data.addresses || []));
        
        toast.success("Address deleted successfully");
        return true;
        } catch (error: any) {
        console.error("Delete address error:", error);
        dispatch(setActionLoading(false));
        toast.error(error.response?.data?.message || "Failed to delete address");
        return false;
        }
    };

    // Set default address
    const setDefault = async (addressId: string) => {
        try {
        dispatch(setActionLoading(true));
        const res = await api.patch(`/addresses/default/${addressId}`);
        dispatch(setDefaultAddressAction(addressId));
        
        // Update full list
        dispatch(setAddresses(res.data.addresses || []));
        
        // Update selected address
        dispatch(setSelectedAddress(res.data.address));
        
        toast.success("Default address updated");
        return res.data.address;
        } catch (error: any) {
        console.error("Set default address error:", error);
        dispatch(setActionLoading(false));
        toast.error(error.response?.data?.message || "Failed to set default address");
        return null;
        }
    };

    // Select address for checkout
    const selectAddress = (address: Address | null) => {
        dispatch(setSelectedAddress(address));
    };

    // Clear all addresses (on logout)
    const clearAllAddresses = () => {
        dispatch(clearAddresses());
    };

    // Get default from local state
    const getDefaultFromState = () => {
        return addresses.find((addr) => addr.isDefault) || null;
    };

   useEffect(() => {
    if (addresses.length === 0) {
        fetchAddresses();
    }
}, []);

    return {
        addresses,
        selectedAddress,
        loading,
        actionLoading,
        error,
        fetchAddresses,
        getAddress,
        getDefaultAddress,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefault,
        selectAddress,
        clearAllAddresses,
        getDefaultFromState,
    };
    };
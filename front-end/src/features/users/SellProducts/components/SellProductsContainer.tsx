import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "@/store";
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { syncUserData } from "@/utils/syncUser";
import AddProductForm from "./AddProductForm";
import BecomeSeller from "./BecomeSeller";
import ProductList from "./ProductList";

const SellProductsContainer = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | undefined>(undefined);
  const [syncingUser, setSyncingUser] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        await syncUserData(dispatch);
      }
      setSyncingUser(false);
    };

    fetchUserData();
  }, [dispatch, user?._id]);

  const handleAddProductClick = () => {
    setEditingProductId(undefined);
    setShowAddForm(true);
  };

  const handleEditProduct = (productId: string) => {
    setEditingProductId(productId);
    setShowAddForm(true);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
    setEditingProductId(undefined);
  };

  if (!user) {
    return (
      <div className="p-8 text-center text-gray-700">
        Please log in to access seller features.
      </div>
    );
  }

  if (syncingUser && user.userType !== "seller") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-700 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {showAddForm ? (
        <AddProductForm onClose={handleCloseForm} productId={editingProductId} />
      ) : (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {user.userType === "buyer" ? (
              <BecomeSeller />
            ) : (
              <>
                <div className="flex justify-between mb-6">
                  <h1 className="sm:text-3xl text-xl md:text-3xl font-bold text-blue-900 mb-4">
                    Seller Dashboard
                  </h1>
                  <button
                    onClick={handleAddProductClick}
                    className="sm:text-lg text-xs md:text-base px-4 py-3 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-lg flex items-center gap-2 hover:from-blue-700 hover:to-blue-900 transition-all shadow-md hover:shadow-lg font-semibold"
                  >
                    <Plus size={20} /> Sell Product
                  </button>
                </div>

                <ProductList onEditProduct={handleEditProduct} />
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SellProductsContainer;
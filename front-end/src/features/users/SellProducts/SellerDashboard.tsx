import { useSelector } from "react-redux";
import { type RootState } from "@/store";
import BecomeSeller from "./components/BecomeSeller";
import ProductList from "./components/ProductList";
import AddProductForm from "./components/AddProductForm";
import { useState } from "react";
import { Plus } from "lucide-react";

const SellerDashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddProductClick = () => {
    setShowAddForm(true);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
  };

  if (!user) {
    return (
      <div className="p-8 text-center text-gray-700">
        Please log in to access seller features.
      </div>
    );
  }

  return (
    <>
      {showAddForm ? (
        // Show Add Product Form on full page
        <AddProductForm onClose={handleCloseForm} />
      ) : (
        // Show Dashboard
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Seller Dashboard
            </h1>

            {user.userType === "buyer" ? (
              <BecomeSeller />
            ) : (
              <>
                <div className="flex justify-end mb-6">
                  <button
                    onClick={handleAddProductClick}
                    className="px-6 py-3 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-lg flex items-center gap-2 hover:from-blue-700 hover:to-blue-900 transition-all shadow-md hover:shadow-lg font-semibold"
                  >
                    <Plus size={20} /> Sell Product
                  </button>
                </div>

                <ProductList />
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SellerDashboard;
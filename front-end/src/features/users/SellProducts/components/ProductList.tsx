import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { useSellerProducts } from "../hooks/useSellerProducts";
import ProductListSkeleton from "./ProductListSkeleton";
import Pagination from "@/components/common/Pagination";
import DeleteConfirmModal from "@/components/common/DeleteConfirmModal";

const ProductList = ({
  onEditProduct,
}: {
  onEditProduct: (productId: string) => void;
}) => {
  const {
    products,
    totalPages,
    currentPage,
    loading,
    fetchSellerProducts,
    deleteSellerProductById,
  } = useSellerProducts();

  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (products.length === 0) {
      fetchSellerProducts(currentPage);
    }
  }, [currentPage]);

  const handleDeleteClick = (productId: string) => {
    setSelectedProductId(productId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedProductId) {
      await deleteSellerProductById(selectedProductId);
    }
  };

  // 🧩 Function to determine stock status color and label
  const getStockStatus = (stock: number) => {
    if (stock <= 0)
      return { text: "Out of Stock", color: "bg-red-100 text-red-700" };
    if (stock < 5)
      return {
        text: `Low Stock (${stock})`,
        color: "bg-orange-100 text-orange-700",
      };
    return {
      text: `In Stock (${stock})`,
      color: "bg-green-100 text-green-700",
    };
  };

  return (
    <div className="h-[100vh] flex flex-col">
      {/* Products Section */}
      <div className="flex-grow overflow-y-auto scrollbar-hide  sm:px-4 lg:px-4 pb-8">
        {loading ? (
          <ProductListSkeleton />
        ) : (
          <>
            {products.length === 0 ? (
              <div className="text-center py-10 text-blue-800">
                Add products to start selling!
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {products.map((p: any) => {
                  const stockStatus = getStockStatus(p.stock || 0);
                  return (
                    <div
                      key={p._id}
                      className="bg-white rounded-md sm:rounded-lg shadow-md sm:shadow-lg hover:shadow-xl transition-shadow flex flex-col relative"
                    >
                      {/* Delete Button */}
                      <button
                        onClick={() => handleDeleteClick(p._id)}
                        className="absolute top-2 right-2 z-10 bg-white rounded-full p-1.5 shadow-md hover:shadow-lg text-red-600 hover:text-red-800 transition-all"
                      >
                        <Trash2 size={16} />
                      </button>

                      {/* Image Section */}
                      <div className="h-32 sm:h-40 md:h-48 overflow-hidden flex items-center justify-center py-1 sm:py-4 bg-white rounded-t-md sm:rounded-t-lg">
                        <img
                          src={
                            p.images?.[0] ||
                            "https://via.placeholder.com/200x200?text=No+Image"
                          }
                          alt={p.name}
                          className="object-contain h-full w-full transform transition-transform duration-300 ease-in-out hover:scale-110"
                        />
                      </div>

                      {/* Content Section */}
                      <div className="p-2 sm:p-3 flex flex-col flex-grow">
                        {/* Name + Stock Badge */}
                        <div className="flex justify-between items-center gap-2 mb-1">
                          <h3 className="text-[10px] sm:text-sm font-semibold text-gray-800 truncate flex-1">
                            {p.name}
                          </h3>

                          {/* ✅ Stock Badge */}
                          <span
                            className={`text-[8px] z-100 sm:text-xs font-medium px-1.5 py-0.5 rounded ${stockStatus.color}`}
                          >
                            {stockStatus.text}
                          </span>
                        </div>

                        <span className="text-[8px] sm:text-xs text-gray-600 mb-1">
                          {p.brand}
                        </span>

                        <div className="price-display flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-0.5 sm:gap-1">
                          <span className="text-[10px] sm:text-sm font-bold text-gray-900">
                            ₹{p.discountedPrice}
                          </span>
                          <div className="flex items-center gap-1">
                            <span className="text-[8px] sm:text-xs line-through text-gray-500">
                              ₹{p.actualPrice}
                            </span>
                            <span className="text-[8px] sm:text-xs text-green-600">
                              {p.discountPercentage}% OFF
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => onEditProduct(p._id)}
                          className="w-full bg-gray-900 hover:bg-gray-800 text-white text-[10px] sm:text-sm font-medium py-1.5 sm:py-2 rounded transition-colors"
                        >
                          Edit Product
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => fetchSellerProducts(page)}
        />
      )}

      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
      />
    </div>
  );
};

export default ProductList;

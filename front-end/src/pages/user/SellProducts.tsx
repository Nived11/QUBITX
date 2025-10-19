import { useState } from 'react';
import { Edit, Trash2, Plus } from 'lucide-react';

const SellProducts = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'boAt Rockerz 430 Bluetooth Headphones',
      brand: 'boAt',
      category: 'Electronics',
      price: 1299,
      originalPrice: 2999,
      discount: 57,
      stock: 15,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'
    },
    {
      id: 2,
      name: 'Sony WH-1000XM5 Wireless Headphones',
      brand: 'Sony',
      category: 'Electronics',
      price: 2499,
      originalPrice: 4999,
      discount: 50,
      stock: 8,
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=400&fit=crop'
    },
    {
      id: 3,
      name: 'Apple AirPods Pro 2nd Gen',
      brand: 'Apple',
      category: 'Electronics',
      price: 3999,
      originalPrice: 5999,
      discount: 33,
      stock: 3,
      image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop'
    },
    {
      id: 4,
      name: 'JBL Flip 6 Portable Speaker',
      brand: 'JBL',
      category: 'Electronics',
      price: 899,
      originalPrice: 1799,
      discount: 50,
      stock: 20,
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop'
    },
    {
      id: 5,
      name: 'Samsung Galaxy Buds Pro',
      brand: 'Samsung',
      category: 'Electronics',
      price: 1599,
      originalPrice: 2999,
      discount: 47,
      stock: 0,
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop'
    },
    {
      id: 6,
      name: 'Logitech MX Master 3S Mouse',
      brand: 'Logitech',
      category: 'Accessories',
      price: 799,
      originalPrice: 1299,
      discount: 38,
      stock: 12,
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop'
    }
  ]);

  const handleDelete = (id:Number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleEdit = (id:Number) => {
    alert(`Edit product with ID: ${id}`);
  };

  const getStockStatus = (stock:any) => {
    if (stock === 0) return { text: 'Out of Stock', color: 'bg-red-100 text-red-700' };
    if (stock < 5) return { text: `Low Stock (${stock})`, color: 'bg-orange-100 text-orange-700' };
    return { text: `In Stock (${stock})`, color: 'bg-green-100 text-green-700' };
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center gap-2 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
              My Products
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Manage your product inventory
            </p>
          </div>
          <button className="h-[32px] sm:h-[40px] px-2.5 sm:px-6 bg-gradient-to-br from-blue-600 to-blue-800 hover:bg-blue-700 text-white rounded-md sm:rounded-lg flex items-center justify-center gap-1 sm:gap-2 transition-colors flex-shrink-0 text-xs sm:text-base">
            <Plus size={16} className="sm:w-5 sm:h-5" />
            <span className="whitespace-nowrap">Sell Product</span>
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          {products.map((product) => {
            const stockStatus = getStockStatus(product.stock);
            return (
              <div
                key={product.id}
                className="bg-white rounded-md sm:rounded-lg shadow-md hover:shadow-xl transition-shadow flex flex-col relative"
              >
                {/* Action Buttons */}
                <div className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 flex gap-1 sm:gap-1.5 z-10">
                  <button
                    onClick={() => handleEdit(product.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-1 sm:p-1.5 rounded transition-colors"
                    aria-label="Edit product"
                  >
                    <Edit size={12} className="sm:w-4 sm:h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 hover:bg-red-600 text-white p-1 sm:p-1.5 rounded transition-colors"
                    aria-label="Delete product"
                  >
                    <Trash2 size={12} className="sm:w-4 sm:h-4" />
                  </button>
                </div>

                {/* Image */}
                <div className="h-32 sm:h-40 md:h-48 overflow-hidden flex items-center justify-center py-1 sm:py-4 bg-white rounded-t-md sm:rounded-t-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-contain h-full w-full transform transition-transform duration-300 ease-in-out hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/200x200?text=No+Image';
                    }}
                  />
                </div>

                {/* Product Info */}
                <div className="p-1.5 sm:p-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-0.5 sm:mb-1">
                    <h3 className="text-[10px] sm:text-sm font-semibold text-gray-800 line-clamp-1 mb-0.5 sm:mb-0">
                      {product.name}
                    </h3>
                    <span className="bg-blue-100 text-blue-800 text-[8px] sm:text-xs font-medium px-1 sm:px-1.5 py-0.5 rounded whitespace-nowrap self-start">
                      {product.category}
                    </span>
                  </div>

                  <div className="mb-0.5 sm:mb-1 flex items-center">
                    <span className="text-[8px] sm:text-xs text-gray-600">
                      {product.brand}
                    </span>
                  </div>

                  {/* Stock Status */}
                  <div className="mb-1 sm:mb-2">
                    <span className={`text-[8px] sm:text-xs font-medium px-1 sm:px-1.5 py-0.5 rounded ${stockStatus.color}`}>
                      {stockStatus.text}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="price-display flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-0.5 sm:gap-1">
                    <span className="text-[10px] sm:text-sm font-bold text-gray-900">
                      ₹{product.price}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-[8px] sm:text-xs line-through text-gray-500">
                        ₹{product.originalPrice}
                      </span>
                      <span className="text-[8px] sm:text-xs text-green-600">
                        {product.discount}% OFF
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="bg-white rounded-lg p-12 text-center text-gray-500 shadow-sm">
            <p className="text-lg">No products yet</p>
            <p className="text-sm mt-2">Add your first product to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellProducts;
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";

const ProductList = () => {
  const [products] = useState([
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

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.length === 0 ? (
        <div className="col-span-full text-center py-8 text-gray-600 bg-white rounded-lg shadow-sm">
          No products listed yet.
        </div>
      ) : (
        products.map((p) => (
          <div key={p.id} className="bg-white p-3 rounded-md shadow">
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="font-semibold text-sm mt-2">{p.name}</h3>
            <p className="text-gray-600 text-xs">{p.brand}</p>
            <p className="text-gray-900 font-bold mt-1">₹{p.price}</p>
            <div className="flex justify-end gap-2 mt-2">
              <button className="text-blue-600 hover:text-blue-800">
                <Edit size={16} />
              </button>
              <button className="text-red-600 hover:text-red-800">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductList;

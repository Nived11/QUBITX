import { useState } from "react";
import BackButton from "../../components/common/BackButton";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      price: 4999,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
      brand: "AudioTech"
    },
    {
      id: 2,
      name: "Wireless Headphones",
      price: 4999,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
      brand: "AudioTech"
    },
    {
      id: 3,
      name: "Wireless Headphones",
      price: 4999,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
      brand: "AudioTech"
    },
    {
      id: 4,
      name: "Wireless Headphones",
      price: 4999,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
      brand: "AudioTech"
    },
    {
      id: 5,
      name: "Smart Watch",
      price: 12999,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
      brand: "TechWear"
    },
    {
      id: 6,
      name: "Laptop Stand",
      price: 1499,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop",
      brand: "DeskPro"
    }
  ]);

  const updateQuantity = (id: number, action: string) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        if (action === "increase") {
          return { ...item, quantity: item.quantity + 1 };
        } else if (action === "decrease" && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
      }
      return item;
    }));
  };

  const setQuantityManually = (id: number, value: string) => {
    const qty = parseInt(value) || 1;
    if (qty >= 1) {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity: qty } : item
      ));
    }
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = 500;
  const shipping = subtotal > 5000 ? 0 : 100;
  const total = subtotal - discount + shipping;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-4">
      <div className="container mx-auto px-4 md:px-4 ">
        <BackButton/>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <svg className="w-24 h-24 mx-auto text-blue-800 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
            <p className="text-gray-500">Add items to get started!</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-4 md:gap-8 ">
            {/* Left Side - Cart Items */}
            <div className="lg:col-span-2 space-y-3 bg-white rounded-lg shadow-md p-2 md:p-6">
                <div className="flex justify-between items-center mb-4">
                <h2 className="text-base sm:text-xl font-semibold text-blue-700">Your Cart</h2>
                <button 
                onClick={() => navigate("/")}
                className="text-blue-700 hover:text-blue-600 transition underline text-sm sm:text-base">Add more items</button>
                </div>
                <div className="space-y-3 overflow-y-auto max-h-[60vh] lg:max-h-[70vh] h-auto sm:h-[70vh]   scrollbar-hide">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md p-3 flex gap-2 md:gap-3">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500">{item.brand}</p>
                        <h3 className="text-sm md:text-base font-semibold text-gray-900 truncate">{item.name}</h3>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 transition ml-2 flex-shrink-0"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>

                    <p className="text-base md:text-lg font-bold text-blue-800 mb-2">₹{(item.price * item.quantity).toLocaleString()}</p>

                    {/* Quantity Controls */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, "decrease")}
                          className="px-2 py-1 hover:bg-gray-100 transition"
                          disabled={item.quantity === 1}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                          </svg>
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => setQuantityManually(item.id, e.target.value)}
                          className="w-10 sm:w-12 text-center py-1 border-x border-gray-300 font-semibold focus:outline-none text-sm"
                        />
                        <button
                          onClick={() => updateQuantity(item.id, "increase")}
                          className="px-2 py-1 hover:bg-gray-100 transition"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
                </div>
            </div>

            {/* Right Side - Bill Summary (Sticky) */}
            <div className="lg:sticky lg:top-[6rem] lg:h-fit">
              <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 border-b-2 border-blue-800 pb-3">
                  Order Summary
                </h2>

                {/* Bill Details */}
                <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                  <div className="flex justify-between text-sm md:text-base text-gray-800">
                    <span>Total Items:</span>
                    <span className="font-semibold">{totalItems}</span>
                  </div>

                  <div className="flex justify-between text-sm md:text-base text-gray-800">
                    <span>Subtotal:</span>
                    <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-sm md:text-base text-green-600">
                    <span>Discount:</span>
                    <span className="font-semibold">-₹{discount}</span>
                  </div>

                  <div className="flex justify-between text-sm md:text-base text-gray-800">
                    <span>Shipping:</span>
                    <span className="font-semibold">
                      {shipping === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `₹${shipping}`
                      )}
                    </span>
                  </div>

                  {subtotal < 5000 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 md:p-3 text-xs md:text-sm text-yellow-800">
                      Add ₹{(5000 - subtotal).toLocaleString()} more for FREE shipping!
                    </div>
                  )}

                  <div className="border-t-2 border-gray-300 pt-3 md:pt-4">
                    <div className="flex justify-between text-lg md:text-xl font-bold text-gray-900">
                      <span>Total Amount:</span>
                      <span className="text-blue-800">₹{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <button className="w-full bg-gradient-to-r from-blue-800 to-blue-900 text-white py-2.5 md:py-3 rounded-lg text-sm md:text-base font-semibold hover:opacity-90 transition shadow-md mb-2 md:mb-3">
                  Proceed to Buy
                </button>

                {/* Additional Info */}
                <div className="mt-4 md:mt-6 space-y-2 md:space-y-3">
                  <div className="flex items-start gap-2 text-xs md:text-sm text-gray-800">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Secure checkout guaranteed</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs md:text-sm text-gray-800">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Easy returns within 7 days</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs md:text-sm text-gray-800">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>24/7 customer support</span>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
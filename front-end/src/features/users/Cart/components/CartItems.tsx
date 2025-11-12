import { useFetchCart } from "../hooks/useFetchCart";
import { useNavigate } from "react-router-dom";
import CartSkeleton from "./CartSkeleton";
import { FiArrowDown } from "react-icons/fi";

const CartItems = () => {
  const { cart, loading, error, removeCartItem, updateCartItem } = useFetchCart();
  const navigate = useNavigate();

  const cartItems = cart?.items || [];

  const subtotal = cartItems.reduce((acc, item) => {
    const price = Number(item?.product?.actualPrice) || 0;
    const qty = Number(item?.quantity) || 0;
    return acc + price * qty;
  }, 0);

  const total = cartItems.reduce((acc, item) => {
    const price = Number(item?.product?.discountedPrice) || 0;
    const qty = Number(item?.quantity) || 0;
    return acc + price * qty;
  }, 0);

  const discount = subtotal - total;
  const shipping = total > 500 ? 0 : 50;
  const grandTotal = total + shipping;




  if (loading) {
    return <CartSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center py-16 text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  return (

    <>
      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <svg className="w-24 h-24 mx-auto text-blue-800 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Add items to get started!</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-blue-800 text-white rounded-lg shadow-md hover:bg-blue-900 transition duration-300"
          >
            Start Shopping
          </button>
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

              {cartItems.map((item ) => (
                <div key={item.product._id} className="bg-white rounded-lg shadow-md p-3 flex gap-2 md:gap-3">
                  {/* Product Image */}
                  <div className="flex-shrink-0 cursor-pointer"
                    onClick={() => navigate(`/product/${item.product._id}`)} key={item.product._id}>
                    <img
                      src={item.images[0]}
                      alt={item.product.name}
                      className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500">{item.product.brand}</p>
                        <h3 className="text-sm md:text-base font-semibold text-gray-900 line-clamp-2">{item.product.name}</h3>
                      </div>
                      <button
                        onClick={() => removeCartItem(item.product._id)}
                        className="text-red-500 hover:text-red-700 transition ml-2 flex-shrink-0"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center">
                      <p className="text-sm line-through text-red-500 mb-2 mr-2">
                        ₹{(item.product.actualPrice * item.quantity).toLocaleString()}
                      </p>

                      <p className="text-base md:text-xl font-bold text-blue-800 mb-2">
                        ₹{(item.product.discountedPrice * item.quantity).toLocaleString()}
                      </p>

                      <div className="flex items-center text-green-700 mb-2 ml-2">
                        <FiArrowDown className="w-4 h-4  relative bottom-[1px]" />
                        <p className="text-sm font-semibold">
                          {item.product.discountPercentage.toLocaleString()}%
                        </p>
                      </div>
                    </div>


                    {/* Quantity Controls */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() =>
                            item.quantity > 1 && updateCartItem(item.product._id, item.quantity - 1)
                          }
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
                          readOnly
                          className="w-10 sm:w-12 text-center py-1 border-x border-gray-300 font-semibold focus:outline-none text-sm"
                        />
                        <button
                          onClick={() => updateCartItem(item.product._id, item.quantity + 1)}
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
                  <span className="font-semibold">{cartItems.length}</span>
                </div>

                <div className="flex justify-between text-sm md:text-base text-gray-800">
                  <span>Subtotal:</span>
                  <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-sm md:text-base text-green-600">
                  <span>Discount:</span>
                  <span className="font-semibold"> -₹{discount.toLocaleString()}</span>
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

                {subtotal < 500 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 md:p-3 text-xs md:text-sm text-yellow-800">
                    Add ₹{(500 - subtotal).toLocaleString()} more for FREE shipping!
                  </div>
                )}

                <div className="border-t-2 border-gray-300 pt-3 md:pt-4">
                  <div className="flex justify-between text-lg md:text-xl font-bold text-gray-900">
                    <span>Total Amount:</span>
                    <span className="text-blue-800">₹{grandTotal.toLocaleString()}</span>
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
    </>
  );
}
export default CartItems;

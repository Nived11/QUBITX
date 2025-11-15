interface PriceSummaryProps {
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  showLabel?: boolean;
}
 const PriceSummary = ({ 
  subtotal, 
  discount, 
  shipping, 
  total,
  showLabel = false 
}: PriceSummaryProps) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Subtotal:</span>
        <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
      </div>
      <div className="flex justify-between text-sm text-green-600">
        <span>Discount:</span>
        <span className="font-semibold">-₹{discount.toLocaleString()}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Shipping:</span>
        <span className="font-semibold">
          {shipping === 0 ? "FREE" : `₹${shipping}`}
        </span>
      </div>
      <div className="border-t pt-2 flex justify-between text-lg font-bold">
        <span>{showLabel ? "Total Amount:" : "Total:"}</span>
        <span className="text-blue-800">₹{total.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default PriceSummary;
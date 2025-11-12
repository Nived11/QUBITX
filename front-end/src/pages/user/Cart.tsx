import BackButton from "../../components/common/BackButton";
import { useFetchCart } from "../../features/users/Cart/hooks/useFetchCart";
import {CartItems} from "../../features/users/Cart";

const Cart = () => {

  useFetchCart();

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-4">
      <div className="container mx-auto px-4 md:px-4 ">
        <BackButton/>
        <CartItems/>
        
      </div>
    </div>
  );
};

export default Cart;
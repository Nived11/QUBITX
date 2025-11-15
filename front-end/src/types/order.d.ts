export interface OrderItem {
  product: {
    _id: string;
    name: string;
    brand: string;
    images: string[];
  };
  quantity: number;
  color?: string;
  price: number;
  images?: string[];
}

export interface Order {
  _id: string;
  user: string;
  address: {
    _id?: string;
    fullName: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
    country?: string;
    landmark?: string;
  };
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  paymentMethod: 'COD' | 'RAZORPAY';
  paymentStatus: 'pending' | 'paid' | 'failed';
  orderStatus: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt?: string;
}
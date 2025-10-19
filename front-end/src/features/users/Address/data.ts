export interface Address {
  id: number;
  title: string;
  line1: string;
  line2: string;
  landmark: string;
  city: string;
  state: string;
  pin: string;
}

export const addressList: Address[] = [
  {
    id: 1,
    title: "Home",
    line1: "123 Street Name",
    line2: "Apartment 4B",
    landmark: "Near Park",
    city: "Chennai",
    state: "Tamil Nadu",
    pin: "600001",
  },
  {
      id: 2,
      title: "Office",
      line1: "456 Business Street",
      landmark: "Near Office Building",
      city: "New York",
      state: "New York",
      pin: "10001",
      line2: ""
  },
];

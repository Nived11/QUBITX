import { useState } from "react";

const AddProductForm = ({ onClose }: { onClose: () => void }) => {
  const [form, setForm] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    stock: "",
    image: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, image: e.target.files?.[0] || null });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    alert("Product added successfully!");
    onClose();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-lg mx-auto relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>
      <h2 className="text-xl font-semibold mb-4">Add New Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Product Name"
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="brand"
          placeholder="Brand"
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="category"
          placeholder="Category"
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input type="file" onChange={handleImageChange} accept="image/*" />

        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;

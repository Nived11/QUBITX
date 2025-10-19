import { Outlet, Link } from "react-router-dom";

export default function AdminLayout({ isAdmin }: { isAdmin: boolean }) {
  if (!isAdmin) return <p className="p-6">Not authorized. Please login.</p>;

  return (
    <div className="min-h-screen">
      <div className="p-4 bg-gray-900 text-white flex justify-between items-center">
        <h2>Admin Panel</h2>
        <nav className="space-x-4">
          <Link to="/admin" className="text-white">Dashboard</Link>
          <Link to="/admin/products" className="text-white">Products</Link>
        </nav>
      </div>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}

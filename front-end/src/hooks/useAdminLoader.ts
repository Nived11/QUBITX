import { useEffect, useState } from "react";

/**
 * Simple hook that reads a fake "isAdmin" state from localStorage.
 * Replace with real auth check (API call / token verification) later.
 */
export const useAdminLoader = () => {
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState<boolean>(false);

  useEffect(() => {
    // simulate an async auth check
    const t = setTimeout(() => {
      const isAdmin = !!localStorage.getItem("isAdmin");
      setAdmin(isAdmin);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(t);
  }, []);

  return { admin, loading };
};

import { useEffect, useState, useRef, useCallback } from "react";
import api from "@/api/axios";
import type { Product } from "@/types/product";

export const useCategoryProducts = (categoryId: string | undefined) => {

  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [applyFilters, setApplyFilters] = useState(0);

  const loaderRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const fetchProducts = useCallback(async () => {
    if (!categoryId) return;

    setLoading(true);

    try {
      const params: Record<string, string | number> = { page };
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;

      const res = await api.get(`/products/category/${categoryId}`, { params });

      if (page === 1) setProducts(res.data.products);
      else setProducts((prev) => [...prev, ...res.data.products]);

      setHasMore(res.data.hasMore);
    } finally {
      setLoading(false);
    }
  }, [categoryId, page, minPrice, maxPrice]);


  // Fetch products whenever filter or page changes
  useEffect(() => {
    fetchProducts();
  }, [applyFilters, page]);


  // Reset page when filters or category changes
  useEffect(() => {
    setPage(1);
    setHasMore(true);
  }, [applyFilters, categoryId]);


  const scrollToTop = () => {
    listRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const applyFilter = () => {
    scrollToTop();
    setApplyFilters((prev) => prev + 1);
  };

  const resetFilter = () => {
    setMinPrice("");
    setMaxPrice("");
    scrollToTop();
    setApplyFilters((prev) => prev + 1);
  };


  // ⭐⭐⭐ Infinite Scroll Logic (MISSING BEFORE)
  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    const node = loaderRef.current;
    if (node) observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [loading, hasMore]);


  return {
    products,
    loading,
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
    applyFilter,
    resetFilter,
    loaderRef,
    listRef,
  };
};

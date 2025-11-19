import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "@/api/axios";
import { setBanners } from "@/slices/bannerSlice";
import { type RootState } from "@/store";

export const useBanners = () => {
  const dispatch = useDispatch();
  const { banners, loaded } = useSelector((state: RootState) => state.banners);

  const [loading, setLoading] = useState(!loaded);

  useEffect(() => {
    if (loaded) {
      setLoading(false);
      return; 
    }

    const fetchBanners = async () => {
      try {
        const res = await api.get("/banners");
        dispatch(setBanners(res.data));
      } catch (err) {
        console.error("Banner fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, [dispatch, loaded]);

  return { banners, loading };
};

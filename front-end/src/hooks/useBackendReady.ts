import { useEffect, useState } from "react";
import api from "@/api/axios";

export const useBackendReady = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const checkBackend = async () => {
      let attempts = 0;
      while (attempts < 10) { // retry up to 10 times
        try {
          const res = await api.get(`/wakeup`);
          if (res.status === 200) {
            setReady(true);
            return;
          }
        } catch (err) {
          console.warn("Backend not ready, retrying...");
        }
        attempts++;
        await new Promise((r) => setTimeout(r, 1000)); // retry every 1s
      }
      console.error("Backend did not respond after 10 seconds.");
    };

    checkBackend();
  }, []);

  return ready;
};

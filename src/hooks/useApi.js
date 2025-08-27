import { useEffect, useState, useCallback } from "react";
import api from "../lib/http";

export default function useApi(endpoint, { immediate = true } = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (signal) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(endpoint, { signal });
      setData(res.data);
    } catch (err) {
      if (err.name !== "CanceledError") setError(err);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    if (!immediate) return;
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
  }, [fetchData, immediate]);

  return { data, loading, error, refetch: () => fetchData() };
}

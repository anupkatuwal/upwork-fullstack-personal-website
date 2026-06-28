import { useState, useEffect } from "react";

export function useFetch(fn) {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    fn().then(setData).catch(setError).finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}

export function useInView(threshold = 0.15) {
  const [ref, setRef]       = useState(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(ref);
    return () => obs.disconnect();
  }, [ref, threshold]);

  return [setRef, inView];
}
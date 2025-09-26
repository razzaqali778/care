import { useEffect, useRef } from "react";

export function useStepPersist(
  key: string,
  getValues: () => any,
  setValues: (v: any) => void
) {
  const mounted = useRef(false);

  useEffect(() => {
    const raw = localStorage.getItem(key);
    if (raw) {
      try {
        setValues(JSON.parse(raw));
      } catch {}
    }
    mounted.current = true;
    const onStorage = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        try {
          setValues(JSON.parse(e.newValue));
        } catch {}
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [key, setValues]);

  useEffect(() => {
    if (!mounted.current) return;
    const id = setInterval(() => {
      try {
        localStorage.setItem(key, JSON.stringify(getValues()));
      } catch {}
    }, 500);
    return () => clearInterval(id);
  }, [key, getValues]);
}

export function clearDraft(key: string) {
  try {
    localStorage.removeItem(key);
  } catch {}
}

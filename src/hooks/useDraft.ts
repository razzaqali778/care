import { useEffect, useRef } from "react";
import type { UseFormReturn } from "react-hook-form";

function debounce<T extends (...args: any[]) => void>(fn: T, ms = 300) {
  let t: number | undefined;
  return (...args: Parameters<T>) => {
    window.clearTimeout(t);
    t = window.setTimeout(() => fn(...args), ms);
  };
}

export function useDraft<T extends Record<string, any>>(
  form: UseFormReturn<T>,
  draftKey: string,
  initialValues?: Partial<T>
) {
  const hydratedRef = useRef(false);

  useEffect(() => {
    if (hydratedRef.current) return;

    let draft: Partial<T> | undefined;
    try {
      const raw = localStorage.getItem(draftKey);
      if (raw) draft = JSON.parse(raw) as Partial<T>;
    } catch {}

    if (!draft && !initialValues) return;

    const next: Partial<T> = { ...(initialValues ?? {}), ...(draft ?? {}) };

    form.reset({ ...form.getValues(), ...next } as T, {
      keepDefaultValues: true,
    });

    hydratedRef.current = true;
  }, [draftKey, initialValues]);

  useEffect(() => {
    const save = debounce((values: T) => {
      try {
        localStorage.setItem(draftKey, JSON.stringify(values));
      } catch {}
    }, 300);

    const subscription = form.watch((val) => {
      save({ ...(val as any) });
    });
    return () => subscription.unsubscribe();
  }, [form, draftKey]);
}

export function clearDraft(key: string) {
  try {
    localStorage.removeItem(key);
  } catch {}
}

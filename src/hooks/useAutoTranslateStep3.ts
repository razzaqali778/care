import { useEffect, useRef, useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { ApiLang } from "@/constants/lang";
import type { ApplicationState } from "@/types/types";
import type { Step3Field } from "@/constants/step3";
import { needsTranslation } from "@/utility/text";

export function useAutoTranslateStep3<T extends Record<string, any>>(
  form: UseFormReturn<T>,
  lang: ApiLang,
  pairs: Array<[Step3Field, keyof ApplicationState["situation"]]>,
  request: (args: {
    fieldKey: keyof ApplicationState["situation"];
    application: ApplicationState;
    language: ApiLang;
    sourceText: string;
  }) => Promise<string>,
  buildAppState: () => ApplicationState
) {
  const firstRunRef = useRef(true);
  const [translating, setTranslating] = useState(false);

  useEffect(() => {
    if (firstRunRef.current) {
      firstRunRef.current = false;
      return;
    }
    let cancelled = false;
    const run = async () => {
      setTranslating(true);
      try {
        const app = buildAppState();
        for (const [fieldName, assistKey] of pairs) {
          const current = (form.getValues()[fieldName] as string) || "";
          if (!needsTranslation(current, lang)) continue;
          const translated = await request({
            fieldKey: assistKey,
            application: app,
            language: lang,
            sourceText: current,
          });
          if (!cancelled && translated && translated !== current) {
            form.setValue(fieldName as any, translated, {
              shouldDirty: true,
              shouldTouch: false,
              shouldValidate: false,
            });
          }
        }
      } finally {
        if (!cancelled) setTranslating(false);
      }
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, [lang, form, pairs, request, buildAppState]);

  return translating;
}

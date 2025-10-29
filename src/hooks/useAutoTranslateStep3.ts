import { useEffect, useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { ApiLang } from "@/constants/lang";
import type { ApplicationState } from "@/types/Types";
import type { Step3Field } from "@/constants/step3";
import { needsTranslation } from "@/utility/Text";

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
  const [translating, setTranslating] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      const app = buildAppState();
      const tasks = pairs
        .map(([fieldName, assistKey]) => ({
          fieldName,
          assistKey,
          current: (form.getValues()[fieldName] as string) || "",
        }))
        .filter(({ current }) => needsTranslation(current, lang));

      if (!tasks.length) {
        if (!cancelled) setTranslating(false);
        return;
      }

      setTranslating(true);
      try {
        for (const { fieldName, assistKey, current } of tasks) {
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

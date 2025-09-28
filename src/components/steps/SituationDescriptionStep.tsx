import { UseFormReturn } from "react-hook-form";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader2 } from "lucide-react";
import { Step3FieldBlock } from "@/components/steps/Step3FieldBlock";
import {
  STEP3_FIELDS,
  STEP3_PAIRS,
  makeInitialTouched,
  type Step3Field,
} from "@/constants/step3";
import { toApplicationState } from "@/utility/AppState";
import { toApiLang, type ApiLang } from "@/constants/lang";
import { useAutoTranslateStep3 } from "@/hooks/useAutoTranslateStep3";
import { requestAiAssist } from "@/services/Aiassist";

type FormData = {
  financialSituation: string;
  employmentCircumstance: string;
  reasonForApplying: string;
  [k: string]: any;
};

export function SituationDescriptionStep({
  form,
}: {
  form: UseFormReturn<FormData>;
}) {
  const { t, language } = useLanguage();
  const req = t("common.requiredMark");
  const lang: ApiLang = toApiLang(language as any);

  const [showErrors, setShowErrors] = useState(false);
  const [touched, setTouched] = useState(makeInitialTouched());
  const lastSubmitCount = useRef(0);

  useEffect(() => {
    setShowErrors(false);
    setTouched(makeInitialTouched());
  }, []);

  useEffect(() => {
    const sc = form.formState.submitCount;
    if (sc > lastSubmitCount.current) {
      setShowErrors(true);
      lastSubmitCount.current = sc;
    }
  }, [form.formState.submitCount]);

  const buildAppState = useMemo(
    () => () => toApplicationState(form.getValues()),
    [form]
  );

  const translating = useAutoTranslateStep3(
    form,
    lang,
    STEP3_PAIRS,
    async ({ fieldKey, application, language, sourceText }) =>
      requestAiAssist({ fieldKey, application, language, sourceText }),
    buildAppState
  );

  const onTouch = (f: Step3Field) => setTouched((s) => ({ ...s, [f]: true }));

  return (
    <div className="relative" aria-busy={translating ? "true" : undefined}>
      {translating && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/90 backdrop-blur-sm rounded-md">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="sr-only">
            {t("assist.generating") || "Generating…"}
          </span>
        </div>
      )}

      <div
        className={
          translating ? "opacity-0 pointer-events-none select-none" : ""
        }
      >
        <div className="space-y-6">
          {STEP3_FIELDS.map((field) => (
            <div key={field}>
              <Step3FieldBlock
                form={form}
                field={field}
                t={t}
                reqMark={req}
                onTouch={onTouch}
              />
              {!touched[field] && !showErrors ? null : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

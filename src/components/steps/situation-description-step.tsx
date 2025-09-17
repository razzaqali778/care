import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/language-context";
import { AiAssist } from "@/components/ai-assist";
import { useEffect, useMemo, useRef, useState } from "react";
import { requestAiAssist } from "@/services/ai-assist";
import type { ApplicationState, AssistFieldKey, Lang } from "@/types/types";
import { Loader2 } from "lucide-react";

type FormData = {
  financialSituation: string;
  employmentCircumstance: string;
  reasonForApplying: string;
  name?: string;
  nationalId?: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  phone?: string;
  email?: string;
  maritalStatus?: string;
  dependents?: string | number;
  employmentStatus?: string;
  monthlyIncome?: string | number;
  housingStatus?: string;
  [k: string]: any;
};

const FIELDS = [
  "financialSituation",
  "employmentCircumstance",
  "reasonForApplying",
] as const;

export function SituationDescriptionStep({
  form,
}: {
  form: UseFormReturn<FormData>;
}) {
  const { t, language } = useLanguage();
  const req = t("common.requiredMark");
  const lang: Lang = language === "ar" ? "ar" : "en";

  // ---- NEW: local gates so nothing shows until touched or submit clicked
  const [showErrors, setShowErrors] = useState(false);
  const [touched, setTouched] = useState<
    Record<(typeof FIELDS)[number], boolean>
  >({
    financialSituation: false,
    employmentCircumstance: false,
    reasonForApplying: false,
  });
  const lastSubmitCount = useRef(0);

  // hide everything on mount
  useEffect(() => {
    setShowErrors(false);
    setTouched({
      financialSituation: false,
      employmentCircumstance: false,
      reasonForApplying: false,
    });
  }, []);

  // turn on errors when the user presses "Submit Application"
  useEffect(() => {
    const sc = form.formState.submitCount;
    if (sc > lastSubmitCount.current) {
      setShowErrors(true);
      lastSubmitCount.current = sc;
    }
  }, [form.formState.submitCount]);

  // ---------- AI translate (unchanged logic, but silent)
  const firstRunRef = useRef(true);
  const [translating, setTranslating] = useState(false);

  const isArabic = (s: string) =>
    /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/.test(s);
  const needsTranslation = (text: string, target: Lang) => {
    if (!text || text.trim().length < 2) return false;
    const hasAr = isArabic(text);
    return target === "ar" ? !hasAr : hasAr;
  };

  const buildAppState = useMemo(
    () =>
      function build(): ApplicationState {
        const v = form.getValues();
        return {
          personal: {
            name: v.name || "",
            nationalId: v.nationalId || "",
            dob: v.dateOfBirth || "",
            gender: v.gender || "",
            address: v.address || "",
            city: v.city || "",
            state: v.state || "",
            country: v.country || "",
            phone: v.phone || "",
            email: v.email || "",
          },
          family: {
            maritalStatus: v.maritalStatus || "",
            dependents: Number(v.dependents ?? 0) || 0,
            employmentStatus: v.employmentStatus || "",
            monthlyIncome: Number(v.monthlyIncome ?? 0) || 0,
            housingStatus: v.housingStatus || "",
          },
          situation: {
            currentFinancialSituation: v.financialSituation || "",
            employmentCircumstances: v.employmentCircumstance || "",
            reasonForApplying: v.reasonForApplying || "",
          },
        };
      },
    [form]
  );

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
        const map: Array<[keyof FormData, AssistFieldKey]> = [
          ["financialSituation", "currentFinancialSituation"],
          ["employmentCircumstance", "employmentCircumstances"],
          ["reasonForApplying", "reasonForApplying"],
        ];
        for (const [name, key] of map) {
          const current = (form.getValues()[name] as string) || "";
          if (!needsTranslation(current, lang)) continue;
          const translated = await requestAiAssist({
            fieldKey: key,
            application: app,
            language: lang,
            sourceText: current,
          });
          if (!cancelled && translated && translated !== current) {
            form.setValue(name as any, translated, {
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
  }, [lang, form, buildAppState]);

  // helper: gate + current RHF error
  const fieldError = (name: keyof FormData) =>
    (form.formState.errors[name]?.message as string | undefined) || undefined;

  const canShow = (key: (typeof FIELDS)[number]) => showErrors || touched[key];

  const ErrorText = ({ text }: { text?: string }) =>
    text ? (
      <p className="text-sm font-medium text-destructive">{text}</p>
    ) : null;

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
          {/* Financial Situation */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <FormLabel htmlFor="financialSituation">
                {t("step3.financialSituation.label")} {req}
              </FormLabel>
              <AiAssist
                form={form}
                targetField="financialSituation"
                fieldKey="currentFinancialSituation"
              />
            </div>
            <FormField
              control={form.control}
              name="financialSituation"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      id="financialSituation"
                      rows={4}
                      placeholder={t("step3.financialSituation.placeholder")}
                      {...field}
                      onBlur={(e) => {
                        field.onBlur();
                        setTouched((s) => ({ ...s, financialSituation: true }));
                      }}
                    />
                  </FormControl>
                  {canShow("financialSituation") && (
                    <ErrorText text={fieldError("financialSituation")} />
                  )}
                </FormItem>
              )}
            />
          </div>

          {/* Employment Circumstances */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <FormLabel htmlFor="employmentCircumstance">
                {t("step3.employmentCircumstance.label")} {req}
              </FormLabel>
              <AiAssist
                form={form}
                targetField="employmentCircumstance"
                fieldKey="employmentCircumstances"
              />
            </div>
            <FormField
              control={form.control}
              name="employmentCircumstance"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      id="employmentCircumstance"
                      rows={4}
                      placeholder={t(
                        "step3.employmentCircumstance.placeholder"
                      )}
                      {...field}
                      onBlur={(e) => {
                        field.onBlur();
                        setTouched((s) => ({
                          ...s,
                          employmentCircumstance: true,
                        }));
                      }}
                    />
                  </FormControl>
                  {canShow("employmentCircumstance") && (
                    <ErrorText text={fieldError("employmentCircumstance")} />
                  )}
                </FormItem>
              )}
            />
          </div>

          {/* Reason for Applying */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <FormLabel htmlFor="reasonForApplying">
                {t("step3.reasonForApplying.label")} {req}
              </FormLabel>
              <AiAssist
                form={form}
                targetField="reasonForApplying"
                fieldKey="reasonForApplying"
              />
            </div>
            <FormField
              control={form.control}
              name="reasonForApplying"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      id="reasonForApplying"
                      rows={4}
                      placeholder={t("step3.reasonForApplying.placeholder")}
                      {...field}
                      onBlur={(e) => {
                        field.onBlur();
                        setTouched((s) => ({ ...s, reasonForApplying: true }));
                      }}
                    />
                  </FormControl>
                  {canShow("reasonForApplying") && (
                    <ErrorText text={fieldError("reasonForApplying")} />
                  )}
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

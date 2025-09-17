import * as React from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { ReloadIcon as Reload } from "@radix-ui/react-icons";
import { PenTool, Edit3, Check, X } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { requestAiAssist } from "@/services/ai-assist";
import type { AssistFieldKey, ApplicationState, Lang } from "@/types/types";

type Step3Form = {
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
};

const safeT = (t: (k: string) => string, k: string, fb: string) => {
  const v = t(k);
  return v && !v.startsWith("[") ? v : fb;
};

export function AiAssist({
  form,
  targetField,
  fieldKey,
}: {
  form: UseFormReturn<Step3Form>;
  targetField:
    | "financialSituation"
    | "employmentCircumstance"
    | "reasonForApplying";
  fieldKey: AssistFieldKey;
}) {
  const { t, language } = useLanguage();
  const labels = React.useMemo(
    () => ({
      help: safeT(t, "assist.help", t("common.helpWrite")),
      generating: safeT(t, "assist.generating", "Generating…"),
      insert: safeT(t, "assist.insert", "Insert"),
      edit: safeT(t, "assist.edit", "Edit"),
      done: safeT(t, "assist.done", "Done"),
      discard: safeT(t, "assist.discard", "Discard"),
      regenerate: safeT(t, "assist.regenerate", "Regenerate"),
      suggestion: safeT(t, "assist.suggestion", "Suggestion"),
      error: safeT(t, "assist.error", "Could not generate a suggestion."),
    }),
    [t]
  );

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [editable, setEditable] = React.useState(false);
  const [err, setErr] = React.useState<string | null>(null);

  const lang: Lang = language === "ar" ? "ar" : "en";

  function buildAppState(): ApplicationState {
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
  }

  const generate = async (seed?: string) => {
    setErr(null);
    setLoading(true);
    try {
      const draft = await requestAiAssist({
        fieldKey,
        application: buildAppState(),
        language: lang,
        sourceText: seed && seed.trim() ? seed : undefined,
      });
      setValue(draft.trim());
      setEditable(false);
    } catch (e: any) {
      setErr(e?.message || "Failed to generate suggestion.");
    } finally {
      setLoading(false);
    }
  };

  const onOpen = () => {
    setOpen(true);
    const seed = (form.getValues()[targetField] || "") as string;
    setValue(seed);
    setEditable(false);
    setErr(null);
    void generate(seed);
  };

  const onInsert = () => {
    const text = value.trim();
    if (!text) return;
    form.setValue(targetField, text, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    setOpen(false);
  };

  React.useEffect(() => {
    if (!open) return;
    const seed = (form.getValues()[targetField] || "") as string;
    void generate(seed);
  }, [language]);

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={onOpen}
        className="flex items-center gap-2"
      >
        <PenTool className="h-4 w-4" />
        {labels.help}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[640px]">
          <DialogHeader>
            <DialogTitle>{labels.help}</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <div className="relative">
              <Textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                rows={10}
                placeholder={labels.suggestion}
                readOnly={!editable || loading}
                aria-busy={loading ? "true" : undefined}
                className={loading ? "opacity-90" : ""}
              />
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/60 rounded-md">
                  <Reload
                    className="h-5 w-5 animate-spin"
                    aria-label={labels.generating}
                  />
                </div>
              )}
              {err && (
                <p className="text-sm text-destructive mt-2">{labels.error}</p>
              )}
            </div>

            <div className="flex justify-between">
              <Button
                type="button"
                variant="ghost"
                onClick={() =>
                  generate(form.getValues()[targetField] as string)
                }
                disabled={loading}
                className="gap-2"
              >
                <Reload className="h-4 w-4" />
                {labels.regenerate}
              </Button>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setEditable((v) => !v)}
                  disabled={!value || loading}
                  className="gap-2"
                >
                  {editable ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Edit3 className="h-4 w-4" />
                  )}
                  {editable ? labels.done : labels.edit}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  disabled={loading}
                  className="gap-2"
                >
                  <X className="h-4 w-4" />
                  {labels.discard}
                </Button>
                <Button
                  type="button"
                  onClick={onInsert}
                  disabled={!value || loading}
                >
                  {labels.insert}
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter />
        </DialogContent>
      </Dialog>
    </>
  );
}

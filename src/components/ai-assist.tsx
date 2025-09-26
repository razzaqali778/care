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
import type { ApplicationState } from "@/types/types";
import { makeAssistLabels, type AssistTargetField } from "@/constants/assist";
import { toApplicationState, type Step3Form } from "../utility/app-state";
import { toApiLang, type SupportedLang } from "@/constants/lang";

export function AiAssist({
  form,
  targetField,
  fieldKey,
}: {
  form: UseFormReturn<Step3Form>;
  targetField: AssistTargetField;
  fieldKey: keyof ApplicationState["situation"];
}) {
  const { t, language } = useLanguage();
  const labels = React.useMemo(() => makeAssistLabels(t), [t]);

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [editable, setEditable] = React.useState(false);
  const [err, setErr] = React.useState<string | null>(null);

  // API expects "en" | "ar"
  const lang = toApiLang(language as SupportedLang);

  const generate = async (seed?: string) => {
    setErr(null);
    setLoading(true);
    try {
      const draft = await requestAiAssist({
        fieldKey, // server-side key
        application: toApplicationState(form.getValues()),
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

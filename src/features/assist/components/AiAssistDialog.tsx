import { useEffect, useMemo, useState } from "react";
import { ReloadIcon as Reload } from "@radix-ui/react-icons";
import { PenTool, Edit3, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { makeAssistLabels } from "@/constants/assist";
import { toApiLang, type SupportedLang } from "@/constants/lang";
import { toApplicationState } from "@/utility/AppState";
import type { AiAssistProps } from "@/features/assist/types";
import { requestAiAssist } from "@/features/assist/services/aiAssist";

export const AiAssistDialog = ({
  form,
  targetField,
  fieldKey,
}: AiAssistProps) => {
  const { t, language } = useLanguage();
  const labels = useMemo(() => makeAssistLabels(t), [t]);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [editable, setEditable] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lang = toApiLang(language as SupportedLang);

  const generate = async (seed?: string) => {
    setError(null);
    setLoading(true);
    try {
      const draft = await requestAiAssist({
        fieldKey,
        application: toApplicationState(form.getValues()),
        language: lang,
        sourceText: seed && seed.trim() ? seed : undefined,
      });
      setValue(draft.trim());
      setEditable(false);
    } catch (err: any) {
      setError(err?.message || labels.error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = () => {
    setOpen(true);
    const seed = (form.getValues()[targetField] || "") as string;
    setValue(seed);
    setEditable(false);
    setError(null);
    void generate(seed);
  };

  const handleInsert = () => {
    const text = value.trim();
    if (!text) return;
    form.setValue(targetField, text, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    setOpen(false);
  };

  useEffect(() => {
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
        onClick={handleOpen}
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
                onChange={(event) => setValue(event.target.value)}
                rows={10}
                placeholder={labels.suggestion}
                readOnly={!editable || loading}
                aria-busy={loading ? "true" : undefined}
                className={loading ? "opacity-90" : ""}
              />
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center rounded-md bg-background/60">
                  <Reload
                    className="h-5 w-5 animate-spin"
                    aria-label={labels.generating}
                  />
                </div>
              )}
              {error && (
                <p className="mt-2 text-sm text-destructive">{labels.error}</p>
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
                  onClick={() => setEditable((state) => !state)}
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
                  onClick={handleInsert}
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
};

export default AiAssistDialog;

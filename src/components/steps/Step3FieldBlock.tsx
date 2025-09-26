import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { AiAssist } from "@/components/ai-assist";
import { STEP3_COPY, type Step3Field } from "@/constants/step3";
import { getFieldError } from "@/utility/form-errors";

type Props<T extends Record<string, any>> = {
  form: UseFormReturn<T>;
  field: Step3Field;
  t: (k: string) => string;
  reqMark: string;
  onTouch: (f: Step3Field) => void;
};

export function Step3FieldBlock<T extends Record<string, any>>({
  form,
  field,
  t,
  reqMark,
  onTouch,
}: Props<T>) {
  const copy = STEP3_COPY[field];
  const error = getFieldError(form as any, field as any);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <FormLabel htmlFor={copy.inputId}>
          {t(copy.labelKey)} {reqMark}
        </FormLabel>
        <AiAssist
          form={form as any}
          targetField={field}
          fieldKey={copy.assistKey}
        />
      </div>
      <FormField
        control={form.control}
        name={field as any}
        render={({ field: fld }) => (
          <FormItem>
            <FormControl>
              <Textarea
                id={copy.inputId}
                rows={4}
                placeholder={t(copy.placeholderKey)}
                {...fld}
                onBlur={() => {
                  fld.onBlur();
                  onTouch(field);
                }}
              />
            </FormControl>
            {error && (
              <p className="text-sm font-medium text-destructive">{error}</p>
            )}
          </FormItem>
        )}
      />
    </div>
  );
}

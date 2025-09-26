import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/language-context";
import type { FamilyFinancialStepProps } from "@/types/types";
import {
  STEP2_MARITAL_STATUS,
  STEP2_EMPLOYMENT_STATUS,
  STEP2_HOUSING_STATUS,
} from "@/constants/step2";

export function FamilyFinancialStep({ form }: FamilyFinancialStepProps) {
  const { t } = useLanguage();
  const req = t("common.requiredMark");

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="maritalStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("step2.maritalStatus.label")} {req}
              </FormLabel>
              <Select
                onValueChange={(v) => {
                  field.onChange(v);
                  form.trigger("maritalStatus");
                }}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={t("step2.maritalStatus.placeholder")}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {STEP2_MARITAL_STATUS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {t(opt.labelKey)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dependents"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("step2.dependents.label")}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  placeholder={t("step2.dependents.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="employmentStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("step2.employmentStatus.label")} {req}
              </FormLabel>
              <Select
                onValueChange={(v) => {
                  field.onChange(v);
                  form.trigger("employmentStatus");
                }}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={t("step2.employmentStatus.placeholder")}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {STEP2_EMPLOYMENT_STATUS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {t(opt.labelKey)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="monthlyIncome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("step2.monthlyIncome.label")}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder={t("step2.monthlyIncome.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="housingStatus"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t("step2.housingStatus.label")} {req}
            </FormLabel>
            <Select
              onValueChange={(v) => {
                field.onChange(v);
                form.trigger("housingStatus");
              }}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue
                    placeholder={t("step2.housingStatus.placeholder")}
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {STEP2_HOUSING_STATUS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {t(opt.labelKey)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

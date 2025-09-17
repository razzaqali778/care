import { UseFormReturn } from "react-hook-form";
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

interface FamilyFinancialStepProps {
  form: UseFormReturn<any>;
}

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
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={t("step2.maritalStatus.placeholder")}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="single">
                    {t("step2.maritalStatus.single")}
                  </SelectItem>
                  <SelectItem value="married">
                    {t("step2.maritalStatus.married")}
                  </SelectItem>
                  <SelectItem value="divorced">
                    {t("step2.maritalStatus.divorced")}
                  </SelectItem>
                  <SelectItem value="widowed">
                    {t("step2.maritalStatus.widowed")}
                  </SelectItem>
                  <SelectItem value="separated">
                    {t("step2.maritalStatus.separated")}
                  </SelectItem>
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
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={t("step2.employmentStatus.placeholder")}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="employed-full-time">
                    {t("step2.employmentStatus.employedFull")}
                  </SelectItem>
                  <SelectItem value="employed-part-time">
                    {t("step2.employmentStatus.employedPart")}
                  </SelectItem>
                  <SelectItem value="self-employed">
                    {t("step2.employmentStatus.selfEmployed")}
                  </SelectItem>
                  <SelectItem value="unemployed">
                    {t("step2.employmentStatus.unemployed")}
                  </SelectItem>
                  <SelectItem value="retired">
                    {t("step2.employmentStatus.retired")}
                  </SelectItem>
                  <SelectItem value="student">
                    {t("step2.employmentStatus.student")}
                  </SelectItem>
                  <SelectItem value="disabled">
                    {t("step2.employmentStatus.disabled")}
                  </SelectItem>
                  <SelectItem value="other">
                    {t("step2.employmentStatus.other")}
                  </SelectItem>
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
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue
                    placeholder={t("step2.housingStatus.placeholder")}
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="own-home">
                  {t("step2.housingStatus.ownHome")}
                </SelectItem>
                <SelectItem value="rent">
                  {t("step2.housingStatus.rent")}
                </SelectItem>
                <SelectItem value="living-with-family">
                  {t("step2.housingStatus.livingWithFamily")}
                </SelectItem>
                <SelectItem value="temporary-housing">
                  {t("step2.housingStatus.temporaryHousing")}
                </SelectItem>
                <SelectItem value="homeless">
                  {t("step2.housingStatus.homeless")}
                </SelectItem>
                <SelectItem value="other">
                  {t("step2.housingStatus.other")}
                </SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

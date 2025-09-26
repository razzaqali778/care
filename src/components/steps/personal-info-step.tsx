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
import type { SubmissionForm } from "@/types/types";
import { STEP1_GENDER_OPTIONS } from "@/constants/step1";

interface PersonalInfoStepProps {
  form: UseFormReturn<SubmissionForm>;
}

export function PersonalInfoStep({ form }: PersonalInfoStepProps) {
  const { t } = useLanguage();
  const req = t("common.requiredMark");

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("step1.name.label")} {req}
              </FormLabel>
              <FormControl>
                <Input placeholder={t("step1.name.placeholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nationalId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("step1.nationalId.label")} {req}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t("step1.nationalId.placeholder")}
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
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("step1.dateOfBirth.label")} {req}
              </FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("step1.gender.label")} {req}
              </FormLabel>
              <Select
                onValueChange={(v) => {
                  field.onChange(v);
                  form.trigger("gender");
                }}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t("step1.gender.placeholder")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {STEP1_GENDER_OPTIONS.map((opt) => (
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

      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t("step1.address.label")} {req}
            </FormLabel>
            <FormControl>
              <Input placeholder={t("step1.address.placeholder")} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("step1.city.label")} {req}
              </FormLabel>
              <FormControl>
                <Input placeholder={t("step1.city.placeholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("step1.state.label")} {req}
              </FormLabel>
              <FormControl>
                <Input placeholder={t("step1.state.placeholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("step1.country.label")} {req}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t("step1.country.placeholder")}
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
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("step1.phone.label")} {req}
              </FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder={t("step1.phone.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("step1.email.label")} {req}
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder={t("step1.email.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

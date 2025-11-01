import { type Control } from "react-hook-form";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { useLanguage } from "@/contexts/LanguageContext";
import { isRTL as isRTLLang } from "@/constants/lang";
import { PhoneInput } from "react-international-phone";
import React from "react";
import "react-international-phone/style.css";
import "@/styles/phone-rtl.css";

type Props = {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  requiredMark?: string;
  countryIso2?: string | null; // e.g., "SA"
};

const DIAL_CODES: Record<string, string> = {
  AE: "+971",
  BH: "+973",
  EG: "+20",
  IN: "+91",
  JO: "+962",
  KW: "+965",
  LB: "+961",
  MA: "+212",
  OM: "+968",
  PK: "+92",
  QA: "+974",
  SA: "+966",
  TN: "+216",
  TR: "+90",
  US: "+1",
  YE: "+967",
};

function normalizeE164Like(
  raw: string | undefined,
  iso2: string | null | undefined
): string {
  const v = (raw ?? "").trim();
  if (!v) return "";
  if (v.startsWith("+")) return v.replace(/\s+/g, "");
  const digits = v.replace(/[^\d]/g, "");
  const code = DIAL_CODES[(iso2 || "").toUpperCase()];
  return code ? `${code}${digits}` : digits;
}

export function PhoneNumberField({
  control,
  name,
  label,
  placeholder,
  requiredMark,
  countryIso2,
}: Props) {
  const { language } = useLanguage();
  const isRTL = isRTLLang(language);
  const locale = language?.startsWith("ar") ? "ar" : "en";
  const defaultCountry = (countryIso2 || "SA").toLowerCase() as any;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        // Normalize once on hydration or when country changes,
        // but only if current value lacks '+' (i.e., stored as local number).
        React.useEffect(() => {
          const val = (field.value as string) || "";
          if (!val) return;
          if (!val.startsWith("+")) {
            const norm = normalizeE164Like(val, countryIso2);
            if (norm !== val) field.onChange(norm);
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [countryIso2]); // runs when country hydrates from draft/initialValues

        React.useEffect(() => {
          const val = (field.value as string) || "";
          if (!val) return;
          if (!val.startsWith("+")) {
            const norm = normalizeE164Like(val, countryIso2);
            if (norm !== val) field.onChange(norm);
          }
        }, [field.value, countryIso2, field]);

        return (
          <FormItem>
            <FormLabel>
              {label} {requiredMark}
            </FormLabel>
            <FormControl>
              <div className={`${isRTL ? "rtl-phone" : ""} relative`}>
                <PhoneInput
                  // NOTE: do NOT key by country; it causes remount on hydrate and loses value
                  // key={`phone-${locale}`} // use only if you want to remount on locale change
                  value={(field.value as string) ?? ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur} // RHF touched/validation
                  defaultCountry={defaultCountry}
                  placeholder={placeholder}
                  forceDialCode
                  locale={locale}
                  preferredCountries={["sa", "ae", "eg"]}
                  className="w-full"
                  inputClassName="react-intl-input w-full bg-background border border-input rounded-md h-10 px-3 outline-none"
                  countrySelectorClassName="react-intl-flagbtn border border-input rounded-s-md"
                  countrySelectorProps={{
                    dropdownClassName: "react-intl-dropdown",
                    showSearch: true,
                  }}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

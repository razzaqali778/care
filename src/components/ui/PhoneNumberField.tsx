import { Controller, type Control } from "react-hook-form";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useLanguage } from "@/contexts/LanguageContext";
import { isRTL as isRTLLang } from "@/constants/lang";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import "@/styles/phone-rtl.css";

type Props = {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  requiredMark?: string;
  countryIso2?: string | null;
};

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
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label} {requiredMark}
          </FormLabel>
          <FormControl>
            {/* WHY: wrapper is relative so dropdown can anchor to it */}
            <div className={`${isRTL ? "rtl-phone" : ""} relative`}>
              <PhoneInput
                key={`phone-${locale}-${defaultCountry}`}
                value={field.value || ""}
                onChange={field.onChange}
                defaultCountry={defaultCountry}
                placeholder={placeholder}
                forceDialCode
                locale={locale}
                preferredCountries={["sa", "ae", "eg"]}
                className="w-full"
                inputClassName="react-intl-input w-full bg-background border border-input rounded-md h-10 px-3 outline-none"
                countrySelectorClassName="react-intl-flagbtn border border-input rounded-s-md"
                countrySelectorProps={{
                  dropdownClassName: "react-intl-dropdown", // we hook CSS to this
                  showSearch: true,
                }}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

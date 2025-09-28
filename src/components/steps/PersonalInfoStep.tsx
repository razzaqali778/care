// import { UseFormReturn } from "react-hook-form";
// import { Input } from "@/components/ui/input";
// import {
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useLanguage } from "@/contexts/LanguageContext";
// import type { SubmissionForm } from "@/types/Types";
// import { STEP1_GENDER_OPTIONS } from "@/constants/step1";

// interface PersonalInfoStepProps {
//   form: UseFormReturn<SubmissionForm>;
// }

// export function PersonalInfoStep({ form }: PersonalInfoStepProps) {
//   const { t } = useLanguage();
//   const req = t("common.requiredMark");

//   return (
//     <div className="space-y-4">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <FormField
//           control={form.control}
//           name="name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>
//                 {t("step1.name.label")} {req}
//               </FormLabel>
//               <FormControl>
//                 <Input placeholder={t("step1.name.placeholder")} {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="nationalId"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>
//                 {t("step1.nationalId.label")} {req}
//               </FormLabel>
//               <FormControl>
//                 <Input
//                   placeholder={t("step1.nationalId.placeholder")}
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <FormField
//           control={form.control}
//           name="dateOfBirth"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>
//                 {t("step1.dateOfBirth.label")} {req}
//               </FormLabel>
//               <FormControl>
//                 <Input type="date" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="gender"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>
//                 {t("step1.gender.label")} {req}
//               </FormLabel>
//               <Select
//                 onValueChange={(v) => {
//                   field.onChange(v);
//                   form.trigger("gender");
//                 }}
//                 value={field.value}
//               >
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder={t("step1.gender.placeholder")} />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   {STEP1_GENDER_OPTIONS.map((opt) => (
//                     <SelectItem key={opt.value} value={opt.value}>
//                       {t(opt.labelKey)}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       </div>

//       <FormField
//         control={form.control}
//         name="address"
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>
//               {t("step1.address.label")} {req}
//             </FormLabel>
//             <FormControl>
//               <Input placeholder={t("step1.address.placeholder")} {...field} />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <FormField
//           control={form.control}
//           name="city"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>
//                 {t("step1.city.label")} {req}
//               </FormLabel>
//               <FormControl>
//                 <Input placeholder={t("step1.city.placeholder")} {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="state"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>
//                 {t("step1.state.label")} {req}
//               </FormLabel>
//               <FormControl>
//                 <Input placeholder={t("step1.state.placeholder")} {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="country"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>
//                 {t("step1.country.label")} {req}
//               </FormLabel>
//               <FormControl>
//                 <Input
//                   placeholder={t("step1.country.placeholder")}
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <FormField
//           control={form.control}
//           name="phone"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>
//                 {t("step1.phone.label")} {req}
//               </FormLabel>
//               <FormControl>
//                 <Input
//                   type="tel"
//                   placeholder={t("step1.phone.placeholder")}
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>
//                 {t("step1.email.label")} {req}
//               </FormLabel>
//               <FormControl>
//                 <Input
//                   type="email"
//                   placeholder={t("step1.email.placeholder")}
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       </div>
//     </div>
//   );
// }
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
import { useLanguage } from "@/contexts/LanguageContext";
import type { SubmissionForm } from "@/types/Types";
import { STEP1_GENDER_OPTIONS } from "@/constants/step1";
import {
  useCountryOptions,
  useStateOptions,
  useCityOptions,
} from "@/hooks/useGeoOptions";
import { isRTL as isRTLLang } from "@/constants/lang";
import { PhoneNumberField } from "../ui/PhoneNumberField";

interface PersonalInfoStepProps {
  form: UseFormReturn<SubmissionForm>;
}

export function PersonalInfoStep({ form }: PersonalInfoStepProps) {
  const { t, language } = useLanguage();
  const uiLang = (language?.startsWith("ar") ? "ar" : "en") as "ar" | "en";
  const isRTL = isRTLLang(language);
  const req = t("common.requiredMark");

  // We store codes in the form values
  const countryCode = form.watch("country"); // e.g., "SA"
  const stateCode = form.watch("state"); // e.g., "01"

  const countryOptions = useCountryOptions(uiLang);
  const stateOptions = useStateOptions(countryCode, uiLang);
  const cityOptions = useCityOptions(countryCode, stateCode, uiLang);

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
                value={field.value}
                onValueChange={(v) => {
                  field.onChange(v);
                  form.trigger("gender");
                }}
              >
                <FormControl>
                  <SelectTrigger className={isRTL ? "flex-row-reverse" : ""}>
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

      {/* Country / State / City (codes as values; labels per current language) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("step1.country.label")} {req}
              </FormLabel>
              <Select
                key={`country-${uiLang}`}
                value={field.value ?? ""}
                onValueChange={(v) => {
                  field.onChange(v);
                  form.setValue("state", "");
                  form.setValue("city", "");
                  form.trigger(["country", "state", "city"]);
                }}
              >
                <FormControl>
                  <SelectTrigger className={isRTL ? "flex-row-reverse" : ""}>
                    <SelectValue placeholder={t("step1.country.placeholder")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {countryOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
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
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("step1.state.label")} {req}
              </FormLabel>
              <Select
                key={`state-${uiLang}-${countryCode ?? "none"}`}
                value={field.value ?? ""}
                onValueChange={(v) => {
                  field.onChange(v);
                  form.setValue("city", "");
                  form.trigger(["state", "city"]);
                }}
                disabled={!countryCode}
              >
                <FormControl>
                  <SelectTrigger className={isRTL ? "flex-row-reverse" : ""}>
                    <SelectValue placeholder={t("step1.state.placeholder")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {stateOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
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
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("step1.city.label")} {req}
              </FormLabel>
              <Select
                key={`city-${uiLang}-${countryCode ?? "none"}-${
                  stateCode ?? "none"
                }`}
                value={field.value ?? ""}
                onValueChange={(v) => {
                  field.onChange(v);
                  form.trigger("city");
                }}
                disabled={!countryCode || !stateCode}
              >
                <FormControl>
                  <SelectTrigger className={isRTL ? "flex-row-reverse" : ""}>
                    <SelectValue placeholder={t("step1.city.placeholder")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {cityOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* PHONE: now with country code dropdown + max length */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PhoneNumberField
          control={form.control}
          name="phone"
          label={t("step1.phone.label")}
          placeholder={t("step1.phone.placeholder")}
          requiredMark={req}
          countryIso2={countryCode || null} // sync with selected country
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

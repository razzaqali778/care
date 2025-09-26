import { z } from "zod";

export const personalInfoSchema = z.object({
  name: z.string().min(2, "errors.name.min"),
  nationalId: z.string().min(5, "errors.nationalId.min"),
  dateOfBirth: z.string().min(1, "errors.dateOfBirth.required"),
  gender: z.string().min(1, "errors.gender.required"),
  address: z.string().min(5, "errors.address.min"),
  city: z.string().min(2, "errors.city.min"),
  state: z.string().min(2, "errors.state.min"),
  country: z.string().min(2, "errors.country.min"),
  phone: z.string().min(10, "errors.phone.min"),
  email: z.string().email("errors.email.invalid"),
});

export const familyFinancialSchema = z.object({
  maritalStatus: z.string().min(1, "errors.maritalStatus.required"),
  dependents: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "errors.dependents.invalid",
    }),
  employmentStatus: z.string().min(1, "errors.employmentStatus.required"),
  monthlyIncome: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "errors.monthlyIncome.invalid",
    }),
  housingStatus: z.string().min(1, "errors.housingStatus.required"),
});

export const situationDescriptionSchema = z.object({
  financialSituation: z.string().min(10, "errors.financialSituation.min"),
  employmentCircumstance: z
    .string()
    .min(10, "errors.employmentCircumstance.min"),
  reasonForApplying: z.string().min(10, "errors.reasonForApplying.min"),
});

export const fullFormSchema = personalInfoSchema
  .merge(familyFinancialSchema)
  .merge(situationDescriptionSchema);

import { z } from "zod";

export const personalInfoSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  nationalId: z
    .string()
    .min(5, "National ID must be at least 5 characters long"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Gender is required"),
  address: z.string().min(5, "Address must be at least 5 characters long"),
  city: z.string().min(2, "City must be at least 2 characters long"),
  state: z.string().min(2, "State must be at least 2 characters long"),
  country: z.string().min(2, "Country must be at least 2 characters long"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Please enter a valid email address"),
});

export const familyFinancialSchema = z.object({
  maritalStatus: z.string().min(1, "Marital status is required"),
  dependents: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Number of dependents must be a valid number",
    }),
  employmentStatus: z.string().min(1, "Employment status is required"),
  monthlyIncome: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Monthly income must be a valid number",
    }),
  housingStatus: z.string().min(1, "Housing status is required"),
});

export const situationDescriptionSchema = z.object({
  financialSituation: z
    .string()
    .min(
      10,
      "Please provide at least 10 characters describing your financial situation"
    ),
  employmentCircumstance: z
    .string()
    .min(
      10,
      "Please provide at least 10 characters describing your employment circumstances"
    ),
  reasonForApplying: z
    .string()
    .min(
      10,
      "Please provide at least 10 characters explaining your reason for applying"
    ),
});

export const fullFormSchema = personalInfoSchema
  .merge(familyFinancialSchema)
  .merge(situationDescriptionSchema);

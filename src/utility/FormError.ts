import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

export function getFieldError<T extends FieldValues>(
  form: UseFormReturn<T>,
  name: Path<T>
): string | undefined {
  return (
    (form.formState.errors[name]?.message as string | undefined) || undefined
  );
}

import type { ZodTypeAny } from "zod";
import type { DeepMap, FieldError } from "react-hook-form";

export function localizedZodResolver<T extends ZodTypeAny>(
  schema: T,
  t: (k: string) => string
) {
  return async (values: unknown) => {
    const result = schema.safeParse(values);
    if (result.success) {
      return { values: result.data, errors: {} };
    }

    const zErr = result.error;
    const fieldErrors: Record<string, any> = {};

    for (const issue of zErr.errors) {
      const path = issue.path.join(".");
      const rawMessage = issue.message ?? "error";
      let translated = rawMessage;
      try {
        const tMsg = t(rawMessage);
        translated =
          typeof tMsg === "string" && tMsg.length > 0 ? tMsg : rawMessage;
      } catch {
        translated = rawMessage;
      }

      if (!fieldErrors[path]) {
        fieldErrors[path] = {
          type: issue.code ?? "validation",
          message: translated,
        };
      }
    }

    return {
      values: {},
      errors: fieldErrors as DeepMap<Record<string, unknown>, FieldError>,
    };
  };
}

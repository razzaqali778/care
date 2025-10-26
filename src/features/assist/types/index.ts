import type { UseFormReturn } from "react-hook-form";
import type { ApplicationState, Lang } from "@/types/Types";
import type {
  AssistFieldKey,
  AssistTargetField,
} from "@/constants/assist";
import type { Step3Form } from "@/utility/AppState";

export type PromptLanguage = Lang;

export interface PromptContext {
  fieldKey: AssistFieldKey;
  application: ApplicationState;
  language: PromptLanguage;
}

export interface GeneratePromptParams extends PromptContext {}

export interface RefinePromptParams extends PromptContext {
  sourceText: string;
}

export interface SystemTranslateParams {
  target: "en" | "ar";
}

export type UserTranslateParams = SystemTranslateParams & { text: string };

export interface AiAssistRequest extends GeneratePromptParams {
  sourceText?: string;
}

export interface OfflineTemplateParams extends PromptContext {}

export interface AiAssistProps {
  form: UseFormReturn<Step3Form>;
  targetField: AssistTargetField;
  fieldKey: AssistFieldKey;
}

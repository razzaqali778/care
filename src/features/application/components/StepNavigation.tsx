import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Send } from "lucide-react";
import type { StepNavigationProps } from "../types";

export const StepNavigation = ({
  isFirstStep,
  isLastStep,
  isRTL,
  onPrev,
  onNext,
  onSubmit,
  labels,
}: StepNavigationProps) => (
  <div className="flex flex-col sm:flex-row justify-between pt-4 sm:pt-6 gap-3 sm:gap-4">
    <Button
      type="button"
      variant="outline"
      onClick={onPrev}
      disabled={isFirstStep}
      className={`flex items-center gap-2 w-full sm:w-auto ${
        isRTL ? "flex-row-reverse" : ""
      }`}
    >
      {isRTL ? (
        <ChevronRight className="h-4 w-4" />
      ) : (
        <ChevronLeft className="h-4 w-4" />
      )}
      <span>{labels.back}</span>
    </Button>

    {isLastStep ? (
      <Button
        type="button"
        onClick={onSubmit}
        className={`flex items-center gap-2 bg-gradient-primary w-full sm:w-auto ${
          isRTL ? "flex-row-reverse" : ""
        }`}
      >
        <Send
          className="h-4 w-4"
          style={isRTL ? { transform: "scaleX(-1)" } : undefined}
          aria-hidden
        />
        <span>{labels.submit}</span>
      </Button>
    ) : (
      <Button
        type="button"
        onClick={onNext}
        className={`flex items-center gap-2 w-full sm:w-auto ${
          isRTL ? "flex-row-reverse" : ""
        }`}
      >
        <span>{labels.next}</span>
        {isRTL ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>
    )}
  </div>
);

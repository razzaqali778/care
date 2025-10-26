import type { StepIndicatorProps } from "../types";

export const StepIndicator = ({
  totalSteps,
  currentStepIndex,
}: StepIndicatorProps) => (
  <div className="mb-6 sm:mb-8">
    <div className="flex items-center justify-between mb-4 px-4">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 text-sm sm:text-base ${
            index <= currentStepIndex
              ? "bg-primary border-primary text-primary-foreground"
              : "bg-background border-border text-muted-foreground"
          }`}
        >
          {index + 1}
        </div>
      ))}
    </div>
    <div className="w-full bg-muted rounded-full h-2">
      <div
        className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
        style={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
      />
    </div>
  </div>
);

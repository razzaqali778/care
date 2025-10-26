import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { ApplicationForm } from "@/components/ApplicationForm";
import { useToast } from "@/hooks/useToast";
import { useLanguage } from "@/contexts/LanguageContext";
import { api } from "@/lib/Api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  STEPS,
  type StepKey,
  isStep,
  DRAFT_PREFIX,
  routes,
  I18N_KEYS,
  I18N_FALLBACKS,
} from "@/constants/application";
import { normalizeInitialValues } from "@/features/application/utils/initialValues";

export default function Application() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const { id, step } = useParams<{ id?: string; step?: string }>();

  const stepKey: StepKey = isStep(step) ? (step as StepKey) : "personal";
  const stepIndex = STEPS.indexOf(stepKey);
  const totalSteps = STEPS.length;

  useEffect(() => {
    if (!isStep(step))
      navigate(routes.application((id ?? "new") as "new", "personal"), {
        replace: true,
      });
  }, [step, id, navigate]);

  const draftKey = `${DRAFT_PREFIX}${id ?? "new"}`;
  const qc = useQueryClient();

  const { data: record, isLoading } = useQuery({
    queryKey: ["submission", id],
    queryFn: () => (id ? api.get(id) : Promise.resolve(undefined)),
    enabled: !!id,
  });

  useEffect(() => {
    if (id && !isLoading && record === undefined) {
      toast({
        title: t(I18N_KEYS.notFoundTitle) || I18N_FALLBACKS.notFoundTitle,
        description:
          t(I18N_KEYS.notFoundDesc) || I18N_FALLBACKS.notFoundDesc,
      });
      navigate(routes.submissions, { replace: true });
    }
  }, [id, isLoading, record, toast, navigate, t]);

  const initialValues = useMemo(() => normalizeInitialValues(record), [record]);

  const qcInvalidate = () =>
    qc.invalidateQueries({ queryKey: ["submissions"] });

  const mutateCreate = useMutation({
    mutationFn: api.create,
    onSuccess: () => {
      localStorage.removeItem(draftKey);
      qcInvalidate();
      toast({
        title:
          t(I18N_KEYS.successSubmittedTitle) ||
          I18N_FALLBACKS.successSubmittedTitle,
        description:
          t(I18N_KEYS.successRedirecting) ||
          I18N_FALLBACKS.successRedirecting,
      });
      navigate(routes.submissions);
    },
  });

  const mutateUpdate = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      api.update(id, payload),
    onSuccess: () => {
      localStorage.removeItem(draftKey);
      qcInvalidate();
      toast({
        title:
          t(I18N_KEYS.successUpdatedTitle) ||
          I18N_FALLBACKS.successUpdatedTitle,
        description:
          t(I18N_KEYS.successRedirecting) ||
          I18N_FALLBACKS.successRedirecting,
      });
      navigate(routes.submissions);
    },
  });

  const handleSubmit = (formData: any) => {
    if (id) mutateUpdate.mutate({ id, payload: formData });
    else mutateCreate.mutate(formData);
  };

  const goTo = (idx: number) =>
    navigate(
      routes.application(
        (id ?? "new") as "new",
        STEPS[Math.min(Math.max(0, idx), totalSteps - 1)]
      )
    );
  const next = () => goTo(stepIndex + 1);
  const prev = () => goTo(stepIndex - 1);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 px-4">
            {t("app.title")}
          </h1>
          <p className="text-muted-foreground px-4">{t("app.subtitle")}</p>
        </div>
        <ApplicationForm
          onSubmit={handleSubmit}
          initialValues={initialValues}
          draftKey={draftKey}
          stepKey={stepKey}
          stepIndex={stepIndex}
          totalSteps={totalSteps}
          onNext={next}
          onPrev={prev}
          onGoToIndex={goTo}
        />
      </main>
    </div>
  );
}

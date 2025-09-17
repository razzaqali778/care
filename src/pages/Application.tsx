import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "@/components/header";
import { ApplicationForm } from "@/components/application-form";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/language-context";
import type { Submission } from "@/types/types";

function toDateInput(v?: string) {
  if (!v) return "";

  const d = v.includes("T") ? v.slice(0, 10) : v;
  return /^\d{4}-\d{2}-\d{2}$/.test(d) ? d : "";
}

function normalizeInitialValues(r: Submission | undefined) {
  if (!r) return undefined;
  const {
    id: _id,
    submittedAt: _submittedAt,
    updatedAt: _updatedAt,
    ...rest
  } = r as any;

  return {
    name: rest.name ?? "",
    nationalId: rest.nationalId ?? "",
    dateOfBirth: toDateInput(rest.dateOfBirth),
    gender: rest.gender ?? "",
    address: rest.address ?? "",
    city: rest.city ?? "",
    state: rest.state ?? "",
    country: rest.country ?? "",
    phone: rest.phone ?? "",
    email: rest.email ?? "",
    maritalStatus: rest.maritalStatus ?? "",
    dependents: String(rest.dependents ?? ""),
    employmentStatus: rest.employmentStatus ?? "",
    monthlyIncome: String(rest.monthlyIncome ?? ""),
    housingStatus: rest.housingStatus ?? "",
    financialSituation: rest.financialSituation ?? "",
    employmentCircumstance: rest.employmentCircumstance ?? "",
    reasonForApplying: rest.reasonForApplying ?? "",
  };
}

export default function Application() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const { id } = useParams<{ id?: string }>();

  const allSubmissions: Submission[] = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("submissions") || "[]");
    } catch {
      return [];
    }
  }, []);

  const record = useMemo(
    () => (id ? allSubmissions.find((s) => s.id === id) : undefined),
    [id, allSubmissions]
  );

  useEffect(() => {
    if (id && !record) {
      toast({
        title: "Not found",
        description: "The submission you tried to edit does not exist.",
      });
      navigate("/submissions", { replace: true });
    }
  }, [id, record, toast, navigate]);

  const initialValues = useMemo(() => normalizeInitialValues(record), [record]);

  const handleSubmit = (formData: any) => {
    const existing: Submission[] = [...allSubmissions];

    if (id && record) {
      const idx = existing.findIndex((s) => s.id === id);
      if (idx >= 0) {
        existing[idx] = {
          ...existing[idx],
          ...formData,
          id,
          submittedAt: existing[idx].submittedAt,
          updatedAt: new Date().toISOString(),
        };
        localStorage.setItem("submissions", JSON.stringify(existing));
        toast({
          title: t("success.applicationUpdated") || "Application updated",
          description: t("success.redirecting"),
        });
      }
    } else {
      const newSubmission: Submission = {
        id: Date.now().toString(),
        ...formData,
        submittedAt: new Date().toISOString(),
      };
      localStorage.setItem(
        "submissions",
        JSON.stringify([...existing, newSubmission])
      );
      toast({
        title: t("success.applicationSubmitted"),
        description: t("success.redirecting"),
      });
    }

    setTimeout(() => navigate("/submissions"), 2000);
  };

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
        />
      </main>
    </div>
  );
}

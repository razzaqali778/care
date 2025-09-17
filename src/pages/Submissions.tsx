import { useState, useEffect, useCallback } from "react";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/language-context";
import { Eye, FileText, ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Submission } from "@/types/types";
import { useToast } from "@/hooks/use-toast";

export default function Submissions() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { toast } = useToast();

  useEffect(() => {
    const storedSubmissions = JSON.parse(
      localStorage.getItem("submissions") || "[]"
    );
    setSubmissions(storedSubmissions);
  }, []);

  const persist = (list: Submission[]) => {
    localStorage.setItem("submissions", JSON.stringify(list));
    setSubmissions(list);
  };

  const handleEdit = useCallback(
    (id: string) => navigate(`/application/${id}`),
    [navigate]
  );

  const handleDelete = useCallback(
    (id: string) => {
      // Minimal confirmation; replace with Dialog if desired
      if (!confirm("Delete this submission? This cannot be undone.")) return;
      const next = submissions.filter((s) => s.id !== id);
      persist(next);
      toast({ title: "Deleted", description: "The submission was removed." });
    },
    [submissions, toast]
  );

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    if (Number.isNaN(d.getTime())) return "-";
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const truncateText = (text: string, maxLength: number = 50) =>
    text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 mb-4 w-full sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("submissions.backToHome")}
          </Button>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                {t("submissions.title")}
              </h1>
              <p className="text-muted-foreground">
                {t("submissions.subtitle")}
              </p>
            </div>
            <Badge
              variant="secondary"
              className="text-sm sm:text-lg px-3 sm:px-4 py-1 sm:py-2 self-start sm:self-auto"
            >
              {submissions.length} {t("submissions.title")}
            </Badge>
          </div>
        </div>

        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <FileText className="h-5 w-5" />
              {t("submissions.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {submissions.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {t("submissions.noSubmissions")}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {t("submissions.getStarted")}
                </p>
                <Button
                  onClick={() => navigate("/application")}
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  {t("submissions.newApplication")}
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[80px]">
                        {t("submissions.table.id")}
                      </TableHead>
                      <TableHead className="min-w-[120px]">
                        {t("submissions.table.name")}
                      </TableHead>
                      <TableHead className="min-w-[120px]">
                        {t("submissions.table.nationalId")}
                      </TableHead>
                      <TableHead className="min-w-[150px]">Email</TableHead>
                      <TableHead className="min-w-[200px]">
                        {t("submissions.table.reason")}
                      </TableHead>
                      <TableHead className="min-w-[120px]">
                        {t("submissions.table.submittedAt")}
                      </TableHead>
                      <TableHead className="min-w-[140px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.map((submission) => (
                      <TableRow key={submission.id}>
                        <TableCell className="font-mono text-sm">
                          #{submission.id.slice(-6)}
                        </TableCell>
                        <TableCell className="font-medium">
                          {submission.name}
                        </TableCell>
                        <TableCell>{submission.nationalId}</TableCell>
                        <TableCell className="break-all">
                          {submission.email}
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <span
                            title={submission.reasonForApplying}
                            className="block truncate"
                          >
                            {truncateText(submission.reasonForApplying)}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                          {formatDate(submission.submittedAt)}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          <div className="flex gap-1">
                            {/* <Button
                              variant="ghost"
                              size="sm"
                              className="flex items-center gap-1"
                              onClick={() =>
                                alert(JSON.stringify(submission, null, 2))
                              }
                              title="View details"
                            >
                              <Eye className="h-4 w-4" />
                              <span className="hidden sm:inline">View</span>
                            </Button> */}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex items-center gap-1"
                              onClick={() => handleEdit(submission.id)}
                              title="Edit"
                            >
                              <Pencil className="h-4 w-4" />
                              <span className="hidden sm:inline">Edit</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex items-center gap-1 text-destructive"
                              onClick={() => handleDelete(submission.id)}
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="hidden sm:inline">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

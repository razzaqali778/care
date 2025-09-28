import React, { Suspense, lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { ErrorBoundary } from "@/shared/ErrorBoundary";

const Index = lazy(() => import("@/pages/Index"));
const Application = lazy(() => import("@/pages/Application"));
const Submissions = lazy(() => import("@/pages/Submissions"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const withShell = (el: React.ReactNode) => (
  <ErrorBoundary>
    <Suspense fallback={<div className="p-6">Loading…</div>}>{el}</Suspense>
  </ErrorBoundary>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: withShell(<Index />),
    errorElement: withShell(<NotFound />),
  },
  {
    path: "/application",
    element: <Navigate to="/application/new/personal" replace />,
  },
  { path: "/application/new/:step?", element: withShell(<Application />) },
  { path: "/application/:id/:step?", element: withShell(<Application />) },
  { path: "/submissions", element: withShell(<Submissions />) },
  { path: "*", element: withShell(<NotFound />) },
]);

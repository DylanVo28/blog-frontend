import type { Metadata } from "next";
import { QuestionsDashboard } from "@/components/dashboard/QuestionsDashboard";

export const metadata: Metadata = {
  title: "Manage questions",
  description: "Review and answer paid questions from Inkline readers.",
};

export default function DashboardQuestionsPage() {
  return <QuestionsDashboard />;
}

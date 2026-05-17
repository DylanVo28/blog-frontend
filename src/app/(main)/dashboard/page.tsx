import type { Metadata } from "next";
import { DashboardClient } from "./DashboardClient";

export const metadata: Metadata = {
  title: "Author dashboard",
  description: "Track premium-question revenue, monitor top articles, and respond to pending questions on Inkline.",
};

export default function DashboardPage() {
  return <DashboardClient />;
}

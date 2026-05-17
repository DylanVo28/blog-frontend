import type { Metadata } from "next";
import { PostsDashboard } from "@/components/dashboard/PostsDashboard";

export const metadata: Metadata = {
  title: "Manage articles",
  description: "Create, edit, publish, and archive your Inkline articles from one dashboard.",
};

export default function DashboardPostsPage() {
  return <PostsDashboard />;
}

import type { Metadata } from "next";
import { NewPostScreen } from "@/components/posts/NewPostScreen";

export const metadata: Metadata = {
  title: "Write a new article",
  description: "Draft and publish a new article on Inkline.",
};

export default function NewPostPage() {
  return <NewPostScreen />;
}

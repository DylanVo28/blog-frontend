import type { Metadata } from "next";
import { EditPostScreen } from "@/components/posts/EditPostScreen";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: "Edit article",
    description: `Edit the Inkline article draft or publication at ${slug}.`,
  };
}

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <EditPostScreen slug={slug} />;
}

import type { Metadata } from "next";
import { PostFeed } from "@/components/posts/PostFeed";

export const metadata: Metadata = {
  title: "Explore articles",
  description: "Discover Inkline articles by searching keywords or filtering topics with tags.",
};

export default function ExplorePage() {
  return (
    <PostFeed
      title="Explore articles"
      description="Search by keyword or use tag filters to narrow down articles in the feed."
    />
  );
}

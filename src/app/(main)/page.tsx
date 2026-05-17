import type { Metadata } from "next";
import { PostFeed } from "@/components/posts/PostFeed";
import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants";

const HOME_THUMBNAIL = "/images/thumbnail.png";

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: APP_NAME,
    description: APP_DESCRIPTION,
    url: "/",
    siteName: APP_NAME,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: HOME_THUMBNAIL,
        width: 1731,
        height: 909,
        alt: `${APP_NAME} thumbnail`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: [HOME_THUMBNAIL],
  },
};

export default function HomePage() {
  return (
    <PostFeed
      title="Latest articles"
      description="A live article feed with author enrichment, tag filtering, and infinite scroll for an end-to-end reading experience."
    />
  );
}


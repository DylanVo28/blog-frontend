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
    locale: "vi_VN",
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
      title="Bài viết mới nhất"
      description="Feed phase 3 đã nối API thật, author enrichment, tag filter và infinite scroll để bạn bắt đầu test hệ bài viết end-to-end."
    />
  );
}

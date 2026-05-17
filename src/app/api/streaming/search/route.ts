import { NextResponse, type NextRequest } from "next/server";
import { streamingFetch, StreamingConfigError } from "@/lib/streaming";
import type { StreamingPaginatedResponse, StreamingShowSummary } from "@/types/streaming.types";

function errorResponse(error: unknown) {
  if (error instanceof StreamingConfigError) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const message = error instanceof Error ? error.message : "Khong tai duoc du lieu phim";
  return NextResponse.json({ error: message }, { status: 502 });
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const title = searchParams.get("title")?.trim() ?? searchParams.get("query")?.trim();

    if (!title) {
      return NextResponse.json({ shows: [], hasMore: false });
    }

    const data = await streamingFetch<StreamingPaginatedResponse<StreamingShowSummary>>(
      "/shows/search/title",
      {
        title,
        country: searchParams.get("country") ?? "vn",
        show_type: searchParams.get("show_type") ?? "movie",
        output_language: searchParams.get("output_language") ?? "en",
        series_granularity: searchParams.get("series_granularity") ?? "show",
      },
    );

    return NextResponse.json(data);
  } catch (error) {
    return errorResponse(error);
  }
}

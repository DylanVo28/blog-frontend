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
    const data = await streamingFetch<StreamingPaginatedResponse<StreamingShowSummary>>(
      "/shows/search/filters",
      {
        country: searchParams.get("country") ?? "vn",
        series_granularity: searchParams.get("series_granularity") ?? "show",
        order_direction: searchParams.get("order_direction") ?? "asc",
        order_by: searchParams.get("order_by") ?? "original_title",
        genres_relation: searchParams.get("genres_relation") ?? "and",
        output_language: searchParams.get("output_language") ?? "en",
        show_type: searchParams.get("show_type") ?? "movie",
        genres: searchParams.get("genres") ?? undefined,
        year_min: searchParams.get("year_min") ?? undefined,
        year_max: searchParams.get("year_max") ?? undefined,
        keyword: searchParams.get("keyword") ?? undefined,
        show_original_language: searchParams.get("show_original_language") ?? undefined,
        catalogs: searchParams.get("catalogs") ?? undefined,
        rating_min: searchParams.get("rating_min") ?? undefined,
        rating_max: searchParams.get("rating_max") ?? undefined,
        cursor: searchParams.get("cursor") ?? undefined,
      },
    );

    return NextResponse.json(data);
  } catch (error) {
    return errorResponse(error);
  }
}

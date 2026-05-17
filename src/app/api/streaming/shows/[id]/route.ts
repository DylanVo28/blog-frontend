import { NextResponse, type NextRequest } from "next/server";
import { streamingFetch, StreamingConfigError } from "@/lib/streaming";
import type { StreamingShowDetail } from "@/types/streaming.types";

interface RouteContext {
  params: Promise<{ id: string }>;
}

function errorResponse(error: unknown) {
  if (error instanceof StreamingConfigError) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const message = error instanceof Error ? error.message : "Khong tai duoc du lieu phim";
  return NextResponse.json({ error: message }, { status: 502 });
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const searchParams = request.nextUrl.searchParams;
    const data = await streamingFetch<StreamingShowDetail>(`/shows/${id}`, {
      country: searchParams.get("country") ?? "vn",
      output_language: searchParams.get("output_language") ?? "en",
    });

    return NextResponse.json(data);
  } catch (error) {
    return errorResponse(error);
  }
}

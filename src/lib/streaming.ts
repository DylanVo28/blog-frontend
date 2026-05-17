const STREAMING_BASE_URL = "https://streaming-availability.p.rapidapi.com";

export class StreamingConfigError extends Error {
  constructor() {
    super("Chua cau hinh RAPIDAPI_KEY");
    this.name = "StreamingConfigError";
  }
}

export function getPosterUrl(imageSet?: { verticalPoster?: Record<string, string | undefined> }) {
  return imageSet?.verticalPoster?.w600 ?? imageSet?.verticalPoster?.w480 ?? imageSet?.verticalPoster?.w360 ?? null;
}

export function getBackdropUrl(imageSet?: { horizontalBackdrop?: Record<string, string | undefined>; horizontalPoster?: Record<string, string | undefined> }) {
  return (
    imageSet?.horizontalBackdrop?.w1440 ??
    imageSet?.horizontalBackdrop?.w1080 ??
    imageSet?.horizontalPoster?.w1080 ??
    imageSet?.horizontalPoster?.w720 ??
    null
  );
}

export async function streamingFetch<T>(path: string, params: Record<string, string | number | undefined> = {}) {
  const apiKey = process.env.RAPIDAPI_KEY;

  if (!apiKey) {
    throw new StreamingConfigError();
  }

  const url = new URL(`${STREAMING_BASE_URL}${path}`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
      "x-rapidapi-key": apiKey,
    },
    next: { revalidate: 900 },
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(
      `Streaming Availability request failed with status ${response.status}${details ? `: ${details}` : ""}`,
    );
  }

  return response.json() as Promise<T>;
}

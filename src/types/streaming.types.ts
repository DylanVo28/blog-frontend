export interface StreamingImageSet {
  verticalPoster?: { w240?: string; w360?: string; w480?: string; w600?: string; w720?: string };
  horizontalPoster?: { w360?: string; w480?: string; w720?: string; w1080?: string; w1440?: string };
  verticalBackdrop?: { w240?: string; w360?: string; w480?: string; w600?: string; w720?: string };
  horizontalBackdrop?: { w360?: string; w480?: string; w720?: string; w1080?: string; w1440?: string };
}

export interface StreamingGenre {
  id: string;
  name: string;
}

export interface StreamingCastMember {
  name: string;
  characterName?: string;
  image?: string;
}

export interface StreamingVideo {
  source?: string;
  type?: string;
  url?: string;
}

export interface StreamingShowSummary {
  itemType?: "show";
  showType: "movie" | "series";
  id: string;
  imdbId?: string;
  tmdbId?: string;
  title: string;
  originalTitle?: string;
  overview?: string;
  firstAirYear?: number;
  releaseYear?: number;
  rating?: number;
  runtime?: number;
  genres?: StreamingGenre[];
  imageSet?: StreamingImageSet;
  streamingOptions?: Record<string, unknown[]>;
}

export interface StreamingShowDetail extends StreamingShowSummary {
  cast?: StreamingCastMember[];
  directors?: string[];
  videos?: StreamingVideo[];
}

export interface StreamingPaginatedResponse<T> {
  shows?: T[];
  results?: T[];
  page?: number;
  hasMore?: boolean;
  nextCursor?: string;
}

export interface StreamingErrorResponse {
  error: string;
  status?: number;
}

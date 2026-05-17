import type { Metadata } from "next";
import { Film, RefreshCcw } from "lucide-react";
import { MovieGrid } from "@/components/movies/MovieGrid";
import { MovieHero } from "@/components/movies/MovieHero";
import { MovieRow } from "@/components/movies/MovieRow";
import { MovieRowSkeleton } from "@/components/movies/MovieSkeletons";
import { Button } from "@/components/ui/button";
import { streamingFetch, StreamingConfigError } from "@/lib/streaming";
import type { StreamingPaginatedResponse, StreamingShowSummary } from "@/types/streaming.types";

export const metadata: Metadata = {
  title: "Movies | Inkline",
  description: "Discover movies available in Vietnam with a cinematic Inkline experience.",
};

interface MovieBucket {
  title: string;
  movies: StreamingShowSummary[];
}

async function getMovieBucket(
  title: string,
  params: Record<string, string | number | undefined>,
): Promise<MovieBucket> {
  const data = await streamingFetch<StreamingPaginatedResponse<StreamingShowSummary>>(
    "/shows/search/filters",
    {
      country: "vn",
      series_granularity: "show",
      genres_relation: "and",
      output_language: "en",
      show_type: "movie",
      ...params,
    },
  );

  return {
    title,
    movies: data.shows ?? data.results ?? [],
  };
}

async function getMovieHomeData() {
  const [azMovies, newestMovies, topMovies] = await Promise.all([
    getMovieBucket("Phim A-Z", {
      order_direction: "asc",
      order_by: "original_title",
    }),
    getMovieBucket("Moi cap nhat", {
      order_direction: "desc",
      order_by: "original_title",
      year_min: new Date().getFullYear() - 1,
    }),
    getMovieBucket("Diem cao", {
      order_direction: "desc",
      order_by: "original_title",
      rating_min: 70,
      year_min: new Date().getFullYear() - 5,
    }),
  ]);

  const heroMovie = azMovies.movies.find((movie) => movie.imageSet?.horizontalBackdrop || movie.imageSet?.horizontalPoster) ?? azMovies.movies[0];

  return {
    heroMovie,
    buckets: [azMovies, newestMovies, topMovies],
  };
}

function MovieHomeError({ message }: { message: string }) {
  return (
    <div className="min-h-[70vh] rounded-[2rem] border border-red-400/20 bg-[#08090b] px-6 py-16 text-center text-white shadow-[0_35px_100px_-60px_rgba(220,38,38,0.8)]">
      <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-red-500/15 text-red-200">
        <Film className="size-8" />
      </div>
      <h1 className="mt-6 text-3xl font-black tracking-tight">Khong tai duoc du lieu phim</h1>
      <p className="mx-auto mt-3 max-w-xl text-zinc-400">{message}</p>
      <Button asChild className="mt-8 bg-red-600 text-white hover:bg-red-500">
        <a href="/movies">
          <RefreshCcw className="size-4" />
          Thu lai
        </a>
      </Button>
    </div>
  );
}

function getMovieErrorMessage(error: unknown) {
  if (error instanceof StreamingConfigError) {
    return "Chua cau hinh RAPIDAPI_KEY trong frontend/.env.local. Hay tao key RapidAPI va restart dev server.";
  }

  return error instanceof Error ? error.message : "Khong tai duoc du lieu phim, vui long thu lai.";
}

export default async function MoviesPage() {
  const result = await getMovieHomeData()
    .then((data) => ({ data, error: null }))
    .catch((error: unknown) => ({ data: null, error }));

  if (result.error) {
    return <MovieHomeError message={getMovieErrorMessage(result.error)} />;
  }

  if (!result.data) {
    return <MovieHomeError message="Khong tai duoc du lieu phim, vui long thu lai." />;
  }

  const { heroMovie, buckets } = result.data;

  return (
    <div className="-mx-4 -mt-2 bg-[#08090b] px-4 pb-14 pt-4 text-white md:-mx-6 md:px-6">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.22),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(245,158,11,0.14),transparent_28%),#08090b]" />
      <div className="mx-auto max-w-[1400px] space-y-12">
        {heroMovie ? <MovieHero movie={heroMovie} /> : <MovieRowSkeleton />}

       

        <div className="space-y-12">
          {buckets.map((bucket) => (
            <MovieRow key={bucket.title} title={bucket.title} movies={bucket.movies.slice(0, 18)} />
          ))}
        </div>

        <section className="space-y-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-red-300/80">All picks</p>
            <h2 className="mt-1 text-2xl font-black tracking-tight text-white">Tat ca phim dau tien</h2>
          </div>
          <MovieGrid movies={buckets[0]?.movies.slice(0, 12) ?? []} />
        </section>
      </div>
    </div>
  );
}
